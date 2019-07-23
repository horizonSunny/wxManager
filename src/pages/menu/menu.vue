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
        class="bananaList"
      >
        <swiper
          class="bananaList"
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
  </view>
</template>

<script>
import { uniSwiperDot, uniSwipeAction } from '@dcloudio/uni-ui'
import sunnyList from '../../components/list/list'
import sunnyListItem from '../../components/list/listItem'

export default {
  components: {
    uniSwiperDot,
    uniSwipeAction,
    sunnyList,
    sunnyListItem
  },
  data () {
    return {
      autoplay: false,
      interval: 2000,
      duration: 500,
      circular: true,
      bananaList: [],
      mode: 'indexes',
      current: 0,
      dotsStyles: {
        color: "#fff"
      },
      isActive: false,
      listNoBorder: false,
      menuList: []
    }
  },
  onLoad () {
    this.$api.get('luckin/getMenuList').then((res) => {
      // this.bananaList = res.data
    })
    // getpageList
    this.$api.get('luckin/menuSlideshow').then((res) => {
      this.bananaList = res.data
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
  .banner {
    .bananaList {
      width: px2upx(375);
      height: px2upx(130);
    }
  }
}
</style>
