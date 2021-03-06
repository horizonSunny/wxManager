import Vue from 'vue'
import Vuex from 'vuex'
// store子模块
import user from './user'
import app from './app'
import shoppingCard from './shoppingCard'
import address from './address'
import coupon from './coupon'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app,
    shoppingCard,
    address,
    coupon
  },
  getters,
  state: {},
  mutations: {},
  actions: {}
})
export default store
