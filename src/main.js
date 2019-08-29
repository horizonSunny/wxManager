import Vue from 'vue'
import App from './App'
import * as api from './config/api'
import http from './config/axios'

Vue.config.productionTip = false
// 共享数据Vue
Vue.prototype.$api = api
Vue.prototype.$http = http

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
