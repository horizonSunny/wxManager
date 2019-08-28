import Vue from 'vue'
import App from './App'
import * as api from './config/api'

Vue.config.productionTip = false
// 共享数据Vue
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
