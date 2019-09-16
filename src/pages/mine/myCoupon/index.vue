<template>
  <view class="wrap">
    <topBar page-title="我的优惠券"></topBar>
    <view class="content">
      <scroll-view scroll-y class="scrollView">
        <view class="addressItem">
          <view class="couponPrice">
            <view class="price">¥ <span>50</span></view>
            <view class="status">满0.01使用</view>
          </view>
          <view class="couponLine"></view>
          <view class="couponLimit">
            <view class="time">
              <view>有效日期:</view>
              <view>2019.09.02-2019.09.30</view>
            </view>
            <view class="couponSelected">
              <uni-icon
                type=""
                class="iconfont icon-couponSelected icon_style"
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
          background: #fff5de;
          text-align: center;
          color: #f5b11c;
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
        .couponLine {
          width: px2rpx(1);
          height: px2rpx(90);
          border-left: px2rpx(1) dashed #f5b11c;
        }
        .couponLimit {
          width: px2rpx(249);
          height: px2rpx(90);
          border-radius: px2rpx(6);
          border-style: none dashed;
          border: px2rpx(6);
          background: #fff5de;
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
        color: #4da08a;
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
}
</style>