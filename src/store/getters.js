function sortByNum(a, b) {
  return a.couponPrice - b.couponPrice
}
const getters = {
  /**
   * 用于获取购物车信息，当小程序退出的时候，需要将购物车
   * 信息传给后台服务器
   */
  shoppingInfo: state => state.shoppingCard.commodityInfo,
  // 获取商品总数量
  shoppingMount: state => {
    let mount = 0
    state.shoppingCard.commodityInfo.forEach(item => {
      mount += item['amount']
    })
    return mount
  },
  // 获取商品总价格
  shoppingPrice: state => {
    let totalPrice = 0
    state.shoppingCard.commodityInfo.forEach(item => {
      totalPrice += item['amount'] * item['price']
    })
    return totalPrice
  },
  // 获取用户地址和默认地址
  getCustAddress: state => {
    return state.address.customerAddress
  },
  getCustDefaultAddress: state => {
    console.log('getCustDefaultAddress')
    let dafaultAddress = state.address.customerAddress.find(item => {
      return item['isDefault'] === 1
    })
    return dafaultAddress
  },
  getDrugAddress: state => {
    return state.address.drugstoreAddress
  },
  // 获取用户选中地址
  getCustSelectedAddress: (state, getters) => {
    if (state.address.custSelectedAddress) {
      return state.address.custSelectedAddress
    } else if (getters.getCustDefaultAddress) {
      return getters.getCustDefaultAddress
    } else if (getters.getCustAddress) {
      return getters.getCustAddress[0]
    } else {
      return false
    }
    // return state.address.drugstoreAddress
  },
  // 获取activeCoupon 优惠券,mode代表active还是unactive
  getCouponMode: state => modePrice => {
    let activeCoupon = []
    let deactiveCoupon = []
    let couponList = state.coupon.couponList
    for (let item = 0; item < couponList.length; item++) {
      if (
        (couponList[item]['couponType'] === 0 ||
          modePrice >= couponList[item]['useMinPrice']) &&
        couponList[item]['status'] === 0
      ) {
        activeCoupon.push(couponList[item])
      } else {
        deactiveCoupon.push(couponList[item])
      }
    }
    activeCoupon.sort(sortByNum)
    deactiveCoupon.sort(sortByNum)
    return {
      activeCoupon,
      deactiveCoupon
    }
  },
  getSelectedCoupon: (state, getters, commit) => modePrice => {
    let activeCouponList = getters.getCouponMode(modePrice).activeCoupon
    let isContain = activeCouponList.some(item => {
      return item.id === state.coupon.selectedCoupon.id
    })
    // 看优惠券是否还是可用优惠权中
    if (state.coupon.selectedCoupon && isContain) {
      return state.coupon.selectedCoupon
    } else {
      return activeCouponList[0]
    }
  },
  //获取用户信息
  getUserInfo: state => {
    return state.user.userInfo
  }
}
export default getters
