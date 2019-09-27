/**
 * 一进页面就缓存购物车信息，确认下单就清空购物车
 * 目前还不能使用路径别名
 */
import { deepCopy } from '../../utils/index'
import http from '../../config/axios'
import httpNoShow from '../../config/axiosNoShow'
// 这边通过productId比对是否有购物车单条信息存在的id,第一个参数是产品id,第二个是已经存在的购物车信息
function comparison(productId, shopCartId) {
  let item = shopCartId.find(item => {
    return item.productId === productId
  })
  return item
}
const shoppingCard = {
  state: {
    commodityInfo: [],
    shoppingCartId: []
  },
  mutations: {
    /**
     * 因为是数组，所以要使用其它方法做成响应式，
     * 这边的数量改变，列表里面的数量是同一个对象，也会改变
     * */
    RESET_SHOPPING: (state, shopping) => {
      state.commodityInfo = state.commodityInfo.concat(shopping)
    },
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
    },
    // 清空购物车
    EMPTY_SHOPPING: state => {
      state.commodityInfo = []
      state.shoppingCartId = []
    }
  },
  actions: {
    // 这边是购物车数量变化，增加操作
    setCommodityInfo({ commit, state }, commodity) {
      const comparisonItem = comparison(commodity['id'], state.shoppingCartId)
      console.log('comparisonItem_', comparisonItem)
      if (comparisonItem) {
        http
          .put('order/shopCart', {
            cartNum: commodity['amount'] + 1,
            productId: commodity['id'],
            id: comparisonItem['id']
          })
          .then(res => {
            commit('SET_COMMODITY', commodity)
          })
      } else {
        http
          .post('order/shopCart', {
            cartNum: commodity['amount'] + 1,
            productId: commodity['id']
          })
          .then(res => {
            state.shoppingCartId.push(res.data)
            commit('SET_COMMODITY', commodity)
          })
      }
    },
    // 这边是购物车数量变化，减少操作
    delCommodityInfo({ commit, state }, commodity) {
      const comparisonItem = comparison(commodity['id'], state.shoppingCartId)
      http
        .put('order/shopCart', {
          cartNum: commodity['amount'] - 1,
          productId: commodity['id'],
          id: comparisonItem['id']
        })
        .then(res => {
          if (commodity['amount'] - 1 === 0) {
            const index = state.shoppingCartId.findIndex(item => {
              return item['productId'] === commodity['id']
            })
            state.shoppingCartId.splice(index, 1)
          }
          commit('DEL_COMMODITY', commodity)
          console.log('state.shoppingCartId_', state.shoppingCartId)
        })
    },
    // 这是进应用的时候就拿到的数据比对
    getShoppingCart({ commit, state }) {
      httpNoShow.get('order/shopCart/info').then(res => {
        const params = {
          pageNumber: 0,
          pageSize: 999
        }
        // 这是获取购物车返回的数据
        state.shoppingCartId = res.data
        httpNoShow.get('admin/product', { params }).then(resp => {
          // 获取到产品信息和购物车信息，做比对添加
          const product = resp.data.pageList
          const shopping = res.data
          let productShopping = product.filter(productItem => {
            const shoppingCratId = []
            for (let item = 0; item < shopping.length; item++) {
              if (productItem['id'] === shopping[item]['productId']) {
                productItem['amount'] = shopping[item]['cartNum']
                return productItem
              }
            }
          })
          commit('RESET_SHOPPING', productShopping)
          console.log('productShopping_', productShopping)
        })
      })
    },
    // 清空购物车
    emptyShopping({ commit }) {
      commit('EMPTY_SHOPPING')
    }
  }
}

export default shoppingCard
