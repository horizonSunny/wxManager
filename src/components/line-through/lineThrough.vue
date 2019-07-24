<template>
  <view
    class="categoryItem"
    :style="{ height: styleInfo['height'] * 2 + 'rpx' }"
  >
    <text
      class="categoryTitle"
      :style="{
        height: styleInfo['height'] * 2 + 'rpx',
        color: styleInfo['fontColor'],
        fontSize: styleInfo['fontSize'] * 2 + 'rpx',
        fontWeight: styleInfo['fontWeight']
      }"
      >{{ textInfo }}</text
    >
    <view
      class="lineMiddle"
      :style="{
        height: styleInfo['height'] * 2 + 'rpx',
        color: styleInfo['lineColor'],
        left: styleInfo['lineLeft']
      }"
    >
    </view>
  </view>
</template>
<script>
export default {
  name: 'lineThrough',
  props: ['styleInfo', 'textInfo'],
  data () {
    return {
    }
  },
  mounted () {
    console.log('textInfo', this.textInfo)
    console.log('styleInfo', this.styleInfo)
  }
}
</script>
<style lang="scss">
.categoryItem {
  display: flex;
  height: px2rpx(19);
  .categoryTitle {
    width: auto;
    height: px2rpx(19);
    color: rgba(56, 56, 56, 1);
    font-size: px2rpx(13);
    line-height: 150%;
    text-align: left;
    font-weight: bold;
  }
  .lineMiddle {
    flex: 1;
    position: relative;
    height: 1px;
    height: px2rpx(19);
    border-bottom: 1px solid;
    top: -50%;
    margin-top: -1px;
    left: 2px;
  }
}
</style>

