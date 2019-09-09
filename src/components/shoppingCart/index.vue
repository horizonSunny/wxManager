<template>
  <view class="shopCard">
    <view class="shoppingIcon">
      <view class="shoppingMount">{{ shopInfo["mount"] }}</view>
    </view>
    <view class="totalPrice"> ¥ {{ shopInfo["totalPrice"] }} </view>
    <view class="confirm">去下单</view>
  </view>
</template>
<script>
export default {
  props: ['shopInfo'],
  created () {
    console.log('shopCard_加载')
  },
}
</script>
<style lang="scss" scoped>
.shopCard {
  width: 100%;
  height: px2rpx(52);
  display: flex;
  flex: 1;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid #f3f3f3;
  position: relative;
  .shoppingIcon {
    position: absolute;
    bottom: px2rpx(10);
    left: px2rpx(14);
    height: px2rpx(52);
    width: px2rpx(52);
    border-radius: px2rpx(26);
    background: url("../../static/homePage/shoppingLine/购物车@3x.png");
    background-size: cover;
    padding: px2rpx(5);
    .shoppingMount {
      font-size: px2rpx(12);
      color: #fff;
      height: px2rpx(16);
      line-height: px2rpx(16);
      text-align: center;
      width: px2rpx(16);
      border-radius: px2rpx(8);
      background: red;
      float: right;
    }
  }
  .totalPrice {
    font-size: px2rpx(18);
    color: #969696;
    width: px2rpx(100);
    height: px2rpx(52);
    line-height: px2rpx(52);
    margin-left: px2rpx(100);
  }
  .confirm {
    width: px2rpx(120);
    height: px2rpx(52);
    line-height: px2rpx(52);
    text-align: center;
    width: px2rpx(120);
    font-size: px2rpx(18);
    background: #4da08a;
    float: right;
    color: #fff;
  }
}
</style>