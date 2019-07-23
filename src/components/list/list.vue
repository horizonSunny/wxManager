<template>
  <view style="position:relative">
    <view :class="noBorder ? 'sunny-list' : ''">
      <slot></slot>
    </view>
  </view>
</template>
<script>
export default {
  name: 'sunnyList',
  props: ['noBorder'],
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
@mixin border-style {
  position: absolute;
  z-index: 10;
  right: 0;
  left: 0;
  height: px2upx(1);
  content: "";
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.sunny-list {
  // background: ;
  height: 100%;
  width: 100%;
}
.sunny-list::before {
  @include border-style;
  top: px2upx(0);
  background-color: green;
}
.sunny-list::after {
  @include border-style;
  bottom: px2upx(0);
  background-color: red;
}
</style>

