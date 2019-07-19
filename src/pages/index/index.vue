<template>
  <view class="content">
    <view class="banner">
      <uni-swiper-dot
        iper-dot
        :info="bananaList"
        :current="current"
        field="content"
        :mode="mode"
        :dotsStyles="dotsStyles"
      >
        <swiper
          class="swiper"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          :circular="circular"
          @change="change"
        >
          <swiper-item v-for="(item, index) in bananaList" :key="index">
            <view class="swiper-item uni-bg-red">
              <img class="bananaList" :src="item.src" alt="轮播图" />
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
    <view class="">
      <uni-swipe-action :options="options">
        <view class="cont">SwipeAction 基础使用场景</view>
      </uni-swipe-action>
    </view>
  </view>
</template>

<script>
import { uniSwiperDot, uniSwipeAction } from '@dcloudio/uni-ui'
export default {
  components: {
    uniSwiperDot,
    uniSwipeAction
  },
  data () {
    return {
      title: 'Hello',
      background: ['color1', 'color2', 'color3'],
      autoplay: true,
      interval: 2000,
      duration: 500,
      circular: true,
      bananaList: [],
      mode: 'indexes',
      current: 0,
      dotsStyles: {
        color: "#fff",
        // backgroundColor: "",
        // selectedBackgroundColor: ""
      },
      options: [{
        text: '取消',
        style: {
          backgroundColor: '#007aff'
        }
      }, {
        text: '确认',
        style: {
          backgroundColor: '#dd524d'
        }
      }]
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
    change (e) {
      this.current = e.detail.current;
    }
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
