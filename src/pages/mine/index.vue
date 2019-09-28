<template>
  <view class="page">
    <topBar
      page-title="个人中心"
      style="position:fixed;width:100%;z-index:999"
      background-info=""
      :back-info="false"
      font-color="#fff"
    ></topBar>
    <view class="header">
      <img :src="'../../static/main/bannerBack' + pixelRatio" />
      <view class="userInfo">
        <img :src="userAvatar" @error="avatorError" />
        <view class="name">
          <view>{{ userInfo["nickname"] || "无名" }}</view>
          <view>{{ userInfo["phone"] || "无电话" }}</view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="myOrder" @click="goOrder('全部')">
        <view>我的订单</view>
        <view class="lookAll"
          >查看全部
          <uni-icon type="" class="iconfont icon-more icon_style"></uni-icon>
        </view>
      </view>
      <view class="orderDivide">
        <view class="orderItem" @click="goOrder('待配送')">
          <view>
            <uni-icon
              type=""
              class="iconfont icon-tuangou icon_label_style"
            ></uni-icon>
          </view>
          <view>待配送</view>
        </view>
        <view class="orderItem" @click="goOrder('待取药')">
          <view>
            <uni-icon
              type=""
              class="iconfont icon-yao icon_label_style"
            ></uni-icon>
          </view>
          <view>待取药</view>
        </view>
        <view class="orderItem" @click="goOrder('已接单')">
          <view>
            <uni-icon
              type=""
              class="iconfont icon-yiwancheng icon_label_style"
            ></uni-icon>
          </view>
          <view>已接单</view>
        </view>
      </view>
      <view class="myOperate" @click="goCoupon">
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
      <view class="myOperate" @click="logOut">
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
      <view class="myOperate" @click="contactService">
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
      <view class="myOperate" @click="goAboutUs">
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
  data () {
    return {
      pixelRatio: this.$pixelRatio,
      userInfo: this.$store.getters.getUserInfo,
      userAvatar: this.$store.getters.getUserInfo.avatar,
      avatorDefault: '../../static/main/headPortrait' + this.$pixelRatio
    }
  },
  methods: {
    // 如果加载图片出错，设置默认图片
    avatorError () {
      console.log('avatorError')
      this.userAvatar = this.avatorDefault
    },
    goOrder (info) {
      let url = '/pages/myOrder/index?currentMenu=' + info
      this.$navTo.togo(url)
    },
    goCoupon () {
      this.$navTo.togo('/pages/mine/myCoupon/index')
    },
    goAboutUs () {
      this.$navTo.togo('/pages/mine/aboutUs/index')
    },
    logOut () {
      this.$navTo.togo('/pages/mine/setting/index')
    },
    contactService () {
      uni.makePhoneCall({
        phoneNumber: '17717918677'
      })
    }
  },
  onLoad () {
    console.log('this.userInfo_', this.$store.getters.getUserInfo)
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
      width: 30%;
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