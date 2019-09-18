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
      <swiper class="swiper" :current="currentDrugType" @change="swiperList">
        <swiper-item
          v-for="(item, index) in menuList"
          :key="index"
          style="width:100%;height:100%;background:#fff"
        >
          <scroll-view
            scroll-y
            class="scrollView"
            @scrolltolower="scrolltolower"
          >
            <view
              class="itemMessage"
              v-for="(itemInList, indexInList) in item"
              :key="indexInList"
            >
              <view class="itemImg">
                <!-- <img src="../../../static/main/bannerBack@3x.png" alt="" /> -->
                <img :src="item['image']" alt="" />
              </view>
              <view class="itemInfo">
                <view class="name">
                  {{ itemInList["productName"] }}
                </view>
                <view class="specification">
                  规格: {{ itemInList["specification"] }}
                </view>
                <view class="priceOperate">
                  <view class="price">¥ {{ itemInList["price"] }}</view>
                  <view class="operate">
                    <view @click="operateShopping('minus', itemInList)">
                      <uni-icon
                        type=""
                        class="iconfont icon-minus icon_style"
                      ></uni-icon>
                    </view>
                    {{ itemInList["amount"] }}
                    <view @click="operateShopping('add', itemInList)">
                      <uni-icon
                        type=""
                        class="iconfont icon-plus icon_style"
                      ></uni-icon>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <shoppingCart v-if="shoppingCartShow"></shoppingCart>
  </view>
</template>
<script>
import * as storage from '../../../config/storage'
import topBar from '../../../components/topNavigation/index'
import shoppingCart from '../../../components/shoppingCart/index'
export default {
  components: {
    topBar,
    shoppingCart
  },
  data: function () {
    return {
      currentMenu: '处方药专区',
      meunOptions: ['处方药专区', '非传方药专区'],
      menuList: {
        prescription: [],
        otc: []
      },
      currentDrugType: 0,
      // 分页，滑动再增加
      prePageNumber: 0,
      otcPageNumber: 0,
      pageSize: 10,
    }
  },
  computed: {
    shoppingCartShow () {
      return (this.$store.getters.shoppingInfo.length !== 0 ? true : false)
    }
  },
  onLoad () {
    this.getShoppingList(this.currentDrugType)
  },
  methods: {
    selectMenu (item) {
      this.currentMenu = item
      const current = this.meunOptions.indexOf(item)
      console.log('current_', current);
      this.currentDrugType = current
    },
    swiperList (e) {
      console.log('event_', e);
      const index = e.detail.current
      console.log('index_', index);
      const seletcName = this.meunOptions[index]
      this.currentMenu = seletcName

    },
    // 下面就是操作购物车,所以列表中的数量就是购物车中的数据，数量值只保存到购物车中
    operateShopping (operate, itemInfo) {
      if (operate === 'add') {
        // 这边操作的是一个对象，所以购物车里面数量改变，对应的列表数量也改变，引用指针对象
        this.$store.dispatch('setCommodityInfo', itemInfo).then((res) => {
        })
      } else {
        // 同上
        itemInfo['amount'] !== 0 && this.$store.dispatch('delCommodityInfo', itemInfo);
      }
    },
    // 这边是一个比对函数,用来购物车替换列表,第一个参数是列表商品，第二个是购物车商品
    compareShopping (allCommodity, shoppingCart) {
      for (let item = 0; item < allCommodity.length; item++) {
        for (let commodity = 0; commodity < shoppingCart.length; commodity++) {
          if (allCommodity[item]['id'] === shoppingCart[commodity]['id']) {
            allCommodity.splice(item, 1, shoppingCart[commodity])
          }
        }
      }
    },
    // 滚动触到底部时候触发
    scrolltolower () {
      console.log('scrolltolower_滚动触底了')
      console.log('this.currentDrugType_', this.currentDrugType)
      this.getShoppingList(this.currentDrugType)
    },
    // 这边是从后台数据拿到商品列表，两次分开操作，解藕
    getShoppingList (drugType) {
      let params = {
        pageNumber: drugType === 0 ? this.prePageNumber : this.otcPageNumber,
        pageSize: this.pageSize,
        productType: this.productType,
      }
      console.log('drugType_____', drugType)
      this.$http.get('admin/product', { params }).then((res) => {
        for (let item = 0; item < res.data.pageList.length; item++) {
          res.data.pageList[item]['amount'] = 0
        }
        switch (drugType) {
          case 0:
            this.menuList['prescription'] = this.menuList['prescription'].concat(res.data.pageList)
            this.prePageNumber++
            break;
          case 1:
            this.menuList['otc'] = this.menuList['otc'].concat(res.data.pageList)
            this.otcPageNumber++
            break;
        }
      }).then(() => {
        // 初始页面的时候这边要和购物车做一个比对，如果命名相同的话，将amount替换为购物车的数量
        console.log('this.menuList_', this.menuList)
        const shoppingCart = this.$store.getters.shoppingInfo
        this.compareShopping(this.menuList['prescription'], shoppingCart)
        this.compareShopping(this.menuList['otc'], shoppingCart)
      })
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
        background: #f3f3f3;
        .itemMessage {
          display: flex;
          width: 100%;
          height: px2rpx(96);
          margin-bottom: px2rpx(5);
          background: #ffffff;
          padding: px2rpx(29) px2rpx(15);
          .itemImg {
            width: px2rpx(96);
            height: px2rpx(96);
            margin-right: px2rpx(14);
            img {
              background-size: cover;
              width: 100%;
              height: 100%;
              border: px2rpx(1) solid #f3f3f3;
            }
          }
          .itemInfo {
            display: flex;
            flex: 1;
            margin-right: px2rpx(20);
            flex-direction: column;
            .name {
              font-size: px2rpx(18);
              color: #282828;
              letter-spacing: 0;
            }
            .specification {
              font-size: px2rpx(15);
              color: #6c6c6c;
              letter-spacing: 0;
              margin-bottom: px2rpx(30);
            }
            .priceOperate {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .price {
                font-size: px2rpx(18);
                color: #f5b11c;
                letter-spacing: 0;
              }
              .operate {
                display: flex;
                align-items: center;
                .icon_style {
                  color: #4da08a;
                  font-size: px2rpx(29);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
