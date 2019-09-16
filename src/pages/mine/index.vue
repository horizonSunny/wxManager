<template>
  <div class="page">
    <topBar
      page-title="个人中心"
      style="position:fixed;width:100%"
      background-info=""
      :back-info="false"
      font-color="#fff"
    ></topBar>
    <div class="header">
      <img src="../../static/homePage/main/组件-banner背景.png" />
    </div>
    <div class="content">
      <div class="buy">
        <img src="../../static/homePage/main/组件-线上买药背景.png" alt="" />
        <div class="text_info">
          <div class="buy_online">线上买药</div>
          <div @click="goShopping" class="buy_confirm">
            点击购买<i class="arrows"></i>
          </div>
        </div>
      </div>
      <div class="group_module">
        <div class="module">
          <img src="../../static/homePage/main/组件-团购买药背景.png" alt="" />
          <div>团购买药</div>
        </div>
        <div class="module">
          <img src="../../static/homePage/main/组件-就医指引背景.png" alt="" />
          <div>就医指引</div>
        </div>
      </div>
      <div class="group_module">
        <div class="module">
          <img src="../../static/homePage/main/组件-咨询医生背景.png" alt="" />
          <div>咨询医生</div>
        </div>
        <div class="module">
          <img src="../../static/homePage/main/组件-附近药店背景.png" alt="" />
          <div>附近药店</div>
        </div>
      </div>
    </div>
  </div>
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
      div {
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