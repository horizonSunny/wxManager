<script>
import * as storage from './config/storage'
export default {
  // 应用生命周期,
  // 初始化 uni-app
  onLaunch: function () {
    storage.set('access_token', '456').then((value) => {
      console.log('set_token_value_', value);
    })
  },
  // 从后台进入前台显示
  onShow: function () {
    console.log('App Show123')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
page {
  width: 100%;
  height: 100%;
}
</style>
