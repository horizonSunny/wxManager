<template>
  <view>
    <!-- <img src="../../static/littleFrog/frog.jpeg" /> -->
    <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">
      微信登录1
    </button>
    <!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
      获取电话号码
    </button> -->
    <button @click="sss">授权接口</button>
    <!-- <dialogInfo></dialogInfo> -->
  </view>
</template>
<script>
import dialogInfo from '../../components/dialog/dialog'
export default {
  components: { dialogInfo },
  onLoad () {

  },
  methods: {
    sss () {
      console.log('213');
      wx.authorize({ scope: "scope.userInfo" })
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