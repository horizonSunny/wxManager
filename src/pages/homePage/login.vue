<template>
  <view>
    <img src="../../static/littleFrog/frog.jpeg" />
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">
      微信登录1
    </button>
    <button @click="sss">授权接口</button>
  </view>
</template>
<script>
export default {
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
    getUserInfo () { },
    getPhoneNumber () {
      console.log('res', e);
    }
  }
}
</script>
<style lang="scss">
</style>