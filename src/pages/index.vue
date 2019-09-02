<template>
  <view>
    <login v-if="loginMiss"></login>
  </view>
</template>
<script>
import * as storage from '../config/storage'
import login from './homePage/login'
export default {
  components: { login },
  data: function () {
    return {
      loginMiss: false
    }
  },
  onReady: function () {
    storage.get('access_token').then((value) => {
      console.log('get_token_value_', value)
      this.loginMiss = true
    }).catch((error) => {
      console.log('error_', error)
      uni.reLaunch({
        url: 'menu/menu'
      });
    })
  }
}
</script>