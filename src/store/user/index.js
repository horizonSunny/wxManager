const user = {
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USERINFO: (state, commodity) => {
      state.userInfo = commodity
    }
  },
  actions: {
    setUserInfo({ commit }, commodity) {
      commit('SET_USERINFO', commodity)
    }
  }
}
export default user
