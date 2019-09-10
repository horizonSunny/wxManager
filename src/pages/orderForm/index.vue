<template>
  <view class="wrap">
    <topBar page-title="确认订单"></topBar>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
import topBar from '../../components/topNavigation/index'
export default {
  components: {
    topBar
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
}
</style>