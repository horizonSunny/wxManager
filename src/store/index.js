import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import app from './app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app
  },
  getters,
  state: {},
  mutations: {},
  actions: {}
})
export default store
