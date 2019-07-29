<template>
  <view class="wrap">
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
              <view class="itemTitle">
                <view class="leftShow">
                  <view class="text_1340X1">外卖订单：23847563928174</view>
                </view>
                <view class="rightShow">
                  <view class="text_1341X1" v-if="itemInList['type'] === 0">
                    待付款
                  </view>
                  <view
                    class="text_1341X1"
                    v-else-if="itemInList['type'] === 1"
                  >
                    已完成
                  </view>
                  <view
                    class="text_1341X1"
                    v-else-if="itemInList['type'] === 2"
                  >
                    已取消
                  </view>
                </view>
              </view>
              <view class="itemContent">
                <view class="leftShow">
                  <view class="text_2481X1">北京市朝阳区青年汇佳园十号...</view>
                  <br />
                  <view class="text_2482X1">榛果拿铁 共1件商品</view>
                </view>
                <view class="rightShow">
                  <view class="text_2488X1">2019-01-08 08:09:05</view>
                </view>
              </view>
              <view class="itemFooter">
                <view class="leftShow">
                  <view class="text_2487X1">¥12</view>
                </view>
                <view class="rightShow">
                  <luButtonRipple
                    rippleBackgroundColor="red"
                    :rippleOpacity="item.opacity"
                    buttonRippleId="1"
                    @rippleTap="operateOption"
                  >
                    <!-- <img :src="item['img']" alt="" /> -->
                    <view
                      style="display:flex;width:500rpx;justify-content:flex-end"
                    >
                      <view
                        class="text_2486X1"
                        style="color:rgba(56, 56, 56, 1);background:#f2f2f2;border:1px solid #f2f2f2"
                        >再来一单</view
                      >
                      <view
                        class="text_2486X1"
                        style="color:rgba(255, 129, 2, 1);background:#fff;border:1px solid rgba(255, 129, 2, 1)"
                        >去支付</view
                      >
                      <view
                        class="text_2486X1"
                        style="color:rgba(144, 192, 239, 1);background:#fff;border:1px solid rgba(144, 192, 239, 1)"
                        >去评价</view
                      >
                    </view>
                  </luButtonRipple>
                </view>
              </view>
              <view class="itemSpt"></view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import sunnyListItem from '../../components/list/listItem'
import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
export default {
  components: {
    sunnyListItem,
    luButtonRipple
  },
  data: function () {
    return {
      currentMenu: '全部',
      meunOptions: ['全部', '未完成', '已完成'],
      menuList: {
        all: [],
        unfinished: [],
        finished: []

      },
      currentList: 0
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
      border-bottom: 4px solid #fff;
    }
    .viewItemActive {
      color: #88afd5;
      font-size: px2rpx(15);
      border-bottom: 4px solid #88afd5;
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
          .itemTitle {
            padding: px2rpx(15);
            display: flex;
            border-bottom: 1px solid #f2f2f2;
            justify-content: space-between;
            align-items: center;
            .leftShow {
              display: flex;
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
              .text_2481X1 {
                width: px2rpx(210);
                height: px2rpx(22);
                color: rgba(56, 56, 56, 1);
                font-size: px2rpx(15);
                line-height: px2rpx(22);
                text-align: left;
                font-weight: bold;
              }
              .text_2482X1 {
                width: px2rpx(135);
                height: px2rpx(19);
                color: rgba(80, 80, 80, 1);
                font-size: px2rpx(13);
                height: px2rpx(22);
                text-align: left;
              }
            }
            .rightShow {
              display: flex;
              width: px2rpx(100);
              height: px2rpx(39);
              margin-right: px2rpx(10);
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
          .itemContent {
            padding: px2rpx(15);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .leftShow {
              width: px2rpx(180);
              height: px2rpx(39);
              .text_2481X1 {
                width: px2rpx(210);
                height: px2rpx(22);
                color: rgba(56, 56, 56, 1);
                font-size: px2rpx(15);
                line-height: px2rpx(22);
                text-align: left;
                font-weight: bold;
              }
              .text_2482X1 {
                width: px2rpx(135);
                height: px2rpx(19);
                color: rgba(80, 80, 80, 1);
                font-size: px2rpx(13);
                height: px2rpx(22);
                text-align: left;
              }
            }
            .rightShow {
              display: flex;
              width: px2rpx(130);
              height: px2rpx(39);
              .text_2488X1 {
                width: px2rpx(125);
                height: px2rpx(18);
                color: rgba(166, 166, 166, 1);
                font-size: px2rpx(12);
                text-align: left;
              }
            }
          }
          .itemFooter {
            padding: 0 px2rpx(15);
            display: flex;
            margin-top: px2rpx(26);
            border-bottom: 1px solid #f2f2f2;
            justify-content: space-between;
            align-items: center;
            .leftShow {
              width: px2rpx(50);
              height: px2rpx(39);
              line-height: px2rpx(39);
              .text_2487X1 {
                width: px2rpx(25);
                height: px2rpx(21);
                color: rgba(56, 56, 56, 1);
                font-size: px2rpx(14);
                text-align: left;
                font-weight: bold;
              }
            }
            .rightShow {
              display: flex;
              position: relative;
              // top: px2rpx(0);
              width: px2rpx(250);
              height: px2rpx(39);
              justify-content: space-around;
              .text_2486X1 {
                width: px2rpx(74);
                height: px2rpx(28);
                line-height: px2rpx(28);
                color: rgba(56, 56, 56, 1);
                box-shadow: rgba(242, 242, 242, 1) solid 1px;
                border-radius: px2rpx(4);
                font-size: px2rpx(13);
                text-align: center;
                margin-left: px2rpx(10);
              }
            }
          }
          .itemSpt {
            height: px2rpx(10);
            background: #f2f2f2;
          }
        }
      }
    }
  }
}
</style>
