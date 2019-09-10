<template>
  <view style="height:auto;width:100%;padding-bottom:10rpx;background:#fff">
    <view
      :style="{
        height: allHeight + 'px',
        width: 100 + '%'
      }"
    ></view>
    <view class="titleMessage">
      <view @click="rollback">
        <uni-icon type="" class="iconfont icon-rollback icon_style"></uni-icon>
      </view>
      <span>{{ pageTitle }}</span>
    </view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
export default {
  props: ['pageTitle'],
  data () {
    return {
      activeColor: "red",
      fontSize: 18
    }
  },
  computed: {
    allHeight () {
      let capsuleHeight
      capsuleHeight = storage.getSync('capsuleInfo')
      console.log('capsuleHeight_', capsuleHeight);
      return capsuleHeight
    }
  },
  methods: {
    rollback () {
      uni.navigateBack()
    }
  }
}
</script>
<style lang="scss" scoped>
.titleMessage {
  text-align: center;
  position: relative;
  .icon_style {
    position: absolute;
    left: px2rpx(16);
    width: px2rpx(16);
    top: 50%;
    margin-top: px2rpx(-8);
    line-height: px2rpx(16);
    font-size: px2rpx(16);
    margin-right: px2rpx(14);
  }
}
</style>