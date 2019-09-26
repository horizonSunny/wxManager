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
      获取手机号
    </button>
    <view class="modal" v-show="showModal" @click="showModal = false">
      <button
        class="phone_btn"
        open-type="getPhoneNumber"
        @click.stop
        @getphonenumber="getPhoneNumber"
      >
        绑定手机号
      </button>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    getUserInfo (e) {
      console.log('e.detail.userInfo.avatarUrl_', e.detail.userInfo)
      this.showModal = true
    },
    getPhoneNumber (e) {
      // storage.get('encryptKey', response.data).then((value) => {}
      console.log('res_getPhoneNumber_', e.detail.encryptedData);
      console.log('res_getPhoneNumber_iv_', e.detail.iv);
      let params = {
        encryptedData: e.detail.encryptedData,

      }
    },
    bindUserInfo (e) {
      console.log('res', e.detail.encryptedData);
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
    background: rgba(105, 105, 105, 0.5);
  }
}
</style>