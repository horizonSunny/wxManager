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
    // 每次一进入程序就会检测
    let _that = this
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
              console.log('微信登陆态失效后再请求成功', res.code);
              // 这边要发送一个code值，进行后段appid+secret的保存就行，生成openID进行保存
              // 登陆的时候拿到这个openId和手机号进行传参数，获取token
              const url = 'patient/wx' + '?code=' + res.code
              _that.$http.get(url)
                .then(function (response) {
                  console.log('patient/wx?code=1233_', response);
                  storage.setSync('encryptKey', response.data)
                })
                .catch(function (error) {
                  console.log(error);
                });
            } else {
              console.log('登录失败！')
            }
          }
        })
      }
    })
    if (!storage.getSync('encryptKey')) {
      wx.login({
        success (res) {
          if (res.code) {
            console.log('微信登陆态失效后再请求成功', res.code);
            // 这边要发送一个code值，进行后段appid+secret的保存就行，生成openID进行保存
            // 登陆的时候拿到这个openId和手机号进行传参数，获取token
            const url = 'patient/wx' + '?code=' + res.code
            _that.$http.get(url)
              .then(function (response) {
                console.log('patient/wx?code=1233_', response);
                storage.setSync('encryptKey', response.data)
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log('登录失败！')
          }
        }
      })
    }
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
