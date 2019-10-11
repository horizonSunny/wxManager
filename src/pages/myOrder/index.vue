<template>
  <view class="wrap">
    <topBar page-title="我的订单"></topBar>
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
          <scroll-view scroll-y class="scrollView" @scrolltolower="scroll">
            <view
              class="itemMessage"
              v-for="(itemInList, indexInList) in item"
              :key="indexInList"
            >
              <view class="orderInfoHeader">
                <view class="overFlow">{{
                  itemInList["drugName"] ? itemInList["drugName"] : ""
                }}</view>
                <view style="width:20%">{{
                  itemInList["status"] | orderStatus
                }}</view>
              </view>
              <view
                class="orderInfoContent"
                v-for="(itemPro, indexPro) in itemInList['orderShops']"
                :key="indexPro"
              >
                <view class="itemImg">
                  <img :src="itemPro['productImage']" alt="" />
                </view>
                <view class="itemInfo">
                  <view class="name">
                    {{ itemPro["productName"] }}
                  </view>
                  <view class="specification">
                    <view> ¥ {{ itemPro["unitPrice"] }} </view>
                    <view> X{{ itemPro["productNum"] }}</view>
                  </view>
                </view>
              </view>
              <view class="orderInfoFoot">
                <view class="orderInfoFootTime">{{
                  itemInList["createTime"] | timeFilter
                }}</view>
                <view
                  @click="cancelOrder(itemInList)"
                  v-if="itemInList['status'] == 2 || itemInList['status'] == 3"
                >
                  <button>取消订单</button></view
                >
                <view
                  v-if="itemInList['status'] == 2"
                  @click="openLocation(itemInList)"
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
        orderList: [],
        medicineList: [],
        distributionList: []
      },
      allPageNumber: 0,
      orderPageNumber: 0,
      medicinePageNumber: 0,
      distributionPageNumber: 0,
      pageSize: 10,
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
        this.currentIndex = 0
        break;
    }
    console.log('this.currentIndex_onLoad_', this.currentIndex)
    this.getListInfo().then(() => {
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
      const index = e.detail.current
      this.currentIndex = index
      // 获取对应属性名
      const menuList = Object.keys(this.menuList)
      const name = menuList[index]
      console.log('this.currentIndex_', this.currentIndex);
      // 假如跳过去不为空就跳，跳过去为空就不跳
      if (this.menuList[name].length === 0) {
        this.getListInfo()
      }
      const seletcName = this.meunOptions[index]
      this.currentMenu = seletcName
    },
    cancelOrder (item) {
      let _that = this
      uni.showModal({
        title: '',
        content: '确定取消订单',
        cancelText: '是',
        confirmText: '否',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击不取消订单');
          } else if (res.cancel) {
            let url = 'order/order/cancel/' + item.orderNo
            let currentList
            _that.$http.put(url).then((res) => {
              switch (_that.currentIndex) {
                case 0:
                  currentList = _that.menuList.allList
                  break;
                case 1:
                  currentList = _that.menuList.orderList
                  break;
                case 2:
                  currentList = _that.menuList.medicineList
                  break;
                case 3:
                  currentList = _that.menuList.distributionList
                  break;
              }
              if (_that.currentIndex === 0) {
                item.status = 4
              } else {
                const index = currentList.findIndex(itemList => {
                  return itemList['id'] === item['id']
                })
                currentList.splice(index, 1)
              }
            })
          }
        }
      });
      console.log('item_', item)
    },
    getListInfo () {
      let pageNumber
      switch (this.currentIndex) {
        case 0:
          pageNumber = this.allPageNumber
          break;
        case 1:
          pageNumber = this.orderPageNumber
          break;
        case 2:
          pageNumber = this.medicinePageNumber
          break;
        case 3:
          pageNumber = this.distributionPageNumber
          break;
        default:
          break;
      }
      const params = {
        pageNumber: pageNumber,
        pageSize: this.pageSize,
        // 假如为0，就传空值
        orderStatus: this.currentIndex === 0 ? '' : this.currentIndex
      }
      return this.$http.get('order/order/getPatientOrders', { params }).then((res) => {
        const listInfo = res.data.pageList
        console.log('listInfo_', listInfo)
        // for (let item = 0; item < listInfo.length; item++) {
        switch (params['orderStatus']) {
          case '':
            this.menuList['allList'] = this.menuList['allList'].concat(listInfo)
            break;
          case 1:
            this.menuList['orderList'] = this.menuList['orderList'].concat(listInfo)
            break;
          case 2:
            this.menuList['medicineList'] = this.menuList['medicineList'].concat(listInfo)
            break;
          case 3:
            this.menuList['distributionList'] = this.menuList['distributionList'].concat(listInfo)
            break;
        }
        // }
        console.log('this.menuList_', this.menuList)
      }).then(() => {
        switch (this.currentIndex) {
          case 0:
            this.allPageNumber += 1
            break;
          case 1:
            this.orderPageNumber += 1
            break;
          case 2:
            this.medicinePageNumber += 1
            break;
          case 3:
            this.distributionPageNumber += 1
            break;
          default:
            break;
        }
      })
    },
    scroll () {
      console.log('refresh');
      this.getListInfo()
    },
    // 打开地图
    openLocation (item) {
      console.log('openLocation_', item.lat, item.lng)
      const location = {
        lat: parseInt(item.lat),
        lng: parseInt(item.lng),
      }
      uni.openLocation({
        latitude: location.lat,
        longitude: location.lng,
        success: function () {
          console.log('success');
        }
      })
      // this.$navTo.togo('/pages/myOrder/mapShow', { lat: item.lat, lng: item.lng })
    }
  },
  filters: {
    timeFilter: function (value) {
      const time = value.slice(0, 10)
      return time
    },
    orderStatus: function (value) {
      switch (value) {
        case 1:
          return '已接单'
          break;
        case 2:
          return '待取药'
          break;
        case 3:
          return '待配送'
          break;
        case 4:
          return '已取消'
          break;
        default:
          break;
      }
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
          // height: px2rpx(192);
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
            justify-content: space-between;
            font-size: 15px;
            color: #6c6c6c;
            align-items: center;
            .orderInfoFootTime {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: px2rpx(150);
            }
            button {
              font-size: px2rpx(15);
              height: px2rpx(28);
              line-height: px2rpx(28);
              width: px2rpx(90);
              margin-left: px2rpx(10);
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
  .overFlow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
