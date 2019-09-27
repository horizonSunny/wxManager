import Vue from 'vue'
import App from './App'
import http from './config/axios'
import httpNoShow from './config/axiosNoShow'
import store from './store/index'
import * as navTo from './config/navTo'

Vue.config.productionTip = false
// 共享数据Vue
uni.getSystemInfo({
  success: function(res) {
    Vue.prototype.$pixelRatio = '@' + res.pixelRatio + 'x.png'
  }
})
Vue.prototype.$http = http
Vue.prototype.$httpNoShow = httpNoShow
Vue.prototype.$store = store
Vue.prototype.$navTo = navTo

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
