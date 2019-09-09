<template>
  <view style="height:auto;width:100%">
    <view
      :style="{
        height: allHeight + 'px',
        width: 100 + '%',
        background: 'red'
      }"
    ></view>
    <view>
      <uni-icon type="" class="iconfont icon-rollback"></uni-icon>
      你好啊!!!
    </view>
  </view>
</template>
<script>
import * as storage from '../../config/storage'
export default {
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
}
</script>
<style lang="scss" scoped>
</style>