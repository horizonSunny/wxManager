<template>
  <view class="page">
    <topBar
      page-title="即药"
      style="position:fixed;width:100%;z-index:999"
      background-info=""
      :back-info="false"
      font-color="#fff"
    ></topBar>
    <view class="header">
      <img :src="'../../static/main/bannerBack' + pixelRatio" />
    </view>
    <view class="content">
      <view class="buy">
        <img :src="'../../static/main/lineBuyMedicine' + pixelRatio" alt="" />
        <view class="text_info" @click="goShopping">
          <view class="buy_online">线上买药</view>
          <view class="buy_confirm"> 点击购买<i class="arrows"></i> </view>
        </view>
      </view>
      <view class="group_module">
        <view class="module">
          <img
            :src="'../../static/main/groupBuyMedicine' + pixelRatio"
            alt=""
          />
          <view>团购买药</view>
        </view>
        <view class="module">
          <img :src="'../../static/main/medicalGuide' + pixelRatio" alt="" />
          <view>就医指引</view>
        </view>
      </view>
      <view class="group_module">
        <view class="module">
          <img :src="'../../static/main/consultDoctor' + pixelRatio" alt="" />
          <view>咨询医生</view>
        </view>
        <view class="module">
          <img :src="'../../static/main/nearPharmacy' + pixelRatio" alt="" />
          <view>附近药店</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import topBar from '../../components/topNavigation/index'
export default {
  components: {
    topBar
  },
  onLoad () {
    this.$httpNoShow.get('patient/patient').then((res) => {
      // 用户信息放入store中
      this.$store.dispatch('setUserInfo', res.data).then((res) => {
        // console.log('userInfo_', this.$store.getters.getUserInfo);
      })
      // 获取用户取货地址
      if (this.$store.getters.getCustAddress.length == 0) {
        this.$store.dispatch('getCustAdd', res.data).then((res) => {
          // console.log('userInfo_', this.$store.getters.getUserInfo);
        })
      }
      // 设置全国直至
      if (this.$store.getters.getLocationAdd.length == 0) {
        this.$store.dispatch('setLocatAdd', res.data).then((res) => {
          // console.log('userInfo_', this.$store.getters.getUserInfo);
        })
      }
      // 获取购物车新
      this.$store.dispatch('getShoppingCart')
    })
    console.log('this.pixelRatio_', this.pixelRatio)
  },
  data () {
    return {
      pixelRatio: this.$pixelRatio
    }
  },
  methods: {
    goShopping () {
      this.$navTo.togo('onlineShopping/index')
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
  img {
    width: 100%;
    height: px2rpx(174);
  }
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: px2rpx(21) px2rpx(15);
  .buy {
    width: 100%;
    height: px2rpx(118);
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .text_info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      right: 15%;
      top: 50%;
      height: px2rpx(68);
      margin-top: px2rpx(-34);
      .buy_online {
        font-size: 19px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: justify;
      }
      .buy_confirm {
        display: flex;
        font-size: 16px;
        color: #ffda39;
        letter-spacing: 0;
        text-align: justify;
        position: relative;
        height: px2rpx(22);
        line-height: px2rpx(22);
        i {
          margin-left: px2rpx(5);
        }
      }
    }
  }
  .group_module {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .module {
      height: px2rpx(130);
      width: px2rpx(158);
      position: relative;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
      view {
        position: absolute;
        width: px2rpx(72);
        height: px2rpx(25);
        font-size: px2rpx(18);
        top: 70%;
        left: 50%;
        margin-left: px2rpx(-36);
        color: #ffffff;
      }
    }
  }
  // arrows 这里是箭头
  .arrows {
    background-color: rgba(255, 255, 255, 0);
  }
  .arrows:before,
  .arrows:after {
    position: absolute;
    content: "";
    border-top: px2rpx(10) transparent dashed;
    border-left: px2rpx(10) transparent dashed;
    border-bottom: px2rpx(10) transparent dashed;
    border-right: px2rpx(10) rgba(57, 153, 131, 1) solid;
  }
  .arrows:before {
    border-left: px2rpx(10) #ffda39 solid;
  }
  .arrows:after {
    top: px2rpx(1);
    /*覆盖并错开1px*/
    // border-bottom: 10px #fff solid;
  }
}
</style>