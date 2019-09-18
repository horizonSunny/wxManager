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
    storage.set('access_token', '456').then((value) => {

    })
    // 这边获取用户信息
    this.$http.get('patient/patient').then((res) => {
      // 用户信息放入store中
      this.$store.dispatch('setUserInfo', res.data).then((res) => {
        console.log('userInfo_', this.$store.getters.getUserInfo);
      })
    })
    wx.checkSession({
      success () {
        console.log('微信登陆态成功');
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() //重新登录
        console.log('微信登陆态失效');
        wx.login({
          success (res) {
            if (res.code) {
              //发起网络请求
              // 这边要发送一个code值，进行后段appid+secret的保存就行
              // this.$http.post('/user', { code: res.code })
              //   .then(function (response) {
              //     storage.set('access_token', response).then((value) => {
              //     })
              //   })
              //   .catch(function (error) {
              //     console.log(error);
              //   });
              // console.log('登录成功！')
            } else {
              console.log('登录失败！')
            }
          }
        })
      }
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
/*全局映入图标库*/
@import "./static/icon.css";
/*每个页面公共css */
page {
  width: 100%;
  height: 100%;
}
</style>
