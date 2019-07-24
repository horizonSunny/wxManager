<template>
  <view class="categoryItem">
    <text class="categoryTitle">{{ item.classifyName }}</text>
    <view class="lineMiddle"> </view>
  </view>
</template>
<script>
export default {
  name: 'lineThrough',
  props: ['style', 'text'],
  data () {
    return {
    }
  },
  mounted () {
    console.log('noBorder_', typeof (this.noBorder))
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
    // font-weight: bold;
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

