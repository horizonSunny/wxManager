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
  height: 1px;
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
  top: 0;
  background-color: green;
}
.sunny-list::after {
  @include border-style;
  bottom: 0;
  background-color: red;
}
</style>

