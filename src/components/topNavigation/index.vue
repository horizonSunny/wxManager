<template>
  <view
    style="height:auto;width:100%;padding-bottom:10rpx;"
    :style="{
      background: backgroundColorInfo
    }"
  >
    <view
      :style="{
        height: allHeight + 'px',
        width: 100 + '%',
        fontSize: fontSize + 'px'
      }"
    ></view>
    <view class="titleMessage">
      <view @click="rollback" v-if="backShow" class="titleIcon">
        <uni-icon type="" class="iconfont icon-rollback icon_style"></uni-icon>
      </view>
      <span
        :style="{
          color: fontColor
        }"
        >{{ pageTitle }}</span
      >
    </view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
export default {
  props: ['pageTitle', 'backInfo', 'backgroundInfo', 'fontColor'],
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
    },
    backShow () {
      if (this.backInfo === false) {
        return false
      }
      else {
        return true
      }
    },
    backgroundColorInfo () {
      if (this.backgroundInfo === '') {
        return ''
      }
      else {
        return this.backgroundInfo
      }
    }
  },
  methods: {
    rollback () {
      let pages = getCurrentPages();  //获取所有页面栈实例列表
      const currentPage = pages[pages.length - 1]
      console.log('currentPage_', currentPage.route);
      if (currentPage.route === 'pages/myOrder/index') {
        uni.switchTab({
          url: '/pages/mine/index'
        })
      } else {
        uni.navigateBack()
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.titleMessage {
  text-align: center;
  position: relative;
  height: px2rpx(25);
  .titleIcon {
    position: absolute;
    height: px2rpx(25);
    width: px2rpx(50);
  }
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