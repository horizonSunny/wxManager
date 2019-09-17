<template>
  <view class="wrap">
    <topBar page-title="添加收货地址"></topBar>
    <form class="form">
      <view class="labelInfo">
        <span>收货人</span>
        <input
          name="userName"
          type="text"
          placeholder="请填写真实姓名"
          v-model="userInfo['userName']"
        />
      </view>
      <view class="labelInfo">
        <span>手机号码</span>
        <input
          name="userPhone"
          type="text"
          placeholder="请填写手机号码"
          v-model="userInfo['userPhone']"
        />
      </view>
      <view class="labelInfo">
        <span>所在地区</span>
        <input
          type="text"
          name="userAddress"
          placeholder="点击选择地区"
          placeholder-class="placeholder-class"
          disabled
          :value="userInfo['userAddress']"
          @click="selectArea"
        />
      </view>
      <view class="labelInfo textarea">
        <span class="textarea_span">详细地址</span>
        <textarea
          type="text"
          name="addressDetail"
          placeholder="如道路、门牌号、小区"
          rows="3"
          cols="4"
          :value="userInfo['addressDetail']"
          @input="inputAreaDetail"
        />
      </view>
      <view class="labelInfo default">
        <span>设置为默认地址</span>
        <view class="uni-list-cell uni-list-cell-pd">
          <switch
            :checked="userInfo['defaultInfo']"
            @change="changeDefaultInfo"
          />
        </view>
      </view>
    </form>
    <view class="confirm">
      <button type="primary" class="save" @click="submit">保存收货信息</button>
      <button type="primary" class="delete" @click="submit">
        删除收货信息
      </button>
    </view>
    <w-picker
      mode="region"
      :defaultVal="['浙江省', '杭州市', '滨江区']"
      @confirm="onConfirmArea"
      ref="region"
      themeColor="#f00"
    >
    </w-picker>
  </view>
</template>
<script>
import wPicker from "../../../components/w-picker/components/w-picker/w-picker.vue";
import topBar from '../../../components/topNavigation/index';
import validate from '../../../utils/validate'
export default {
  components: {
    topBar,
    wPicker
  },
  data () {
    return {
      userInfo: {
        userName: '',
        userPhone: '',
        userAddress: '',
        addressDetail: '',
        defaultInfo: false
      }
    }
  },
  computed: {},
  methods: {
    submit () {
      console.log('addressDetail_', this.userInfo.addressDetail);
      let formRules = [
        { name: 'userName', type: 'required', errmsg: '请填写用户名' },
        { name: 'userPhone', required: true, type: 'phone', errmsg: '请输入正确的手机号' },
        { name: 'userAddress', type: 'required', errmsg: '请选择地址' },
        { name: 'addressDetail', type: 'required', errmsg: '请填写详细地址信息' }

      ]
      let valLoginRes = validate.validate(this.userInfo, formRules)
      if (!valLoginRes.isOk) {
        uni.showToast({
          icon: 'none',
          title: valLoginRes.errmsg
        })
        return false
      }
    },
    delete () {

    },
    selectArea () {
      this.$refs['region'].show();
    },
    inputAreaDetail (event) {
      setTimeout(() => { this.userInfo.addressDetail = event.detail.value }, 0)
    },
    onConfirmArea (val) {
      this.userInfo.userAddress = val.result
      console.log('val_', val);
    },
    changeDefaultInfo (event) {
      console.log('event.detail.value_', event.detail.value);
      this.userInfo.defaultInfo = event.detail.value
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