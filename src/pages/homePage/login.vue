<template>
  <view>
    <button
      type="primary"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
      withCredentials="true"
    >
      微信登录1
    </button>
    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
      获取电话号码
    </button>
  </view>
</template>
<script>
export default {
  onLoad () {

  },
  methods: {
    sss: function () {
      console.log(1231)
    },
    getPhoneNumber: function (e) {
      console.log('res', e);
    }
  }
}
</script>