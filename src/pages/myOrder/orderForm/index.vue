<template>
  <view class="wrap">
    <topBar page-title="确认订单"></topBar>
    <scroll-view scroll-y class="scrollView">
      <view class="wrapContent">
        <view class="address">
          <view class="personal" @click="selectorMode = !selectorMode">
            <uni-icon
              type=""
              class="iconfont icon-unselected icon_style"
              :class="[selectorMode ? 'icon_sel' : 'icon_unsel']"
            ></uni-icon>
            <span>快递配送</span>
            <!-- 有默认地址时候 -->
            <view v-if="missShow" class="addrresInfo" @click="operateAddress">
              <view
                >{{ defaultCustAddress["fullName"] }}
                {{ defaultCustAddress["phone"] }}</view
              >
              <view class="space_between">
                <view
                  >{{ defaultCustAddress["province"]
                  }}{{ defaultCustAddress["city"]
                  }}{{ defaultCustAddress["area"]
                  }}{{ defaultCustAddress["detailAddress"] }}</view
                >
                <view>
                  <uni-icon type="" class="iconfont  icon-more"></uni-icon>
                </view>
              </view>
            </view>
            <!-- 无默认地址时候 -->
            <view v-else class="addrresMissInfo" @click="operateAddress">
              <uni-icon
                type=""
                class="iconfont icon-orderAdd icon_order_style"
              ></uni-icon>
              <span>添加收货地址</span>
            </view>
          </view>
          <view class="drugstore" @click="selectorMode = !selectorMode">
            <uni-icon
              type=""
              class="iconfont icon-unselected icon_style"
              :class="[selectorMode ? 'icon_unsel' : 'icon_sel']"
            ></uni-icon>
            <span>药店取药</span>
            <view
              v-if="defaultDrugAddress"
              class="addrresInfo"
              @click="selectDrug"
            >
              <view>{{ defaultDrugAddress["name"] }}</view>
              <view class="space_between">
                <view class="drugAddress">{{
                  defaultDrugAddress["address"]
                }}</view>
                <view>{{ defaultDrugAddress["distance"] }}</view>
                <view>
                  <uni-icon type="" class="iconfont  icon-more"></uni-icon>
                </view>
              </view>
            </view>
            <view class="addrresMissInfo" @click="selectDrug" v-else>
              <uni-icon
                type=""
                class="iconfont icon-orderLocation icon_order_style"
              ></uni-icon>
              <span>查找附近药店</span>
            </view>
          </view>
        </view>
        <view class="shoppingInfo">
          <swiper>
            <swiper-item
              v-for="(itemInList, indexInList) in shoppingCart"
              :key="indexInList"
            >
              <view class="itemMessage">
                <view class="itemImg">
                  <img src="../../../static/main/bannerBack@3x.png" alt="" />
                </view>
                <view class="itemInfo">
                  <view class="name">
                    {{ itemInList["productName"] }}
                  </view>
                  <view class="specification">
                    规格: {{ itemInList["productSpecif"] }}
                  </view>
                  <view class="priceOperate">
                    <view class="price">¥ {{ itemInList["price"] }}</view>
                    <view class="operate">
                      购买数量：{{ itemInList["amount"] }}
                    </view>
                  </view>
                </view>
              </view>
            </swiper-item>
          </swiper>
          <!-- <view
            class="itemMessage"
            v-for="(itemInList, indexInList) in shoppingCart"
            :key="indexInList"
          >
            <view class="itemImg">
              <img src="../../../static/main/bannerBack@3x.png" alt="" />
            </view>
            <view class="itemInfo">
              <view class="name">
                {{ itemInList["productName"] }}
              </view>
              <view class="specification">
                规格: {{ itemInList["productSpecif"] }}
              </view>
              <view class="priceOperate">
                <view class="price">¥ {{ itemInList["price"] }}</view>
                <view class="operate">
                  购买数量：{{ itemInList["amount"] }}
                </view>
              </view>
            </view>
          </view> -->
        </view>
        <view class="coupon space_between">
          <!-- 优惠券如果没有的话要隐藏 -->
          <view>
            <img :src="'../../../static/main/coupon' + pixelRatio" alt="" />
            <span> 优惠券</span>
          </view>
          <view @click="gotoCoupon">
            <span v-if="activeCoupon" class="icon_sel"
              >¥{{ activeCoupon["couponPrice"] }}</span
            >
            <span v-else>暂无可使用</span>
            <uni-icon
              type=""
              class="iconfont  icon-more"
              style="font-size:15px"
            ></uni-icon>
          </view>
        </view>
        <view class="orderPrice">
          <view class="itemPrice space_between">
            <view>商品金额</view>
            <view>¥{{ shoppingPrice }}</view>
          </view>
          <view class="itemPrice space_between">
            <view>使用优惠券</view>
            <view>¥{{ couponPrice }}</view>
          </view>
          <view class="itemPrice space_between">
            <view>总计</view>
            <view>¥{{ totalPrice }}</view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="confirmOrder">
      <view class="payInfo"
        >支付：<span>¥{{ totalPrice }}</span></view
      >
      <view class="confirm">确认下单</view>
    </view>
  </view>
