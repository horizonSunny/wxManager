<template>
  <view class="wrap">
    <topBar page-title="关于我们"></topBar>
    <view class="content">
      <view class="label"></view>
      <view class="name">即医</view>
      <view class="version">版本号：V1.0</view>
    </view>
  </view>
</template>
<script>
import topBar from '../../../components/topNavigation/index'
export default {
  components: {
    topBar,
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .content {
    flex: 1;
    margin-top: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .label {
      height: px2rpx(62);
      width: px2rpx(62);
      border: 1px solid #4da08a;
      background: #f0fffb;
      border-radius: px2rpx(8);
    }
    .name {
      margin-top: px2rpx(6);
      font-size: px2rpx(19);
      color: #4c4c4c;
    }
    .version {
      margin-top: px2rpx(20);
      font-size: px2rpx(18);
      color: #000000;
    }
  }
}
</style>