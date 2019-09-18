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
    /**
     * 因为是数组，所以要使用其它方法做成响应式，
     * 这边的数量改变，列表里面的数量是同一个对象，也会改变
     * */

    SET_COMMODITY: (state, commodity) => {
      commodity['amount'] += 1
      let contain = state.commodityInfo.some(item => {
        if (item['id'] === commodity['id']) {
          return true
        }
      })
      if (!contain) {
        const index = state.commodityInfo.length
        state.commodityInfo.splice(index, 0, commodity)
      }
      console.log('SET_COMMODITY_commodityInfo_', state.commodityInfo)
    },
    DEL_COMMODITY: (state, commodity) => {
      state.commodityInfo.forEach((item, index) => {
        if (item['id'] === commodity['id'] && item['amount'] > 0) {
          item['amount'] -= 1
        }
      })
      // 再把amount数量为0的药品移出购物车
      state.commodityInfo = state.commodityInfo.filter(item => {
        return item['amount'] !== 0
      })
    }
  },
  actions: {
    setCommodityInfo({ commit }, commodity) {
      commit('SET_COMMODITY', commodity)
    },
    delCommodityInfo({ commit }, commodity) {
      commit('DEL_COMMODITY', commodity)
    }
  }
}

export default shoppingCard
