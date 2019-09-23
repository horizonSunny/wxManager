<template>
  <view class="wrap">
    <topBar page-title="我的优惠券"></topBar>
    <view class="content">
      <scroll-view scroll-y class="scrollView">
        <!-- 不能给数据合并打上标签，因为在我的Coupon里面，modelPrice应该是0 -->
        <view
          class="addressItem"
          v-for="(item, index) in activeCoupon"
          :key="index"
          @click="gotoOrder(index)"
        >
          <view class="couponPrice" :class="['activeBack', 'activeLabel']">
            <view class="price"
              >¥ <span>{{ item["couponPrice"] }}</span></view
            >
            <view class="status">满{{ item["useMinPrice"] }}使用</view>
          </view>
          <view :class="['couponLineActive']"></view>
          <view class="couponLimit" :class="['activeBack']">
            <view class="time">
              <view>有效日期:</view>
              <view>{{ item["startTime"] }}-{{ item["endTime"] }}</view>
            </view>
            <view class="couponSelected">
              <uni-icon
                type=""
                class="iconfont icon-couponSelected icon_style"
                :class="['activeLabel']"
              ></uni-icon>
            </view>
          </view>
        </view>
        <!-- 这里是不能使用的进行选择 -->
        <view
          class="addressItem"
          v-for="(item, index) in deactiveCoupon"
          :key="index"
        >
          <view class="couponPrice" :class="['deactiveBack', 'deactiveLabel']">
            <view class="price"
              >¥ <span>{{ item["couponPrice"] }}</span></view
            >
            <view class="status">满{{ item["useMinPrice"] }}使用</view>
          </view>
          <view :class="['couponLineDeactive']"></view>
          <view class="couponLimit" :class="['deactiveBack']">
            <view class="time">
              <view>有效日期:</view>
              <view>{{ item["startTime"] }}-{{ item["endTime"] }}</view>
            </view>
            <view class="couponSelected">
              <uni-icon
                type=""
                class="iconfont icon-couponSelected icon_style"
                :class="['deactiveLabel']"
              ></uni-icon>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import topBar from '../../../components/topNavigation/index'
export default {
  components: {
    topBar,
  },
  data () {
    return {
      activeCoupon: null,
      deactiveCoupon: null,
      shoppingPrice: Infinity
    }
  },
  methods: {
    gotoOrder (index) {
      const coupon = this.activeCoupon[index]
      let pages = getCurrentPages();  //获取所有页面栈实例列表
      const prvPage = pages[pages.length - 2]
      console.log('prvPage_', prvPage)
      if (prvPage.route === "pages/myOrder/orderForm/index") {
        this.$store.commit('SET_COUPONLIST', coupon)
      }
      uni.navigateBack()
    }
  },
  onShow () {
    this.defaultCustAddress = this.$store.getters.getCustSelectedAddress
    this.$store.dispatch('getCouponList').then(() => {
      console.log('this.$store.getters.getCouponMode(this.shoppingPrice)', this.$store.getters.getCouponMode(this.shoppingPrice));
      this.activeCoupon = this.$store.getters.getCouponMode(this.shoppingPrice).activeCoupon
      this.deactiveCoupon = this.$store.getters.getCouponMode(this.shoppingPrice).deactiveCoupon
    })
  },
  onLoad: function (option) {
    console.log('option_', option.shoppingPrice)
    if (option.shoppingPrice) {
      this.shoppingPrice = option.shoppingPrice
    }
    console.log('this.shoppingPrice_', this.shoppingPrice)
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .content {
    flex: 1;
    margin-top: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    .scrollView {
      width: 100%;
      height: 100%;
      background: #fff;
      .addressItem {
        margin: px2rpx(20) px2rpx(10) px2rpx(0);
        border-radius: px2rpx(6);
        height: px2rpx(90);
        font-size: px2rpx(16);
        display: flex;
        .couponPrice {
          width: px2rpx(106);
          height: px2rpx(90);
          border-radius: px2rpx(6);
          border: px2rpx(6);
          text-align: center;
          .price {
            height: px2rpx(50);
            line-height: px2rpx(50);
            font-size: px2rpx(16);
            span {
              font-size: px2rpx(30);
            }
          }
          .status {
            height: px2rpx(40);
            font-size: px2rpx(14);
            line-height: px2rpx(40);
          }
        }
        .couponLimit {
          width: px2rpx(249);
          height: px2rpx(90);
          border-radius: px2rpx(6);
          border-style: none dashed;
          border: px2rpx(6);
          display: flex;
          align-items: center;
          .time {
            margin-left: px2rpx(14);
            font-size: px2rpx(14);
          }
          .couponSelected {
            margin-left: px2rpx(39);
          }
        }
      }
      .icon_style {
        font-size: px2rpx(25);
      }
    }
  }
  .footer {
    height: px2rpx(51);
    padding: px2rpx(12) px2rpx(10);
    button {
      background: #4da08a;
      border-radius: 5px;
      color: #fff;
      height: px2rpx(51);
      font-size: px2rpx(18);
    }
  }
  .activeBack {
    background: #fff5de;
  }
  .activeLabel {
    color: #f58d1c;
  }
  .deactiveBack {
    background: #f3f3f3;
  }
  .deactiveLabel {
    color: #6c6c6c;
  }
  .couponLineActive {
    width: px2rpx(1);
    height: px2rpx(90);
    border-left: px2rpx(1) dashed #f5b11c;
  }
  .couponLineDeactive {
    width: px2rpx(1);
    height: px2rpx(90);
    border-left: px2rpx(1) dashed #c5c5c5;
  }
}
</style>