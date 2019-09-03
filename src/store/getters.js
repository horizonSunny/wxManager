const getters = {
  /**
   * 用于获取购物车信息，当小程序退出的时候，需要将购物车
   * 信息传给后台服务器
   */
  sidebar: state => state.app.sidebar
}
export default getters
