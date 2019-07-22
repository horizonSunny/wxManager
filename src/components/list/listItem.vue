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
      textInfo: "123"
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
  margin-left: 10%;
  border-bottom: 1px solid #f2f2f2;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  .leftShow {
    display: flex;
    flex-direction: row-reverse;
    // background-color: red;
    // float: left;
  }
  .rightOption {
    display: flex;
    // background-color: green;
    // float: right;
  }
}
</style>
