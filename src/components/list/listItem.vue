<template>
  <view class="sunny-item-list">
    <view class="leftShow">
      <!-- <text>{{ textInfo }}</text> -->
      <slot name="leftShow"></slot>
    </view>
    <view class="rightOption">
      <slot name="rightOption"></slot>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // console.log('1231231231312312312')
  }
}
</script>
<style lang="scss" scoped>
.sunny-item-list {
  // background-color: yellow;
  display: flex;
  border-bottom: 1px solid #f2f2f2;
  justify-content: space-between;
  align-items: center;
  height: px2rpx(69);
  .leftShow {
    display: flex;
  }
  .rightOption {
    display: flex;
  }
}
</style>
