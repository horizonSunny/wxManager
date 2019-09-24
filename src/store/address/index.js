import http from '../../config/axios'
const address = {
  state: {
    // 存放用户地址和定位请求到的药店地址
    customerAddress: [],
    drugstoreAddress: [],
    // 用于保存请求到到全国各地的地址
    locationAddress: [],
    // 获取用户选中地址
    custSelectedAddress: null,
    drugSelectedAddress: null
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
    // 获取药店地址
    SET_DRUGADD: (state, commodity) => {
      state.drugstoreAddress = commodity
    },
    // 获取全中国省市地址
    SET_LOCATADD: (state, commodity) => {
      state.locationAddress = commodity
    },
    SET_SELECTCUST: (state, commodity) => {
      state.custSelectedAddress = commodity
    },
    DELETE_SELECTCUST: state => {
      state.custSelectedAddress = null
    },
    // 选中的药房地址
    SELETE_DRUG: (state, commodity) => {
      state.drugSelectedAddress = commodity
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
    // 设置全中国设置地址保存
    setLocatAdd({ commit }) {
      const params = {
        status: 0
      }
      http.get('admin/province/city', { params }).then(res => {
        commit('SET_LOCATADD', res.data)
      })
    },
    // 设置用户选中地址
    setSelectedAdd({ commit }, commodity) {
      commit('SET_SELECTCUST', commodity)
    }
  }
}
export default address
