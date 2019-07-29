<template>
  <view>
    <view class="swiperMenu">
      <view
        :class="currentMenu === item ? 'viewItemActive' : 'viewItem'"
        v-for="(item, index) in meunOptions"
        :key="index"
        @click="selectMenu(item)"
        >{{ item }}</view
      >
    </view>
    <view class="swiperContent">
      <swiper class="swiper">
        <swiper-item v-for="(item, index) in menuList" :key="index">
          <sunny-list-item
            :style-info="{ height: '78rpx' }"
            v-for="(itemInList, indexInList) in item"
            :key="indexInList"
          >
            <template v-slot:leftShow>
              <view class="leftShow">
                <view class="text_1340X1">外卖订单：23847563928174</view>
              </view>
            </template>
            <template v-slot:rightOption>
              <view class="rightShow">
                <!-- 0是未完成，1是完成，2是取消 -->
                <view class="text_1341X1" v-if="itemInList['type'] === 0">
                  待付款
                </view>
                <view class="text_1341X1" v-else-if="itemInList['type'] === 1">
                  已完成
                </view>
                <view class="text_1341X1" v-else-if="itemInList['type'] === 2">
                  已取消
                </view>
              </view>
            </template>
          </sunny-list-item>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import sunnyListItem from '../../components/list/listItem'
export default {
  components: {
    sunnyListItem
  },
  data: function () {
    return {
      currentMenu: '全部',
      meunOptions: ['全部', '未完成', '已完成'],
      menuList: {
        all: [],
        unfinished: [],
        finished: []

      }
    }
  },
  onLoad () {
    this.$api.get('luckin/orderManager').then((res) => {
      this.menuList['all'] = res.data
      for (let item = 0; item < res.data.length; item++) {
        switch (res.data[item]['type']) {
          case 1:
            this.menuList['unfinished'].push(res.data[item])
            break;
          case 2:
            this.menuList['finished'].push(res.data[item])
            break;
        }
      }
      console.log('this.menuList_', this.menuList)
    })
  },
  methods: {
    selectMenu (item) {
      this.currentMenu = item
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
  padding: px2rpx(15);
  .leftShow {
    width: px2rpx(180);
    height: px2rpx(39);
    .text_1340X1 {
      width: px2rpx(180);
      height: px2rpx(19);
      color: #a6a6a6;
      font-size: px2rpx(13);
      line-height: px2rpx(27);
      text-align: left;
      font-weight: bold;
    }
  }
  .rightShow {
    width: px2rpx(100);
    height: px2rpx(39);
    .text_1341X1 {
      width: px2rpx(100);
      height: px2rpx(19);
      color: #a6a6a6;
      font-size: px2rpx(13);
      line-height: px2rpx(27);
      text-align: right;
      font-weight: bold;
    }
  }
}
</style>
