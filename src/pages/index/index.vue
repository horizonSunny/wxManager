<template>
  <view class="content">
    <view class="banner">
      <swiper
        class="swiper"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
      >
        <swiper-item v-for="(item, index) in bananaList" :key="index">
          <view class="swiper-item uni-bg-red">
            <img class="bananaList" :src="item.src" alt="轮播图" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class=""></view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello',
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      circular: true,
      bananaList: []
    }
  },
  onLoad () {
    this.$api.get('luckin/slideshow').then((res) => {
      console.log('in_index_', res)
      this.bananaList = res.data
      console.log('bananalist_', this.bananaList);
    })
  },
  methods: {

  }
}
</script>

<style lang="scss">
.content {
  text-align: center;
  height: 400upx;
  background: #ffffff;
  .bananaList {
    width: 100%;
  }
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
