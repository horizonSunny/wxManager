<template>
  <view class="page">
    <topBar
      page-title="个人中心"
      style="position:fixed;width:100%"
      background-info=""
      :back-info="false"
      font-color="#fff"
    ></topBar>
    <view class="header">
      <img src="../../static/homePage/main/组件-banner背景.png" />
      <view class="userInfo">
        <img />
        <view class="name">
          <view>王弥茗</view>
          <view>13689076890</view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="myOrder">
        <view>我的订单</view>
        <view class="lookAll"
          >查看全部
          <uni-icon type="" class="iconfont icon-more icon_style"></uni-icon>
        </view>
      </view>
      <view class="orderDivide">
        <view class="orderItem">
          <view>
            <uni-icon
              type=""
              class="iconfont icon-tuangou icon_label_style"
            ></uni-icon>
          </view>
          <view>待成团</view>
        </view>
        <view class="orderItem">
          <view>
            <uni-icon
              type=""
              class="iconfont icon-yao icon_label_style"
            ></uni-icon>
          </view>
          <view>待取药</view>
        </view>
        <view class="orderItem">
          <view>
            <uni-icon
              type=""
              class="iconfont icon-yiwancheng icon_label_style"
            ></uni-icon>
          </view>
          <view>已完成</view>
        </view>
      </view>
      <view class="myOperate">
        <view>
          <uni-icon
            type=""
            class="iconfont icon-youhuiquan icon_label_info"
          ></uni-icon>
          <span>我的优惠券</span>
        </view>
        <view>
          <uni-icon type="" class="iconfont icon-more icon_style"></uni-icon>
        </view>
      </view>
      <view class="myOperate">
        <view>
          <uni-icon
            type=""
            class="iconfont icon-shezhi icon_label_info"
          ></uni-icon>
          <span>设置</span>
        </view>
        <view>
          <uni-icon type="" class="iconfont icon-more icon_style"></uni-icon>
        </view>
      </view>
      <view class="myOperate">
        <view>
          <uni-icon
            type=""
            class="iconfont icon-lianxikefu icon_label_info"
          ></uni-icon>
          <span>联系客服</span>
        </view>
        <view>
          <uni-icon type="" class="iconfont icon-more icon_style"></uni-icon>
        </view>
      </view>
      <view class="myOperate">
        <view>
          <uni-icon
            type=""
            class="iconfont icon-guanyuwomen icon_label_info"
          ></uni-icon>
          <span>关于我们</span>
        </view>
        <view>
          <uni-icon type="" class="iconfont icon-more icon_style"></uni-icon>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import topBar from '../../components/topNavigation/index'
export default {
  components: {
    topBar,
  },
  methods: {
    goShopping () {
      uni.navigateTo({
        url: 'onlineShopping/index',
        animationType: 'none'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: px2rpx(174);
  position: relative;
  img {
    width: 100%;
    height: px2rpx(174);
  }
  .userInfo {
    position: absolute;
    left: px2rpx(12);
    top: px2rpx(76);
    height: px2rpx(66);
    width: 100%;
    display: flex;
    align-items: center;
    img {
      height: px2rpx(66);
      width: px2rpx(66);
      border-radius: px2rpx(33);
      background: #ffda39;
    }
    .name {
      margin-left: px2rpx(16);
      font-size: px2rpx(18);
      color: #ffffff;
    }
  }
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  .icon_style {
    font-size: px2rpx(16);
  }
  .myOrder {
    padding: px2rpx(0) px2rpx(10);
    height: px2rpx(48);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: px2rpx(16);
    background: #fff;
    .lookAll {
      color: #6c6c6c;
    }
    margin-bottom: px2rpx(1);
  }
  .orderDivide {
    padding: px2rpx(0) px2rpx(10);
    display: flex;
    background-color: #fff;
    align-items: center;
    margin-top: px2rpx(1) px2rpx(0) px2rpx(4);
    height: px2rpx(90);
    justify-content: space-between;
    .orderItem {
      height: px2rpx(61);
      width: px2rpx(51);
      font-size: px2rpx(17);
      color: #282828;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .icon_label_style {
      font-size: px2rpx(30);
      color: #4da08a;
      margin-top: px2rpx(7);
    }
  }
  .myOperate {
    padding: px2rpx(0) px2rpx(10);
    display: flex;
    height: px2rpx(58);
    align-items: center;
    justify-content: space-between;
    margin-top: px2rpx(1);
    background: #fff;
    font-size: px2rpx(20);
    color: #282828;
    .icon_label_info {
      color: #4da08a;
    }
    span {
      margin-left: px2rpx(20);
    }
  }
}
</style>