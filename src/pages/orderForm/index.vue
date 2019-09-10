<template>
  <view class="wrap">
    <topBar page-title="确认订单"></topBar>
    <scroll-view scroll-y class="scrollView">
      <view class="wrapContent">
        <view class="address">
          <view class="personal">
            <uni-icon
              type=""
              class="iconfont icon-selected icon_style"
              :class="[true ? 'icon_sel' : 'icon_unsel']"
            ></uni-icon>
            <span>快递配送</span>
            <view class="addrresInfo">
              <view>张晓丽 13697804589</view>
              <view class="space_between">
                <view>上海市浦东新区长泰广场E座 10楼</view>
                <uni-icon type="" class="iconfont  icon-more"></uni-icon>
              </view>
            </view>
          </view>
          <view class="drugstore">
            <uni-icon
              type=""
              class="iconfont icon-unselected icon_style"
              :class="[true ? 'icon_unsel' : 'icon_sel']"
            ></uni-icon>
            <span>药店取药</span>
            <view class="addrresInfo">
              <view>上海众协药店有限公司浦东店</view>
              <view class="space_between">
                <view>上海市徐汇区东安路270号</view>
                <view>500m</view>
                <uni-icon type="" class="iconfont  icon-more"></uni-icon>
              </view>
            </view>
          </view>
        </view>
        <view class="shoppingInfo">
          <view
            class="itemMessage"
            v-for="(itemInList, indexInList) in item"
            :key="indexInList"
          >
            <view class="itemImg">
              <img src="../../static/menu/图片 285.png" alt="" />
            </view>
            <view class="itemInfo">
              <view class="name">
                {{ itemInList["name"] }}
              </view>
              <view class="specification">
                规格: {{ itemInList["specification"] }}
              </view>
              <view class="priceOperate">
                <view class="price">¥ {{ itemInList["price"] }}</view>
                <view class="operate">
                  购买数量：{{ itemInList["amount"] }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="coupon"></view>
        <view class="orderPrice">
          <view class="itemPrice"></view>
          <view class="itemPrice"></view>
          <view class="itemPrice"></view>
        </view>
      </view>
    </scroll-view>
    <view class="confirmOrder">
      <view class="payInfo">支付：<span>¥950</span></view>
      <view class="confirm">确认下单</view>
    </view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
import topBar from '../../components/topNavigation/index'
export default {
  components: {
    topBar
  },
  data () {
    return {
      active: true,
      item: [{
        "type": 0,
        "name": "GV-971甘露特纳胶囊",
        "price": 1000,
        "itemImg": "",
        "specification": "100mg*1",
        amount: 1
      }]
    }
  },
  onLoad () {
    const shoppingCart = this.$store.getters.shoppingInfo
    console.log('shoppingCart_', shoppingCart);
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  .scrollView {
    margin-top: px2rpx(2);
    display: flex;
    flex: 1;
    .wrapContent {
      width: 100%;
      height: 100%;
      .address {
        width: auto;
        background: #fff;
        height: px2rpx(219);
        padding: px2rpx(11) px2rpx(11);
        font-size: px2rpx(16);
        .personal {
          height: px2rpx(109);
          width: 100%;
          border-bottom: px2rpx(2) dashed #f3f3f3;
        }
        .drugstore {
          height: px2rpx(109);
          margin-top: px2rpx(11);
          width: 100%;
        }
        .space_between {
          display: flex;
          justify-content: space-between;
        }
        .addrresInfo {
          margin-left: px2rpx(27);
        }
        .addrresInfo {
          margin-top: px2rpx(10);
          height: px2rpx(48);
          line-height: px2rpx(24);
        }
      }
      .shoppingInfo {
        margin-top: px2rpx(5);
        height: px2rpx(136);
        background: #fff;
        width: auto;
        padding: px2rpx(17) px2rpx(11);
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
              margin-bottom: px2rpx(20);
            }
            .priceOperate {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              font-size: px2rpx(16);
              color: #6c6c6c;
            }
          }
        }
      }
      .coupon {
        padding: px2rpx(0) px2rpx(11);
        margin: px2rpx(5) px2rpx(0);
        background: #fff;
      }
      .orderPrice {
        width: 100%;
        background: #fff;
        height: px2rpx(110);
        .itemPrice {
          height: px2rpx(36);
          line-height: px2rpx(36);
          border-bottom: px2rpx(2) solid #f3f3f3;
          padding: px2rpx(0) px2rpx(10);
        }
      }
    }
  }
  .confirmOrder {
    width: 100%;
    height: px2rpx(52);
    line-height: px2rpx(52);
    background: #fff;
    font-size: px2rpx(18);
    display: flex;
    .payInfo {
      display: flex;
      flex: 1;
      margin-left: px2rpx(11);
      height: px2rpx(52);
      line-height: px2rpx(52);
      span {
        color: #f5b11c;
      }
    }
    .confirm {
      height: px2rpx(52);
      line-height: px2rpx(52);
      background: #4da08a;
      color: #fff;
      text-align: center;
      width: px2rpx(120);
    }
  }
}
.icon_style {
  font-size: px2rpx(20);
  margin-top: px2rpx(5);
  margin-right: px2rpx(8);
}
.icon_sel {
  color: #f5b11c;
}
.icon_unsel {
  color: #c3c3c3;
}
</style>