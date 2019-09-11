<template>
  <view class="wrap">
    <topBar page-title="添加收货地址"></topBar>
  </view>
</template>
<script>
import topBar from '../../components/topNavigation/index'
import wPicker from "../../components/w-picker/components/w-picker/w-picker.vue";
export default {
  components: {
    topBar,
    wPicker
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
}
</style>