const getters = {
  /**
   * 用于获取购物车信息，当小程序退出的时候，需要将购物车
   * 信息传给后台服务器
   */
  shoppingInfo: state => state.shoppingCard.commodityInfo,
  // 获取商品总数量
  shoppingMount: state => {
    const mount = 0
    state.shoppingCard.commodityInfo.forEach(item => {
      mount += item['amount']
    })
    return mount
  },
  // 获取商品总价格
  shoppingPrice: state => {
    const totalPrice = 0
    state.shoppingCard.commodityInfo.forEach(item => {
      totalPrice += item['amount'] * item['price']
    })
    return totalPrice
  }
}
export default getters
