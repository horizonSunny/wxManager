<template>
  <view class="wrap">
    <view class="content">
      <img :src="'../static/main/huanzhelogo' + pixelRatio" />
      <view class="name">即医</view>
    </view>
    <view class="footer">
      <img :src="'../static/main/huanzhebeijing' + pixelRatio" />
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      pixelRatio: this.$pixelRatio
    }
  },
  onShow () {
    setTimeout(() => {
      this.$http.get('patient/patient').then((res) => {
        console.log('index_', res);
        if (res.code === 1) {
          uni.switchTab({
            url: '/pages/homepage/main'
          })
        }
      })
    }, 100);
  }
}
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #42a086;
  justify-content: space-between;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: px2rpx(110);
      height: px2rpx(110);
    }
    .name {
      font-size: px2rpx(23);
      color: #fff;
    }
  }
  .footer {
    height: px2rpx(170);
    img {
      height: px2rpx(170);
      width: 100%;
    }
  }
}
</style>