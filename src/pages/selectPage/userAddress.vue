<template>
  <view class="wrap">
    <topBar page-title="添加收货地址"></topBar>
    <form @submit="submit" class="form">
      <view class="labelInfo">
        <span>收货人</span>
        <input type="text" placeholder="请填写真实姓名" />
      </view>
      <view class="labelInfo">
        <span>手机号码</span>
        <input type="text" placeholder="请填写手机号码" />
      </view>
      <view class="labelInfo">
        <span>所在地区</span>
        <input
          type="text"
          placeholder="点击选择地区"
          placeholder-class="placeholder-class"
        />
      </view>
      <view class="labelInfo textarea">
        <span>详细地址</span>
        <textarea
          type="text"
          placeholder="如道路、门牌号、小区、楼栋号、单元室等"
          placeholder-style="height:50px;line-height:50px"
        />
      </view>
    </form>
  </view>
</template>
<script>
import topBar from '../../components/topNavigation/index'
import wPicker from "../../components/w-picker/components/w-picker/w-picker.vue";
// import validate from '../../utils/validate'
export default {
  components: {
    topBar,
    wPicker
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    submit () {
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
  background: #f3f3f3;
  .form {
    height: px2rpx(380);
    width: 100%;
    border: px2rpx(1) solid #f3f3f3;
    border-style: solid none;
    background: #fff;
    padding: px2rpx(0) px2rpx(10);
    .labelInfo {
      width: 100%;
      height: px2rpx(57);
      line-height: px2rpx(57);
      border-bottom: px2rpx(1) solid #f3f3f3;
      display: flex;
      span {
        width: px2rpx(102);
        font-size: 18px;
        color: #282828;
        letter-spacing: 0;
      }
      input {
        height: px2rpx(57);
        line-height: px2rpx(57);
      }
      .placeholder-class {
        font-size: 18px;
        color: #dbdbdb;
      }
    }
    .textarea {
      height: px2rpx(127);
      textarea {
        height: px2rpx(127);
      }
    }
  }
}
</style>