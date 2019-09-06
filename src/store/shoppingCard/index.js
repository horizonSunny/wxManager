/**
 * 一进页面就缓存购物车信息，确认下单就清空购物车
 * 目前还不能使用路径别名
 */
import { deepCopy } from '../../utils/index'
const shoppingCard = {
  state: {
    commodityInfo: []
  },
  mutations: {
    // 因为是数组，所以要使用其它方法做成响应式
    SET_COMMODITY: (state, commodity) => {
      const index = state.commodityInfo.length
      console.log('SET_COMMODITY_', commodity)
      state.commodityInfo.splice(index, 0, commodity)
    },
    DEL_COMMODITY: (state, commodity) => {
      state.commodityInfo = state.commodityInfo.filter(item => {
        return deepCopy(item) !== deepCopy(commodity)
      })
    }
  },
  actions: {
    setCommodityInfo({ commit }, commodity) {
      console.log('setCommodityInfo_', commodity)
      commit('SET_COMMODITY', commodity)
    },
    delCommodityInfo({ commit }, commodity) {
      commit('DEL_COMMODITY', commodity)
    }
  }
}

export default shoppingCard
