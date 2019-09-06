import Vue from 'vue'
import Vuex from 'vuex'
// store子模块
import user from './user'
import app from './app'
import shoppingCard from './shoppingCard'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app,
    shoppingCard
  },
  getters,
  state: {},
  mutations: {},
  actions: {}
})
export default store
