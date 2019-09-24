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
  </view>
</template>
<script>
export default {
  data () {
    return {
      avatarUrl: ''
    }
  },
  onLoad () {
    uni.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('当前位置的经度：' + res.longitude);
        console.log('当前位置的纬度：' + res.latitude);
      }
    });
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
  },
  methods: {
    sss () {
      console.log('213')
    },
    getUserInfo (e) {
      console.log('e.detail.userInfo.avatarUrl_', e.detail.userInfo)
      this.avatarUrl = e.detail.userInfo.avatarUrl
    },
    getPhoneNumber (e) {
      console.log('res', e);
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
}
</style>