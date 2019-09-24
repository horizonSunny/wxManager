<script>
import * as storage from './config/storage'
export default {
  // 应用生命周期,
  // 初始化 uni-app
  onLaunch: function () {
    const capsuleInfo = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = wx.getSystemInfoSync().statusBarHeight
    const reduce = capsuleInfo.top - statusBarHeight
    const allHeight = reduce + capsuleInfo.top
    storage.setSync('capsuleInfo', allHeight)
    storage.setSync('access_token', '456')
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
/*全局映入图标库*/
@import "./static/icon.css";
/*每个页面公共css */
page {
  width: 100%;
  height: 100%;
}
</style>
