import http from '../../config/axios'
const address = {
  state: {
    // 存放用户地址和定位请求到的药店地址
    customerAddress: [],
    drugstoreAddress: [],
    // 用于保存请求到到全国各地的地址
    locationAddress: [],
    // 获取用户选中地址
    custSelectedAddress: null
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
    },
    SET_SELECTCUST: (state, commodity) => {
      state.custSelectedAddress = commodity
    }
  },
  actions: {
    getCustAdd({ commit }) {
      return http.get('patient/address').then(res => {
        commit('GET_CUSTADD', res.data)
      })
    },
    // 包括更新和新建用户地址
    setCustAdd({ dispatch }, commodity) {
      if (commodity.operate === 'add') {
        http.post('patient/address', commodity['addressInfo']).then(res => {
          dispatch('getCustAdd').then(res => {
            uni.navigateBack()
          })
        })
      } else if (commodity.operate === 'reset') {
        http.put('patient/address', commodity['addressInfo']).then(res => {
          dispatch('getCustAdd').then(res => {
            uni.navigateBack()
          })
        })
      }
    },
    setDrugAdd({ commit }, commodity) {
      commit('SET_COMMODITY', commodity)
    },
    setLocatAdd({ commit }, commodity) {
      commit('SET_COMMODITY', commodity)
    },
    // 设置用户选中地址
    setSelectedAdd({ commit }, commodity) {
      commit('SET_SELECTCUST', commodity)
    }
  }
}
export default address
