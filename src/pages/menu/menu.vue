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
    <view class="contentInfo">
      <view class="classifyBar">
        <view
          v-for="(item, index) in menuList"
          :key="index"
          class="menuItem"
          :class="activeSelected === item ? 'hasSelected' : ''"
          @click="menuSelect(item)"
        >
          {{ item }}
        </view>
      </view>
      <view class="category"></view>
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
      categoryList: [],
      menuList: [],
      activeSelected: '',
    }
  },
  onLoad () {
    this.$api.get('luckin/getMenuList').then((res) => {
      this.categoryList = res.data
      this.menuList = res.data.map((item) => {
        return item.classifyName
      })
      // this.menuList = ['12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '12', '13']
      this.activeSelected = this.menuList[0]
    })
    // getpageList
    this.$api.get('luckin/menuSlideshow').then((res) => {
      this.bananaList = res.data
    })
  },
  methods: {
    change (e) {
      this.current = e.detail.current;
    },
    menuSelect (e) {
      console.log('activeSelected_', e)
      this.activeSelected = e
    }
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .banner {
    .bananaList {
      width: px2rpx(375);
      height: px2rpx(130);
    }
  }
  .contentInfo {
    display: flex;
    flex: 1;
    overflow: hidden;
    .classifyBar {
      width: px2rpx(90);
      background: #f8f8f8;
      overflow: scroll;
      .menuItem {
        width: px2rpx(90);
        height: px2rpx(44);
        color: rgba(80, 80, 80, 1);
        font-size: 14px;
        line-height: px2rpx(44);
        text-align: center;
      }
      .hasSelected {
        background: #fff;
        border-left: 1px solid rgb(135, 172, 235);
      }
    }
    .category {
      width: px2rpx(285);
      background: #fff;
      padding-left: px2rpx(14);
      padding-top: px2rpx(10);
    }
  }
}
</style>
