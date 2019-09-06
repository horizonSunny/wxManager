import Vue from 'vue'
import App from './App'
import http from './config/axios'
import store from './store/index'

Vue.config.productionTip = false
// 共享数据Vue
Vue.prototype.$http = http
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
