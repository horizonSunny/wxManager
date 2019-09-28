<template>
  <view class="wrap">
    <view class="avatar"></view>
    <view class="name">即医</view>
    <button
      class="wx_btn"
      type="primary"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
    >
      微信登录
    </button>
    <button
      class="phone_btn"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
    >
      手机号登陆
    </button>
    <view class="modal" v-if="showModal" @click="showModal = false">
      <view @click.stop class="bindPhone">
        <view class="title">你的手机号</view>
        <view class="contentInfo">还未绑定微信，确定绑定嚒？</view>
        <view class="operate">
          <button class="refuse" @click="showModal = false">拒绝</button>
          <button
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
            class="allow"
          >
            允许
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
export default {
  data () {
    return {
      showModal: false,
      keyInfo: storage.getSync('encryptKey'),
      //微信信息
      avatar: '',
      city: '',
      nickName: '',
      province: ''
    }
  },
  methods: {
    // 秘文解析手机号
    getPhoneNumber (e) {
      let _that = this
      this.showModal = false
      if (e.detail.errMsg === 'getPhoneNumber:fail:user deny') {
        return
      }
      console.log('res_getPhoneNumber_', e);
      console.log('res_getPhoneNumber_iv_', e.detail.iv);
      let params = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        key: this.keyInfo
      }
      this.$httpNoShow.get('patient/wx/phone', { params }).then((res) => {
        console.log('res_data_', res.data);
        if (res.data) {
          this.phoneLogin(res.data.phone)
        } else {
          wx.login({
            success (res) {
              if (res.code) {
                console.log('微信登陆态失效后再请求成功', res.code);
                // 这边要发送一个code值，进行后段appid+secret的保存就行，生成openID进行保存
                // 登陆的时候拿到这个openId和手机号进行传参数，获取token
                const url = 'patient/wx' + '?code=' + res.code
                _that.$httpNoShow.get(url)
                  .then(function (response) {
                    console.log('patient/wx?code=1233_', response);
                    storage.setSync('encryptKey', response.data)
                  }).then(() => {
                    const paramsNew = {
                      encryptedData: e.detail.encryptedData,
                      iv: e.detail.iv,
                      key: storage.getSync('encryptKey')
                    }
                    _that.$httpNoShow.get('patient/wx/phone', { paramsNew }).then((resp) => {
                      this.phoneLogin(resp.data.phone)
                    })
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              } else {
                console.log('登录失败！')
              }
            }
          })
        }

      })

    },
    getUserInfo (e) {
      console.log('e_getUserInfo_', e);
      // 用户拒绝授权
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return
      }
      this.avatar = e.detail.userInfo.avatarUrl
      this.city = e.detail.userInfo.city
      this.nickName = e.detail.userInfo.nickName
      this.province = e.detail.userInfo.province
      let url = 'patient/wx/checkPhone?key=' + this.keyInfo
      this.$httpNoShow.get(url).then((res) => {
        console.log('res_data_', res.data);
        // res.data['decode']假如为false,代表未绑定，弹窗绑定页面
        if (!res.data['decode']) {
          this.showModal = true
        } else {
          this.phoneLogin(res.data.phone)
        }
      })
    },
    // 明文手机号登陆
    phoneLogin (phone) {
      const url = 'auth/oauth/token?mobilePhone=' + phone + '&grant_type=minapp' + '&key=' + this.keyInfo + '&scope=server'
      this.$http.post(url).then((res) => {
        console.log('res_data_', res.data);
        storage.setSync('access_token', 'bearer ' + res.data.access_token)
        let params = {
          avatar: this.avatar,
          city: this.city,
          nickname: this.nickName,
          province: this.province
        }
        this.$httpNoShow.put('patient/patient/patientPersonalInfo', params).then(() => { })
        uni.switchTab({
          url: '/pages/homepage/main'
        })
      })
    }
  }
}
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    margin-top: px2rpx(95);
    width: px2rpx(62);
    height: px2rpx(62);
    background: #f0fffb;
    border: px2rpx(1) solid #4da08a;
    border-radius: px2rpx(8);
  }
  .name {
    font-size: px2rpx(19);
  }
  button {
    width: px2rpx(330);
    height: px2rpx(48);
    font-size: px2rpx(18);
    border-radius: px2rpx(5);
  }
  .wx_btn {
    background: #4da08a;
    margin-top: px2rpx(52);
    color: #fff;
  }
  .phone_btn {
    background: #fff;
    margin-top: px2rpx(31);
    color: #4da08a;
  }
  .modal {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(105, 105, 105, 0.5);
    .bindPhone {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: px2rpx(350);
      height: px2rpx(190);
      background: #fff;
      text-align: center;
      border-radius: px2rpx(8);
      .title {
        margin-top: px2rpx(26);
        font-size: px2rpx(23);
      }
      .contentInfo {
        margin-top: px2rpx(12);
        font-size: px2rpx(18);
      }
      .operate {
        margin-top: px2rpx(20);
        display: flex;
        justify-content: center;
        button {
          width: px2rpx(150);
          height: px2rpx(42);
          line-height: px2rpx(42);
          font-size: px2rpx(20);
          border-radius: px2rpx(4);
          text-align: center;
        }
        .refuse {
          background: #ededed;
          color: #4da08a;
        }
        .allow {
          color: #ededed;
          background: #4da08a;
        }
      }
    }
  }
}
</style>