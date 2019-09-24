<template>
  <view>
    <login v-if="loginMiss"></login>
  </view>
</template>
<script>
import * as storage from '../config/storage'
import login from './login/login'
export default {
  components: { login },
  data: function () {
    return {
      loginMiss: true
    }
  },
  onReady: function () {
    // storage.get('access_tokens').then((value) => {
    //   console.log('get_token_value_', value)
    //   this.loginMiss = true
    // }).catch((error) => {
    //   console.log('error_', error)
    //   uni.reLaunch({
    //     url: 'homepage/main'
    //   });
    // })
  }
}
</script>