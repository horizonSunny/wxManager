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
      <view class="translateDemo" @click="slideClick">
        <view class="translation" :class="isActive ? 'active' : 'noActvie'">
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
      <view>
        <!-- <uni-list-sssdasdad>
          123
        </uni-list-sssdasdad> -->
        <sunnyList>
          <sunnyListItem>
            <template v-slot:leftShow>
              hello
            </template>
            <template v-slot:rightOption>
              world
            </template>
          </sunnyListItem>
          <!-- <sunnyListItem>
            <template v-slot:leftShow>
              hello
            </template>
            <template v-slot:rightOption>
              world
            </template>
          </sunnyListItem>
          <sunnyListItem>
            <template v-slot:leftShow>
              hello
            </template>
            <template v-slot:rightOption>
              world
            </template>
          </sunnyListItem> -->
        </sunnyList>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSwiperDot, uniSwipeAction } from '@dcloudio/uni-ui'
import { sunnyList } from '../../components/list/list'
import { sunnyListItem } from '../../components/list/listItem'

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
      isActive: false
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
    },
    slideClick (e) {
      console.log(e)
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss">
.content {
  text-align: center;
  height: 400px;
  background: #ffffff;
  .bananaList {
    width: 100%;
  }
}
.swipeAction {
  width: 80%;
  height: 100px;
  .translateDemo {
    border: 1px solid #6488afd5;
    height: 36px;
    width: 90px;
    border-radius: 19px;
    position: relative;
    vertical-align: middle;
    .translation {
      height: 30px;
      width: 44px;
      border-radius: 15px;
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
  .noBorderTop:before {
    background: #fff;
  }
  // 组件自带技能
  .uni-list:before {
    height: 0px;
  }
  .uni-list:after {
    height: 0px;
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
  height: 200px;
  width: 200px;
  margin-top: 200px;
}

.title {
  font-size: 36px;
  color: #8f8f94;
}
</style>
