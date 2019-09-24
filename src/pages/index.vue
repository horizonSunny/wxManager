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
    wx.checkSession({
      success () {
        console.log('微信登陆态成功');
        wx.getUserInfo({
          success: function (res) {
            // console.log('wx.getUserInfo_', res)
          },
          fail: function (res) {
            // console.log('wx.getUserInfo_fail', res)
          }
        })
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() //重新登录
        console.log('微信登陆态失效');
        wx.login({
          success (res) {
            if (res.code) {
              console.log('微信登陆态失效后再请求成功');
              wx.getUserInfo({
                success: function (res) {
                  // console.log('wx.getUserInfo_', res)
                },
                fail: function (res) {
                  // console.log('wx.getUserInfo_fail', res)
                }
              })
              // 发起网络请求
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('getUserInfo_', res);
              // this.globalData.userInfo = res.userInfo

              // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        }
      }
    })
  }
}
</script>