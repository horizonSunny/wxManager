<template>
  <view class="form">
    <view class="uni-padding-wrap uni-common-mt">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-column comment">
          <view class="commentTitle">"满意"</view>
          <view class="commentSelect">
            <img src="../../static/orderManager/图片 540.svg" alt="" />
            <view style="width:60rpx"></view>
            <img src="../../static/orderManager/图片 541.svg" alt="" />
          </view>
          <view class="commentArea">
            <textarea
              placeholder="请输入评价内容 (可不填)"
              :maxlength="maxlength"
              @input="textInput"
              @confirm="textConfirm"
              rows="3"
              cols="20"
            >
            </textarea>
            <view class="areaLimit">{{ inputLength }}/{{ maxlength }} </view>
          </view>
        </view>
        <view class="nextContent">
          <view class="uni-btn-v submitButton">
            <button formType="submit">提交</button>
          </view>
        </view>
      </form>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      pickerHidden: true,
      chosen: '',
      maxlength: 200,
      inputLength: 0
    }
  },
  methods: {
    formSubmit () { },
    formReset () { },
    textInput (e) {
      console.log('event.detail_', e.detail.value);
      console.log('event.detail_length', e.detail.cursor);
      this.inputLength = e.detail.cursor
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  .comment {
    width: px2rpx(375);
    height: px2rpx(285);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    font-size: px2rpx(14);
    text-align: center;
    padding: px2rpx(19) px2rpx(15);
    .commentTitle {
      margin-top: px2rpx(7);
      font-size: px2rpx(18);
    }
    .commentSelect {
      margin-top: px2rpx(18);
      display: flex;
      justify-content: center;
      img {
        width: px2rpx(40);
        height: px2rpx(40);
        // margin-right: px2rpx(30);
      }
    }
    .commentArea {
      margin-top: px2rpx(29);
      width: px2rpx(345);
      height: px2rpx(125);
      font-size: px2rpx(14);
      // position: relative;
      textarea {
        width: px2rpx(345);
        height: px2rpx(105);
        color: rgba(80, 80, 80, 1);
        background-color: rgba(248, 248, 248, 1);
        border-radius: 4px 4px 0px 0px;
        font-size: px2rpx(14);
        text-align: left;
      }
      .areaLimit {
        background-color: rgba(248, 248, 248, 1);
        text-align: right;
        border-radius: 0px 0px 4px 4px;
        // position: absolute;
        // bottom: px2rpx(0);
        // right: px2rpx(2);
      }
    }
  }
  .nextContent {
    flex: 1;
    height: 100%;
    background: #f8f8f8;
    .submitButton {
      position: fixed;
      display: flex;
      bottom: px2rpx(0);
      width: px2rpx(375);
      height: px2rpx(60);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      font-size: px2rpx(14);
      text-align: center;
      align-items: center;
      button {
        width: px2rpx(345);
        height: px2rpx(40);
        background: #90c0ef;
      }
    }
  }
}
</style>
