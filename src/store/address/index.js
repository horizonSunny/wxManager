import http from '../../config/axios'
const address = {
  state: {
    // 存放用户地址和定位请求到的药店地址
    customerAddress: [],
    drugstoreAddress: [],
    // 用于保存请求到到全国各地的地址
    locationAddress: []
  },
  mutations: {
    //  获取用户全部取货地址
    GET_CUSTADD: (state, commodity) => {
      state.customerAddress = commodity
      console.log('state.customerAddress_', state.customerAddress)
    },
    SET_CUSTADD: (state, commodity) => {
      // state.customerAddress = commodity
    },
    SET_DRUGADD: (state, commodity) => {
      state.drugstoreAddress = commodity
    },
    SET_LOCATADD: (state, commodity) => {
      state.locationAddress = commodity
    }
  },
  actions: {
    getCustAdd({ commit }) {
      http.get('patient/address').then(res => {
        commit('GET_CUSTADD', res.data)
      })
    },
    // 包括更新和新建用户地址
    // setCustAdd({ commit, state }, commodity) {
    //   http.post('patient/address').then(res => {
    //     commit('SET_CUSTADD', res.data)
    //   })
    // },
    setDrugAdd({ commit }, commodity) {
      commit('SET_COMMODITY', commodity)
    },
    setLocatAdd({ commit }, commodity) {
      commit('SET_COMMODITY', commodity)
    }
  }
}
export default address
