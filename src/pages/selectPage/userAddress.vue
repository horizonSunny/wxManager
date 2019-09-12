<template>
  <view class="wrap">
    <topBar page-title="添加收货地址"></topBar>
    <form class="form">
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
        <span class="textarea_span">详细地址</span>
        <textarea
          type="text"
          placeholder="如道路、门牌号、小区"
          rows="3"
          cols="4"
        />
      </view>
      <view class="labelInfo default">
        <span>设置为默认地址</span>
        <view class="uni-list-cell uni-list-cell-pd">
          <switch :checked="indicatorDots" @change="changeIndicatorDots" />
        </view>
      </view>
    </form>
    <view class="confirm">
      <button type="primary" class="save">保存收货信息</button>
      <button type="primary" class="delete">删除收货信息</button>
    </view>
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
    border: px2rpx(1) solid #f3f3f3;
    border-style: solid none;
    background: #fff;
    padding: px2rpx(0) px2rpx(10);
    .labelInfo {
      width: auto;
      height: px2rpx(57);
      line-height: px2rpx(57);
      border-bottom: px2rpx(1) solid #f3f3f3;
      display: flex;
      span {
        width: px2rpx(105);
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
      display: flex;
      .textarea_span {
        width: px2rpx(105);
        font-size: 18px;
        color: #282828;
        letter-spacing: 0;
        // display: inline-block;
        // vertical-align: middle;
      }
      textarea {
        flex: 1;
        resize: none;
        line-height: px2rpx(25);
        overflow: scroll;
        height: px2rpx(109);
        padding-top: px2rpx(18);

        // vertical-align: middle;
      }
    }
    .default {
      display: flex;
      border-bottom: px2rpx(0);
      justify-content: space-between;
      span {
        width: px2rpx(150);
      }
    }
  }
  .confirm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    button {
      height: px2rpx(47);
      width: px2rpx(355);
    }
    .save {
      background: #4da08a;
    }
    .delete {
      margin-top: px2rpx(13);
      background: #c0c0c0;
    }
  }
}
</style>