<template>
  <view class="wrap">
    <topBar page-title="设置"></topBar>
    <view class="content">
      <button @click="logOut">退出登陆</button>
    </view>
  </view>
</template>
<script>
import topBar from '../../../components/topNavigation/index'
export default {
  components: {
    topBar
  },
  methods: {
    logOut () {
      uni.showModal({
        title: '',
        content: '确定退出登陆',
        cancelText: '否',
        confirmText: '是',
        success: function (res) {
          if (res.confirm) {
            uni.removeStorageSync('access_token');
            uni.reLaunch({
              url: '/pages/login/index'
            })
            console.log('用户确定退出登陆');
          } else if (res.cancel) {
            console.log('用户确定不退出登陆');
          }
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .content {
    border-top: px2rpx(1) solid #f3f3f3;
    flex: 1;
    display: flex;
    align-items: center;
    button {
      width: px2rpx(200);
    }
  }
}
</style>