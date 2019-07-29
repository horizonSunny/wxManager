<template>
  <view>
    <view class="swiperMenu">
      <view
        :class="
          currentMenu === item['orderName'] ? 'viewItemActive' : 'viewItem'
        "
        v-for="(item, index) in menuList"
        :key="index"
        @click="selectMenu(item)"
        >{{ item["orderName"] }}</view
      >
    </view>
    <view class="swiperContent"></view>
    <!-- <swiper class="swiper">
      <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">B</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">C</view>
      </swiper-item>
    </swiper> -->
  </view>
</template>
<script>
export default {
  data: function () {
    return {
      currentMenu: '全部',
      menuList: []
    }
  },
  onLoad () {
    this.$api.get('luckin/orderManager').then((res) => {
      this.menuList = res.data
    })
  },
  methods: {
    selectMenu (item) {
      this.currentMenu = item['orderName']
    }
  }
}
</script>
<style lang="scss">
.swiperMenu {
  display: flex;
  width: px2rpx(375);
  height: px2rpx(44);
  font-size: px2rpx(14);
  align-items: center;
  justify-content: space-around;
  .viewItem {
    // width: px2rpx(60);
    font-size: px2rpx(15);
    text-align: center;
    border-bottom: 4px solid #fff;
  }
  .viewItemActive {
    color: #88afd5;
    font-size: px2rpx(15);
    border-bottom: 4px solid #88afd5;
  }
}
.swiperContent {
}
</style>
