<template>
  <view>
    <img src="../../static/littleFrog/frog.jpeg" />
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">
      微信登录
    </button>
    <button @click="sss">手机号登陆</button>
    <img :src="avatarUrl" alt="暂无图片" />
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
  },
  methods: {
    sss () {
      console.log('213')
    },
    getUserInfo (e) {
      console.log('e.detail.userInfo.avatarUrl_', e.detail.userInfo)
      this.avatarUrl = e.detail.userInfo.avatarUrl
    },
    getPhoneNumber () {
      console.log('res', e);
    }
  }
}
</script>
<style lang="scss">
</style>