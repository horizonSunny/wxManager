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
      <swiper
        v-if="swiperShow"
        class="swiper"
        :current="testIndex"
        @change="swiperList"
        :disable-programmatic-animation="true"
      >
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
              <view class="orderInfoHeader">
                <view>思派大药房</view>
                <view>待取药</view>
              </view>
              <view class="orderInfoContent">
                <view class="itemImg">
                  <img src="../../static/main/bannerBack@3x.png" alt="" />
                </view>
                <view class="itemInfo">
                  <view class="name">
                    {{ itemInList["name"] }}
                  </view>
                  <view class="specification">
                    <view> ¥ {{ itemInList["price"] }} </view>
                    <view> X3 </view>
                  </view>
                </view>
              </view>
              <view class="orderInfoFoot">
                <view>2019-09-05</view>
                <view @click="cancelOrder"> <button>取消订单</button></view>
                <view
                  ><button class="drugstore">
                    <uni-icon
                      type=""
                      class="iconfont icon-locate icon_style"
                    ></uni-icon
                    >药店
                  </button></view
                >
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
import topBar from '../../components/topNavigation/index'
import shoppingCart from '../../components/shoppingCart/index'
export default {
  components: {
    topBar,
    shoppingCart
  },
  data: function () {
    return {
      currentMenu: '',
      meunOptions: ['全部', '已接单', '待取药', '待配送'],
      menuList: {
        allList: [],
        medicineList: [],
        orderList: [],
        unfinishedList: []
      },
      // new 
      currentIndex: '',
      swiperShow: false
    }
  },
  computed: {
    shoppingCartShow () {
      return (this.$store.getters.shoppingInfo.length !== 0 ? true : false)
    },
    testIndex () {
      return this.currentIndex
    }
  },
  onLoad (option) {
    // 这边是从后台数据拿到商品列表，两次分开操作，解藕
    this.$http.get('wxManager/getItemsList').then((res) => {
      for (let item = 0; item < res.data.length; item++) {
        res.data[item]['amount'] = 0
        switch (res.data[item]['type']) {
          case 0:
            this.menuList['allList'].push(res.data[item])
            break;
          case 1:
            this.menuList['medicineList'].push(res.data[item])
            break;
        }
      }
      console.log('this.menuList_', this.menuList)
    }).then(() => {
      // 初始页面的时候这边要和购物车做一个比对，如果命名相同的话，将amount替换为购物车的数量
      const shoppingCart = this.$store.getters.shoppingInfo
      // 这边进行跳转操作
      console.log('option.currentMenu_', option.currentMenu);
      this.currentMenu = option.currentMenu
      switch (this.currentMenu) {
        case '全部':
          this.currentIndex = 0
          break;
        case '已接单':
          this.currentIndex = 1
          break;
        case '待取药':
          this.currentIndex = 2
          break;
        case '待配送':
          this.currentIndex = 3
          break;

        default:
          break;
      }
      this.swiperShow = true
    })
  },
  onShow () {
    console.log('onShow_');
  },
  methods: {
    selectMenu (item) {
      this.currentMenu = item
      const current = this.meunOptions.indexOf(item)
      console.log('current_', current);
      this.currentIndex = current
    },
    swiperList (e) {
      console.log('event_', e);
      const index = e.detail.current
      console.log('index_', index);
      const seletcName = this.meunOptions[index]
      this.currentMenu = seletcName

    },
    cancelOrder () {
      uni.showModal({
        title: '',
        content: '确定取消订单',
        cancelText: '是',
        confirmText: '否',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击不取消订单');
          } else if (res.cancel) {
            console.log('用户点击取消订单');
          }
        }
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
    border-top: px2rpx(1) solid #e5e5e5;
    display: flex;
    width: px2rpx(375);
    height: px2rpx(43);
    font-size: px2rpx(14);
    align-items: center;
    justify-content: space-around;
    .viewItem {
      font-size: px2rpx(16);
      text-align: center;
      height: px2rpx(39);
      line-height: px2rpx(43);
      border-bottom: px2rpx(4) solid #fff;
    }
    .viewItemActive {
      color: #4da08a;
      font-size: px2rpx(16);
      border-bottom: 4px solid #4da08a;
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
        padding-top: px2rpx(5);
        background: #f3f3f3;
        .itemMessage {
          display: flex;
          flex-direction: column;
          height: px2rpx(192);
          margin-bottom: px2rpx(5);
          background: #ffffff;
          padding: px2rpx(0) px2rpx(15);
          .orderInfoHeader {
            height: px2rpx(46);
            line-height: px2rpx(46);
            display: flex;
            font-size: px2rpx(15);
            color: #282828;
            border-bottom: px2rpx(1) solid #e5e5e5;
            justify-content: space-between;
          }
          .orderInfoContent {
            display: flex;
            padding: px2rpx(9) px2rpx(2);
            height: 89px;
            align-items: center;
            border-bottom: px2rpx(1) solid #e5e5e5;
            .itemImg {
              width: px2rpx(68);
              height: px2rpx(68);
              margin-right: px2rpx(14);
              img {
                background-size: cover;
                width: 100%;
                height: 100%;
              }
            }
            .itemInfo {
              display: flex;
              flex: 1;
              margin-right: px2rpx(16);
              flex-direction: column;
              .name {
                font-size: px2rpx(18);
                color: #282828;
                letter-spacing: 0;
              }
              .specification {
                display: flex;
                justify-content: space-between;
                font-size: px2rpx(16);
                color: #6c6c6c;
                letter-spacing: 0;
                margin-top: px2rpx(9);
              }
            }
          }
          .orderInfoFoot {
            height: px2rpx(55);
            line-height: px2rpx(55);
            display: flex;
            font-size: 15px;
            color: #6c6c6c;
            align-items: center;
            button {
              font-size: px2rpx(15);
              height: px2rpx(28);
              line-height: px2rpx(28);
              width: px2rpx(90);
              margin-left: px2rpx(33);
            }
            .drugstore {
              background: #4da08a;
              color: #fff;
            }
            .icon_style {
              font-size: px2rpx(15);
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
