<template>
  <view
    class="sunny-item-list"
    :style="{
      height: styleInfo.height
    }"
  >
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
  props: ['styleInfo'],
  data () {
    return {
    }
  },
  created () {
    // console.log('1231231231312312312')
  },
  mounted () {
    console.log('styleInfo_typeof_', typeof (this.styleInfo));
    console.log('styleInfo_', this.styleInfo);
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
  // height: px2rpx(69);
  .leftShow {
    display: flex;
  }
  .rightOption {
    display: flex;
  }
}
</style>
