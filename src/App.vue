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
    storage.setSync('access_token', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjAsInVzZXJfaWQiOjEsInVzZXJfbmFtZSI6IjEzMjY1NzQ2Nzg4Iiwic2NvcGUiOlsic2VydmVyIl0sInVzZXJUeXBlIjoiMiIsImV4cCI6MTU3MDM3ODIyNCwiZGVwdF9pZCI6MCwiYXV0aG9yaXRpZXMiOlsiUk9MRV8iXSwianRpIjoiZTEwNTkxNDAtNTA4Mi00MDc2LWFlNGItOGFmYTM3YWY4OWM3IiwiY2xpZW50X2lkIjoicGF0aWVudCIsInVzZXJuYW1lIjoiMTMyNjU3NDY3ODgifQ.R0yb5rOvG5IHi_RrVtqGk5VrVsEPHq5-yoWxu6WuMZU')
    // 每次一进入程序就会检测
    wx.checkSession({
      success () {
        console.log('微信登陆态成功')
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程，这边是获取微信登陆态，code传给后段接口
        console.log('微信登陆态失效');
        wx.login({
          success (res) {
            if (res.code) {
              console.log('微信登陆态失效后再请求成功');
              // 这边要发送一个code值，进行后段appid+secret的保存就行，生成openID进行保存
              // 登陆的时候拿到这个openId和手机号进行传参数，获取token
              // this.$http.post('/user', { code: res.code })
              //   .then(function (response) {
              //     storage.set('encryptKey', response).then((value) => {
              //     })
              //   })
              //   .catch(function (error) {
              //     console.log(error);
              //   });
            } else {
              console.log('登录失败！')
            }
          }
        })
      }
    })
    // 测试，后面要删除
    this.$http.get('patient/patient').then((res) => {
      // 用户信息放入store中
      this.$store.dispatch('setUserInfo', res.data).then((res) => {
        // console.log('userInfo_', this.$store.getters.getUserInfo);
      })
      // 获取用户取货地址
      this.$store.dispatch('getCustAdd', res.data).then((res) => {
        // console.log('userInfo_', this.$store.getters.getUserInfo);
      })
      // 设置全国直至
      this.$store.dispatch('setLocatAdd', res.data).then((res) => {
        // console.log('userInfo_', this.$store.getters.getUserInfo);
      })
    }).then(() => {
      this.$http.get('patient/patient').then((res) => {
        // 用户信息放入store中
        this.$store.dispatch('setUserInfo', res.data).then((res) => {
          // console.log('userInfo_', this.$store.getters.getUserInfo);
        })
        // 获取用户取货地址
        this.$store.dispatch('getCustAdd', res.data).then((res) => {
          // console.log('userInfo_', this.$store.getters.getUserInfo);
        })
        // 设置全国直至
        this.$store.dispatch('setLocatAdd', res.data).then((res) => {
          // console.log('userInfo_', this.$store.getters.getUserInfo);
        })
      })
    })
    // this.$http.post('auth/oauth/token?username=13265746788&code=7473&grant_type=sms&userType=2').then((res) => {
    //   console.log('dadadadsadasdasdasdasadasadadas_', res.data.access_token);
    //   let access_token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjAsImxpY2Vuc2UiOiJtYWRlIGJ5IGF1dGgiLCJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiIxMzI2NTc0Njc4OCIsInNjb3BlIjpbInNlcnZlciJdLCJleHAiOjE1NzkyODk1MzQsImRlcHRfaWQiOjAsImF1dGhvcml0aWVzIjpbIlJPTEVfIl0sImp0aSI6ImU3ZjlkMDQ3LTNiNzAtNDA2Yy1iNGQ5LTQxNDNmYzFmNzgzOSIsImNsaWVudF9pZCI6InBhdGllbnQiLCJ1c2VybmFtZSI6IjEzMjY1NzQ2Nzg4In0.YiabkowOrnJmXT0NcOPXGhETYIoatDuuoyPI138CIm0'
    //   storage.setSync('access_token', access_token)
    //   this.$http.get('patient/patient').then((res) => {
    //     // 用户信息放入store中
    //     this.$store.dispatch('setUserInfo', res.data).then((res) => {
    //       // console.log('userInfo_', this.$store.getters.getUserInfo);
    //     })
    //     // 获取用户取货地址
    //     this.$store.dispatch('getCustAdd', res.data).then((res) => {
    //       // console.log('userInfo_', this.$store.getters.getUserInfo);
    //     })
    //     // 设置全国直至
    //     this.$store.dispatch('setLocatAdd', res.data).then((res) => {
    //       // console.log('userInfo_', this.$store.getters.getUserInfo);
    //     })
    //   }).then(() => {
    //     this.$http.get('patient/patient').then((res) => {
    //       // 用户信息放入store中
    //       this.$store.dispatch('setUserInfo', res.data).then((res) => {
    //         // console.log('userInfo_', this.$store.getters.getUserInfo);
    //       })
    //       // 获取用户取货地址
    //       this.$store.dispatch('getCustAdd', res.data).then((res) => {
    //         // console.log('userInfo_', this.$store.getters.getUserInfo);
    //       })
    //       // 设置全国直至
    //       this.$store.dispatch('setLocatAdd', res.data).then((res) => {
    //         // console.log('userInfo_', this.$store.getters.getUserInfo);
    //       })
    //     })
    //   })
    // })
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
