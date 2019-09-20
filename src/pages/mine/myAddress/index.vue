<template>
  <view class="wrap">
    <topBar page-title="我的收货地址"></topBar>
    <view class="content">
      <scroll-view scroll-y class="scrollView">
        <view
          class="addressItem"
          v-for="(item, index) in custAddress"
          :key="index"
        >
          <view class="userInfo">
            <view class="userInfoItem">
              <span>{{ item["fullName"] }}</span>
              <span>{{ item["phone"] }}</span>
            </view>
            <view class="userInfoItem" @click="gotoDetail('edit', item)">
              <uni-icon
                type=""
                class="iconfont icon-edit icon_style"
              ></uni-icon>
            </view>
          </view>
          <view class="userAddress"
            >{{ item["province"] }}{{ item["city"] }}{{ item["area"]
            }}{{ item["detailAddress"] }}</view
          >
        </view>
      </scroll-view>
    </view>
    <view class="footer">
      <button @click="gotoDetail('add')">新增收货地址</button>
    </view>
  </view>
</template>
<script>
import topBar from '../../../components/topNavigation/index'
export default {
  data () {
    return {
      custAddress: this.$store.getters.getCustAddress
    }
  },
  components: {
    topBar
  },
  methods: {
    gotoDetail (operate, addressInfo = null) {
      console.log('addressInfo_', addressInfo);
      if (!addressInfo) {
        this.$navTo.togo('/pages/myOrder/selectPage/userAddress')
      } else {
        this.$navTo.togo('/pages/myOrder/selectPage/userAddress', addressInfo)
      }
    },
    onLoad () {
      console.log('getCustAddress_', this.$store.getters.getCustAddress);
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .content {
    flex: 1;
    margin-top: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    .scrollView {
      width: 100%;
      height: 100%;
      background: #f3f3f3;
      .addressItem {
        margin: px2rpx(10) px2rpx(10) px2rpx(0);
        border-radius: px2rpx(6);
        height: px2rpx(90);
        width: px2rpx(325);
        padding: px2rpx(0) px2rpx(15);
        background: #fff;
        font-size: px2rpx(16);
        .userInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: px2rpx(1) solid #f3f3f3;
          .userInfoItem {
            height: px2rpx(44);
            line-height: px2rpx(44);
            span {
              margin-right: px2rpx(12);
            }
          }
        }
        .userAddress {
          height: px2rpx(44);
          line-height: px2rpx(44);
        }
      }
      .icon_style {
        font-size: px2rpx(25);
        color: #4da08a;
      }
    }
  }
  .footer {
    height: px2rpx(51);
    padding: px2rpx(12) px2rpx(10);
    button {
      background: #4da08a;
      border-radius: 5px;
      color: #fff;
      height: px2rpx(51);
      font-size: px2rpx(18);
    }
  }
}
</style>