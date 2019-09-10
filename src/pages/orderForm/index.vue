<template>
  <view class="wrap">
    <topBar page-title="确认订单"></topBar>
    <scroll-view scroll-y class="scrollView">
      <view class="wrapContent">
        <view class="address">
          <view class="personal"></view>
          <view class="drugstore"></view>
        </view>
        <view class="shoppingInfo"></view>
        <view class="coupon"></view>
        <view class="orderPrice">
          <view class="itemPrice"></view>
          <view class="itemPrice"></view>
          <view class="itemPrice"></view>
        </view>
      </view>
    </scroll-view>
    <view class="confirmOrder"></view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
import topBar from '../../components/topNavigation/index'
export default {
  components: {
    topBar
  },
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
    margin-top: px2rpx(2);
    display: flex;
    flex: 1;
    .wrapContent {
      width: 100%;
      height: 100%;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      // justify-content: space-around;
      .address {
        width: auto;
        background: #fff;
        height: px2rpx(219);
        padding: px2rpx(11) px2rpx(11);
        .personal {
          height: px2rpx(109);
          width: 100%;
          border-bottom: px2rpx(2) dashed #f3f3f3;
        }
        .drugstore {
          height: px2rpx(109);
          width: 100%;
        }
      }
      .shoppingInfo {
        margin-top: px2rpx(5);
        height: px2rpx(136);
        background: #fff;
        width: auto;
        padding: px2rpx(17) px2rpx(11);
      }
      .coupon {
        padding: px2rpx(0) px2rpx(11);
        margin: px2rpx(5) px2rpx(0);
        background: #fff;
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
        }
      }
    }
  }
  .confirmOrder {
    width: 100%;
    height: px2rpx(52);
    background: #fff;
  }
}
</style>