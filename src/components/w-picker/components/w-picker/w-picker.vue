<template>
  <view class="w-picker">
    <view
      class="mask"
      :class="{ show: showPicker }"
      @tap="maskTap"
      @touchmove.stop.prevent
      catchtouchmove="true"
    ></view>
    <view class="w-picker-cnt" :class="{ show: showPicker }">
      <view class="w-picker-hd" @touchmove.stop.prevent catchtouchmove="true">
        <view class="w-picker-btn" @tap="pickerCancel">取消</view>
        <view
          class="w-picker-btn"
          :style="{ color: themeColor }"
          @tap="pickerConfirm"
          >确定</view
        >
      </view>
      <view class="w-picker-view" v-if="mode == 'region'">
        <picker-view
          :indicator-style="itemHeight"
          :value="pickVal"
          @change="bindChange"
        >
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.provinces"
              :key="index"
              >{{ item.label }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.citys"
              :key="index"
              >{{ item.label }}</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              class="w-picker-item"
              v-for="(item, index) in data.areas"
              :key="index"
              >{{ item.label }}</view
            >
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
import provinces from './city-data/province.js';
import citys from './city-data/city.js';
import areas from './city-data/area.js';
import initPicker from "./w-picker.js";
function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  throw new Error('mode无效，请选择有效的mode!');
  return false;
}
export default {
  data () {
    return {
      result: [],
      data: {},
      checkArr: [],
      checkValue: [],
      pickVal: [],
      showPicker: false,
      resultStr: "",
      itemHeight: `height: ${uni.upx2px(88)}px;`
    };
  },
  computed: {

  },
  props: {
    mode: {
      type: String,
      validator (mode) {
        let modeList = ['region'];//过滤无效mode;
        return oneOf(mode, modeList);
      }
    },
    themeColor: {
      type: String,
      default () {
        return "#f5a200"
      }
    },
    defaultVal: {
      type: Array,
      default () {
        return [0, 0, 0, 0, 0, 0, 0]
      }
    },
    step: {
      type: [String, Number],
      default: 1
    },
    current: {
      type: Boolean,
      default: false
    },
    selectList: {
      type: Array,
      default () {
        return [];
      }
    },
    //以下参数仅对mode==limit有效
  },
  watch: {
    mode () {
      this.initData();
    },
    selectList () {
      this.initData();
    }
  },
  methods: {
    getRegionVal (value) {
      let province = value[0];
      let city = value[1];
      let area = value[2];
      let a = 0, b = 0, c = 0;
      provinces.map((v, k) => {
        if (v.label == province) {
          console.log('province_', province);
          a = k;
        }
      })
      citys[a].map((v, k) => {
        console.log('city_', city);
        if (v.label == city) {
          b = k;
        }
      })
      areas[a][b].map((v, k) => {
        if (v.label == area) {
          c = k;
        }
      })
      let dval = [a, b, c];
      return dval;
    },
    formatNum (num) {
      return num < 10 ? '0' + num : num + '';
    },
    maskTap () {
      this.showPicker = false;
    },
    show () {
      this.showPicker = true;
    },
    hide () {
      this.showPicker = false;
    },
    pickerCancel () {
      this.$emit("cancel", {
        checkArr: this.checkArr,
        defaultVal: this.pickVal
      });
      this.showPicker = false;
    },
    pickerConfirm (e) {
      switch (this.mode) {
        case "region":
          this.$emit("confirm", {
            checkArr: this.checkArr,
            checkValue: this.checkValue,
            defaultVal: this.pickVal,
            result: this.resultStr
          });
          break;
        default:
          this.$emit("confirm", {
            checkArr: this.checkArr,
            defaultVal: this.pickVal,
            result: this.resultStr
          });
          break;
      }
      this.showPicker = false;
    },
    bindChange (val) {
      let _this = this;
      let arr = val.detail.value;
      let province, city, area;
      let checkArr = _this.checkArr;
      let mode = _this.mode;
      let col1, col2, col3, d, a, h, m;
      console.log('进入')
      province = _this.data.provinces[arr[0]].label;
      city = _this.data.citys[arr[1]].label;
      area = _this.data.areas[arr[2]].label;
      if (province != checkArr[0]) {
        _this.data.citys = citys[arr[0]];
        _this.data.areas = areas[arr[0]][0];
        arr[1] = 0;
        arr[2] = 0;
        city = _this.data.citys[arr[1]].label;
        area = _this.data.areas[arr[2]].label;
        console.log('省')
      };
      if (city != checkArr[1]) {
        _this.data.areas = areas[arr[0]][arr[1]];
        arr[2] = 0;
        area = _this.data.areas[arr[2]].label;
        console.log('市')
      };
      _this.checkArr = [province, city, area];
      _this.checkValue = [_this.data.provinces[arr[0]].value, _this.data.citys[arr[1]].value, _this.data.areas[arr[2]].value];
      _this.resultStr = province + city + area;
      _this.$nextTick(() => {
        console.log('结束');
        _this.pickVal = arr;
      })
    },
    initData () {
      let _this = this;
      let data = {};
      let mode = _this.mode;
      let province, city, area;
      let col1, col2, col3;
      let dVal = [];
      switch (mode) {
        case "region":
          dVal = _this.getRegionVal(_this.defaultVal);
          data = {
            provinces: provinces,
            citys: citys[dVal[0]],
            areas: areas[dVal[0]][dVal[1]]
          };
          break;
      }
      _this.data = data;
      switch (mode) {
        case "region":
          province = data.provinces[dVal[0]];
          city = data.citys[dVal[1]];
          area = data.areas[dVal[2]];
          _this.checkArr = [province.label, city.label, area.label];
          _this.checkValue = [province.value, city.value, area.value];
          _this.resultStr = province.label + city.label + area.label;
          break;
      }
      _this.$nextTick(() => {
        _this.pickVal = dVal;
      })
    }
  },
  mounted () {
    this.initData();
  }
}
</script>

<style lang="scss">
.w-picker {
  position: relative;
  z-index: 888;
  .mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
  }
  .mask.show {
    visibility: visible;
    opacity: 1;
  }
  .w-picker-cnt {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s ease;
    transform: translateY(100%);
    z-index: 3000;
  }
  .w-picker-cnt.show {
    transform: translateY(0);
  }
  .w-picker-hd {
    display: flex;
    align-items: center;
    padding: 0 30upx;
    height: 88upx;
    background-color: #fff;
    position: relative;
    text-align: center;
    font-size: 32upx;
    justify-content: space-between;
    .w-picker-btn {
      font-size: 30upx;
    }
  }

  .w-picker-hd:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  .w-picker-item {
    text-align: center;
    width: 100%;
    height: 88upx;
    line-height: 88upx;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 30upx;
  }
  .w-picker-view {
    width: 100%;
    height: 476upx;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 1);
    z-index: 666;
  }
  picker-view {
    height: 100%;
  }
}
</style>
