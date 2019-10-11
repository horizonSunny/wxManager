<template>
  <view class="wrap">
    <topBar page-title="药店地址"></topBar>
    <!-- 头部导航 -->
    <view class="map">
      <view class="page-body">
        <view class="page-section page-section-gap">
          <map
            style="width: 100%; height: 500px;"
            :latitude="latitude"
            :longitude="longitude"
            :markers="covers"
          >
          </map>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
import topBar from '../../components/topNavigation/index'
export default {
  data () {
    return {
      pixelRatio: this.$pixelRatio,
      latitude: '',
      longitude: '',
      covers: [{
        latitude: 39.909,
        longitude: 116.39742,
        iconPath: '../../static/main/dingwei@3x.png'
      }]
    }
  },
  components: {
    topBar
  },
  onLoad (option) {
    console.log('option_', option)
    this.latitude = option.lat
    this.longitude = option.lng
    this.covers[0].latitude = option.lat
    this.covers[0].longitude = option.lng
  }
}
</script>
<style lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .map {
    flex: 1;
  }
}
</style>
