const address = {
  state: {
    // 存放用户地址和定位请求到的药店地址
    customerAddress: [],
    drugstoreAddress: [],
    // 用于保存请求到到全国各地的地址
    locationAddress: []
  },
  mutations: {
    SET_CUSTADD: (state, commodity) => {
      state.customerAddress = commodity
    },
    SET_DRUGADD: (state, commodity) => {
      state.drugstoreAddress = commodity
    },
    SET_LOCATADD: (state, commodity) => {
      state.locationAddress = commodity
    }
  },
  actions: {
    setCustAdd({ commit }, commodity) {
      // commit('SET_COMMODITY', commodity)
    },
    setDrugAdd({ commit }, commodity) {
      commit('SET_COMMODITY', commodity)
    },
    setLocatAdd({ commit }, commodity) {
      commit('SET_COMMODITY', commodity)
    }
  }
}
export default address
