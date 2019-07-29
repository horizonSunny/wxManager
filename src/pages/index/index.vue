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
    <view class="swipeAction">
      <view style="margin-left:10%">
        <sunny-list :no-border="listNoBorder">
          <sunny-list-item :style-info="{ height: '138rpx' }">
            <template v-slot:leftShow>
              <view class="test">
                <text class="text_2950X1">青年汇店</text><br />
                <text class="text_2949X1">距离您53m</text>
              </view>
            </template>
            <template v-slot:rightOption>
              <view class="translateDemo" @click="slideClick">
                <view
                  class="translation"
                  :class="isActive ? 'active' : 'noActvie'"
                >
                </view>
                <Text
                  style="position: absolute;
              font-size: 12px;
              top: 10px;
              z-index: ;
              right: 13px;
              "
                  >外卖</Text
                >
                <Text
                  style="position: absolute;
              font-size: 12px;
              top: 10px;
              z-index: ;
              left: 17px;
              "
                  >堂吃</Text
                >
                <!-- <Text>自提</Text> -->
              </view>
            </template>
          </sunny-list-item>
          <sunny-list-item
            v-for="(item, index) in menuList"
            :key="index"
            :style-info="{ height: '138rpx' }"
          >
            <template v-slot:leftShow>
              <view class="test">
                <text class="text_2950X1">{{ item.title }}</text
                ><br />
                <text class="text_2949X1">{{ item.annotation }}</text>
              </view>
            </template>
            <template v-slot:rightOption>
              <view class="outerCircle">
                <img :src="item.src" alt="" class="showImg" />
              </view>
            </template>
          </sunny-list-item>
        </sunny-list>
      </view>
      <view class="bottomDisplay">
        <img src="../../static/homePage/图片 568.png" alt="" />
      </view>
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
    // uniList
    // list
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
    this.$api.get('luckin/slideshow').then((res) => {
      this.bananaList = res.data
    })
    // getpageList
    this.$api.get('luckin/getPageLIst').then((res) => {
      console.log('in_index_', res)
      this.menuList = res.data
      console.log('menuList_', this.menuList);
    })
    // 获取屏幕信息
  },
  methods: {
    change (e) {
      this.current = e.detail.current;
    },
    slideClick (e) {
      console.log(e)
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss">
// @function px2rpx($px) {
//   @return $px * 2rpx;
// }
.content {
  text-align: center;
  height: px2rpx(200);
  background: #ffffff;
  .bananaList {
    width: 100%;
  }
}
.swipeAction {
  width: 90%;
  height: px2rpx(100);
  .translateDemo {
    border: 1px solid #6488afd5;
    height: px2rpx(36);
    width: px2rpx(90);
    border-radius: px2rpx(19);
    position: relative;
    vertical-align: middle;
    .translation {
      height: px2rpx(30);
      width: px2rpx(44);
      border-radius: px2rpx(15);
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    .active {
      // @include activeBase;
      animation: myfirst 0.5s forwards;
    }
    .noActvie {
      // @include activeBase;
      animation: myfirstTwo 0.5s forwards;
    }
  }
  .listNoBorderTop:before {
    background: #fff;
  }
  .test {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  // list 列表样式
  .text_2950X1 {
    width: auto;
    height: px2rpx(22);
    left: px2rpx(20);
    top: px2rpx(221);
    color: rgba(56, 56, 56, 1);
    font-size: px2rpx(15);
    line-height: 150%;
    text-align: left;
  }
  .text_2949X1 {
    width: auto;
    height: px2rpx(17);
    left: px2rpx(20);
    top: px2rpx(243);
    color: rgba(128, 128, 128, 1);
    font-size: px2rpx(11);
    line-height: 150%;
    text-align: left;
  }
  .leftShowIn {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .outerCircle {
    // width: 80rpx;
    // height: 80rpx;
    width: px2rpx(40);
    height: px2rpx(40);
    color: #63473a;
    border: solid 1px #63473a;
    // right: 20px;
    // position: relative;
    border-radius: px2rpx(21);
    .showImg {
      height: px2rpx(24);
      width: px2rpx(24);
      // right: 20px;
      top: px2rpx(8);
      position: relative;
    }
  }
  // 底下的展示广告
  .bottomDisplay {
    width: 90%;
    height: px2rpx(55);
    margin-left: 10%;
    img {
      width: 100%;
      height: px2rpx(55);
    }
  }
}
@keyframes myfirst {
  from {
    background: #6488afd5;
    margin-left: 5%;
  }
  to {
    background: #88afd5;
    margin-left: 45%;
  }
}
@keyframes myfirstTwo {
  from {
    background: #88afd5;
    margin-left: 45%;
  }
  to {
    background: #88afd5;
    margin-left: 10%;
  }
}

.logo {
  height: px2rpx(200);
  width: px2rpx(200);
  margin-top: px2rpx(200);
}

.title {
  font-size: px2rpx(36);
  color: #8f8f94;
}
</style>
