<template>
  <view class="wrap">
    <topBar page-title="线上买药"></topBar>
    <!-- 头部导航 -->
    <view class="swiperMenu">
      <view
        class="viewItem"
        :class="currentMenu === item ? 'viewItemActive' : 'viewItemDeactive'"
        v-for="(item, index) in meunOptions"
        :key="index"
        @click="selectMenu(item)"
        >{{ item }}</view
      >
    </view>
    <view class="swiperContent">
      <swiper class="swiper" :current="currentList" @change="swiperList">
        <swiper-item
          v-for="(item, index) in menuList"
          :key="index"
          style="width:100%;height:100%;background:#fff"
        >
          <scroll-view scroll-y class="scrollView">
            <view
              class="itemMessage"
              v-for="(itemInList, indexInList) in item"
              :key="indexInList"
            >
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import * as storage from '../../../config/storage'
import sunnyListItem from '../../../components/list/listItem'
import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
import topBar from '../../../components/topNavigation/index'
export default {
  components: {
    sunnyListItem,
    luButtonRipple,
    topBar
  },
  data: function () {
    return {
      currentMenu: '处方药专区',
      meunOptions: ['处方药专区', '非传方药专区'],
      menuList: {
        prescription: [],
        otc: []
      },
      currentList: 0,
      // new 
      activeColor: 'red',
      fontSize: 13,
      // allHeight: 100
    }
  },
  computed: {
    allHeight () {
      let capsuleHeight
      capsuleHeight = storage.getSync('capsuleInfo')
      console.log('capsuleHeight_', capsuleHeight);
      return capsuleHeight
      // console.log('capsuleHeight_', capsuleHeight);
    }
  },
  onLoad () {
    this.$http.get('wxManager/getItemsList').then((res) => {
      for (let item = 0; item < res.data.length; item++) {
        switch (res.data[item]['type']) {
          case 0:
            this.menuList['prescription'].push(res.data[item])
            break;
          case 1:
            this.menuList['otc'].push(res.data[item])
            break;
        }
      }
      console.log('this.menuList_', this.menuList)
    })
  },
  methods: {
    selectMenu (item) {
      this.currentMenu = item
      const current = this.meunOptions.indexOf(item)
      console.log('current_', current);
      this.currentList = current
    },
    swiperList (e) {
      console.log('event_', e);
      const index = e.detail.current
      console.log('index_', index);
      const seletcName = this.meunOptions[index]
      this.currentMenu = seletcName

    },
    operateOption () {
      console.log('123');
    },
    goOperate (e) {
      console.log('goOperate_e_', e.target.id)
      let routerPath = '';
      switch (e.target.id) {
        case '去评价':
          routerPath = '/pages/orderManager/evaluation'
          break;
        case '去支付':
          routerPath = '/pages/orderManager/evaluation'
          break;
        case '再来一单':
          routerPath = '/pages/orderManager/evaluation'
          break;
      }
      uni.navigateTo({
        url: '/pages/orderManager/evaluation'
      });
    }
  }
}
</script>
<style lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .swiperMenu {
    display: flex;
    width: px2rpx(375);
    height: px2rpx(44);
    font-size: px2rpx(14);
    align-items: center;
    justify-content: space-around;
    .viewItem {
      font-size: px2rpx(15);
      text-align: center;
      width: 50%;
      height: px2rpx(44);
      line-height: px2rpx(44);
    }
    .viewItemActive {
      color: #fff;
      background: #4da08a;
    }
    .viewItemDeactive {
      color: #4da08a;
      background: #f3f3f3;
    }
  }
  .swiperContent {
    flex: 1;
    .swiper {
      width: 100%;
      height: 100%;
      .scrollView {
        width: 100%;
        height: 100%;
        .itemMessage {
        }
      }
    }
  }
}
</style>
