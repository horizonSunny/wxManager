<template>
  <view>
    <!-- img... -->
    <login v-if="loginMiss"></login>
    <!-- <main v-else></main> -->
  </view>
</template>
<script>
import * as storage from '../config/storage'
import login from './homePage/login'
import main from './indexs/index'
export default {
  components: { login, main },
  data: function () {
    return {
      loginMiss: false
    }
  },
  onReady: function () {
    storage.get('access_tokens').then((value) => {
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