<template>
  <view class="wrap">
    <topBar page-title="我的优惠券"></topBar>
    <view class="content"> </view>
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
  height: 100%;
  width: 100%;
  .content {
    flex: 1;
    margin-top: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
  }
}
</style>