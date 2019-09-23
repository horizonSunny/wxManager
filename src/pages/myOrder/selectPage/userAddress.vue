<template>
  <view class="wrap">
    <topBar page-title="添加收货地址"></topBar>
    <form class="form">
      <view class="labelInfo">
        <span>收货人</span>
        <input
          name="fullName"
          type="text"
          placeholder="请填写真实姓名"
          v-model="userInfo['fullName']"
        />
      </view>
      <view class="labelInfo">
        <span>手机号码</span>
        <input
          name="phone"
          type="text"
          placeholder="请填写手机号码"
          v-model="userInfo['phone']"
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
          name="detailAddress"
          placeholder="如道路、门牌号、小区"
          rows="3"
          cols="4"
          :value="userInfo['detailAddress']"
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
      <button
        type="primary"
        :class="deleteActive ? 'deleteActive' : 'delete'"
        @click="deleteAddress"
      >
        删除收货信息
      </button>
    </view>
    <w-picker
      mode="region"
      :defaultVal="pickerDefault"
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
        fullName: '',
        phone: '',
        userAddress: '',
        detailAddress: '',
        province: '',
        city: '',
        area: '',
        defaultInfo: false,
      },
      pickerDefault: ['浙江省', '杭州市', '滨江区'],
      //是新增还是更新
      operate: 'add',
      deleteActive: false
    }
  },
  computed: {},
  methods: {
    submit () {
      console.log('detailAddress_', this.userInfo.detailAddress);
      let formRules = [
        { name: 'fullName', type: 'required', errmsg: '请填写用户名' },
        { name: 'phone', required: true, type: 'phone', errmsg: '请输入正确的手机号' },
        { name: 'userAddress', type: 'required', errmsg: '请选择地址' },
        { name: 'detailAddress', type: 'required', errmsg: '请填写详细地址信息' }

      ]
      let valLoginRes = validate.validate(this.userInfo, formRules)
      if (!valLoginRes.isOk) {
        uni.showToast({
          icon: 'none',
          title: valLoginRes.errmsg
        })
        return false
      }
      const info = {
        operate: this.operate,
        addressInfo: this.userInfo
      }
      info['addressInfo']['isDefault'] = info['addressInfo']['defaultInfo'] ? 1 : 0
      if (info['addressInfo']['addressId']) {
        info['addressInfo']['addressId'] = parseInt(info['addressInfo']['addressId'])
      }
      console.log('addressInfo____', info);
      this.$store.dispatch('setCustAdd', info).then((res) => { })
    },
    // 删除收获地址
    deleteAddress () {
      if (!this.deleteActive) {
        return
      }
      let url = 'patient/address/' + this.userInfo.addressId
      this.$http.delete(url).then((res) => {
        this.$store.dispatch('getCustAdd').then((res) => {
          // 如果删除的是选中地址，store要清空
          if (this.$store.getters.getCustSelectedAddress) {
            const hasSelected = this.$store.getters.getCustSelectedAddress
            if (parseInt(this.userInfo.addressId) === parseInt(hasSelected.addressId)) {
              console.log('this.userInfo.addressId === hasSelected.addressId')
              this.$store.commit('DELETE_SELECTCUST')
            }
          }
          uni.navigateBack()
        })
      })
    },
    selectArea () {
      this.$refs['region'].show();
    },
    inputAreaDetail (event) {
      setTimeout(() => { this.userInfo.detailAddress = event.detail.value }, 0)
    },
    onConfirmArea (val) {
      this.userInfo.userAddress = val.result
      this.userInfo.province = val.checkArr[0]
      this.userInfo.city = val.checkArr[1]
      this.userInfo.area = val.checkArr[2]
      console.log('val_', val);
    },
    changeDefaultInfo (event) {
      console.log('event.detail.value_', event.detail.value);
      this.userInfo.defaultInfo = event.detail.value
    }
  },
  onLoad: function (option) {
    console.log('option_', option)
    if (JSON.stringify(option) !== '{}') {
      this.operate = 'reset'
      //赋值
      this.userInfo['fullName'] = option['fullName']
      this.userInfo['phone'] = option['phone']
      this.userInfo['userAddress'] = option['province'] + option['city'] + option['area']
      this.userInfo['detailAddress'] = option['detailAddress']
      this.userInfo['defaultInfo'] = option['isDefault'] == 0 ? false : true
      this.userInfo['province'] = option['province']
      this.userInfo['city'] = option['city']
      this.userInfo['area'] = option['area']

      this.pickerDefault = [option['province'], option['city'], option['area']]
      this.$set(this.userInfo, 'addressId', option['addressId'])
      this.deleteActive = true
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
        text-overflow: ellipsis;
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
    .deleteActive {
      margin-top: px2rpx(13);
      background: #e90a0a;
    }
  }
}
</style>