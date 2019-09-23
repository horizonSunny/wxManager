/**
 * 一进页面就缓存购物车信息，确认下单就清空购物车
 * 目前还不能使用路径别名
 */
import { deepCopy } from '../../utils/index'
import http from '../../config/axios'
const coupon = {
  state: {
    couponList: [],
    selectedCoupon: null
  },
  mutations: {
    /**
     *
     * */
    GET_COUPONLIST: (state, couponList) => {
      state.couponList = couponList
      console.log('couponList___', state.couponList)
    },
    SET_COUPONLIST: (state, coupon) => {
      state.selectedCoupon = coupon
      console.log('state.selectedCoupon___', state.selectedCoupon)
    }
  },
  actions: {
    getCouponList({ commit }) {
      return http.get('admin/coupon').then(res => {
        commit('GET_COUPONLIST', res.data)
      })
    }
  }
}

export default coupon
