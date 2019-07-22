<template>
  <view class="sunny-item-list">
    <view class="leftShow">
      <slot name="leftShow"></slot>
    </view>
    <view class="rightOption">
      <slot name="rightOption"></slot>
    </view>
  </view>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.sunny-item-list {
  // background-color: yellow;
  display: flex;
  margin-left: 10%;
  border-bottom: 1px solid blue;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  .leftShow {
    display: flex;
    flex-direction: row-reverse;
    background-color: red;
    // float: left;
  }
  .rightOption {
    display: flex;
    background-color: green;
    // float: right;
  }
}
</style>