</template>
<script>
import * as storage from '../../../config/storage'
import topBar from '../../../components/topNavigation/index'
export default {
  components: {
    topBar
  },
  data () {
    return {
      pixelRatio: this.$pixelRatio,
      active: true,
      shoppingCart: null,
      shoppingPrice: null,
      couponPrice: 0,
      defaultCustAddress: null,
      defaultDrugAddress: null,
      selectorMode: true,
      activeCoupon: null
    }
  },
  onLoad () {
    this.shoppingCart = this.$store.getters.shoppingInfo;
    this.shoppingPrice = this.$store.getters.shoppingPrice;
  },
  computed: {
    totalPrice () {
      const totalPrice = this.shoppingPrice - this.couponPrice
      console.log('totalPrice_', totalPrice)
      return totalPrice
    },
    missShow () {
      console.log('this.defaultCustAddress_', this.defaultCustAddress)
      if (!this.defaultCustAddress) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    selectDrug () {
      this.$navTo.togo('/pages/myOrder/selectPage/drugstore')
    },
    operateAddress () {
      this.$navTo.togo('/pages/mine/myAddress/index')
    },
    gotoCoupon () {
      const url = '/pages/mine/myCoupon/index'
      this.$navTo.togo(url, { shoppingPrice: this.shoppingPrice })
    }
  },
  onShow () {
    this.defaultCustAddress = this.$store.getters.getCustSelectedAddress
    this.defaultDrugAddress = this.$store.getters.getSelectedDrug
    console.log(' this.$store.getters.getSelectedDrug_', this.$store.getters.getSelectedDrug);
    this.$store.dispatch('getCouponList').then(() => {
      const selectedCoupon = this.$store.getters.getSelectedCoupon(this.shoppingPrice)
      this.activeCoupon = selectedCoupon ? selectedCoupon : null
      this.couponPrice = this.activeCoupon ? this.activeCoupon['couponPrice'] : 0
    })
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  .scrollView {
    margin-top: px2rpx(1);
    display: flex;
    flex: 1;
    .wrapContent {
      width: 100%;
      height: 100%;
      .address {
        width: auto;
        background: #fff;
        height: px2rpx(198);
        padding: px2rpx(11) px2rpx(11);
        font-size: px2rpx(16);
        .personal {
          height: px2rpx(99);
          width: 100%;
          border-bottom: px2rpx(1) dashed #f3f3f3;
        }
        .drugstore {
          height: px2rpx(99);
          margin-top: px2rpx(11);
          width: 100%;
        }
        .addrresInfo {
          margin-left: px2rpx(27);
          margin-top: px2rpx(10);
          height: px2rpx(48);
          line-height: px2rpx(24);
        }
        .addrresMissInfo {
          margin-left: px2rpx(27);
          margin-top: px2rpx(10);
          height: px2rpx(48);
          line-height: px2rpx(24);
          text-align: center;
          .orderMiss {
            font-size: px2rpx(18);
            color: #4da08a;
          }
        }
      }
      .shoppingInfo {
        margin-top: px2rpx(5);
        height: px2rpx(102);
        background: #fff;
        width: auto;
        padding: px2rpx(17) px2rpx(11);
        .itemMessage {
          display: flex;
          width: 100%;
          height: px2rpx(96);
          margin-bottom: px2rpx(5);
          background: #ffffff;
          .itemImg {
            width: px2rpx(96);
            height: px2rpx(96);
            margin-right: px2rpx(14);
            img {
              background-size: cover;
              width: 100%;
              height: 100%;
            }
          }
          .itemInfo {
            display: flex;
            flex: 1;
            margin-right: px2rpx(20);
            flex-direction: column;
            .name {
              font-size: px2rpx(18);
              color: #282828;
              letter-spacing: 0;
            }
            .specification {
              font-size: px2rpx(15);
              color: #6c6c6c;
              letter-spacing: 0;
              margin-bottom: px2rpx(30);
            }
            .priceOperate {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              font-size: px2rpx(16);
              color: #6c6c6c;
            }
          }
        }
      }
      .coupon {
        padding: px2rpx(0) px2rpx(11);
        margin: px2rpx(5) px2rpx(0);
        height: px2rpx(44);
        // line-height: px2rpx(44);
        background: #fff;
        font-size: px2rpx(15);
        align-items: center;
        img {
          position: relative;
          top: px2rpx(4);
          height: px2rpx(20);
          width: px2rpx(20);
        }
        span {
          margin-left: px2rpx(8);
        }
      }
      .orderPrice {
        width: 100%;
        background: #fff;
        height: px2rpx(110);
        .itemPrice {
          height: px2rpx(36);
          line-height: px2rpx(36);
          border-bottom: px2rpx(2) solid #f3f3f3;
          padding: px2rpx(0) px2rpx(10);
          font-size: px2rpx(15);
          color: #282828;
        }
      }
    }
  }
  .confirmOrder {
    width: 100%;
    height: px2rpx(52);
    line-height: px2rpx(52);
    background: #fff;
    font-size: px2rpx(18);
    display: flex;
    .payInfo {
      display: flex;
      flex: 1;
      margin-left: px2rpx(11);
      height: px2rpx(52);
      line-height: px2rpx(52);
      span {
        color: #f5b11c;
      }
    }
    .confirm {
      height: px2rpx(52);
      line-height: px2rpx(52);
      background: #4da08a;
      color: #fff;
      text-align: center;
      width: px2rpx(120);
    }
  }
}
.icon_style {
  font-size: px2rpx(20);
  margin-top: px2rpx(5);
  margin-right: px2rpx(8);
}
.icon_order_style {
  font-size: px2rpx(18);
  margin-top: px2rpx(5);
  margin-right: px2rpx(8);
  color: #4da08a;
}
.icon_sel {
  color: #f5b11c;
}
.icon_unsel {
  color: #c3c3c3;
}
.space_between {
  display: flex;
  justify-content: space-between;
  .drugAddress {
    width: 70%;
    height: px2rpx(24);
    line-height: px2rpx(24);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>