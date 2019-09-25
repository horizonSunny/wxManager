<template>
  <view class="wrap">
    <topBar page-title="选取药店"></topBar>
    <view class="location_select" @click="operate">
      <img :src="'../../../static/main/dingwei' + pixelRatio" alt="" />
      <span>{{ provinceName }}{{ cityName }}</span>
      <view v-if="!selectArea">
        <uni-icon
          type=""
          class="iconfont icon-subtriangle icon_style"
        ></uni-icon>
      </view>
      <view v-else>
        <uni-icon
          type=""
          class="iconfont icon-righttriangle icon_styleTwo"
        ></uni-icon>
      </view>
    </view>
    <view class="location_list">
      <scroll-view scroll-y="true" class="scrollView" @scrolltolower="scroll">
        <!-- <view class="scrollViewIn"> -->
        <view
          class="itemMessage"
          v-for="(item, index) in drugLocationList"
          :key="index"
          @click="selectedDrug(item)"
        >
          <view class="orderInfoHeader">
            <view>{{ item["name"] }}</view>
            <view>
              <uni-icon
                type=""
                class="iconfont icon-couponSelected icon_style"
                :class="false ? 'activeLabel' : 'deactiveLabel'"
              ></uni-icon
            ></view>
          </view>
          <view class="orderInfoContent">
            <view class="itemImg">
              <img src="../../../static/main/bannerBack@3x.png" alt="" />
            </view>
            <view class="itemInfo">
              <view class="name">
                <view
                  >营业时间：{{ item.serviceStartTime }}-{{
                    item.serviceEndTime
                  }}</view
                >
                <view>电话：{{ item.phoneList }}</view>
              </view>
              <view class="specification">
                <view> {{ item.address }}</view>
                <view> {{ item.distance }} </view>
              </view>
            </view>
          </view>
        </view>
        <!-- </view> -->
      </scroll-view>
    </view>
    <view
      v-show="selectArea"
      :style="{
        top: areaHeight + 'px',
        position: 'fixed',
        width: '100%'
      }"
      class="areaShow"
    >
      <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        main-active-class="mainactiveclass"
        content-active-class="contentactiveclass"
        @clickNav="onClickNav"
        @clickItem="onClickItem"
      />
    </view>
  </view>
</template>
<script>
// van-tree-select只能用在app和小程序中
import topBar from '../../../components/topNavigation/index'
import * as storage from '../../../config/storage'
const municipality = ['上海市', '重庆市', '北京市', '天津市']
export default {
  components: {
    topBar,
  },
  data () {
    return {
      pixelRatio: this.$pixelRatio,
      // 全国地址，放省市区的
      items: [],
      mainActiveIndex: 0,
      activeId: null,
      selectArea: false,
      query: {
        pageNumber: 0,
        pageSize: 10
      },
      // location
      locationText: '',
      queryLaction: {
        lat: '',
        lng: '',
      },
      provinceId: '',
      cityId: '',
      provinceName: '',
      cityName: '',
      drugLocationList: []
    }
  },
  methods: {
    // 点击首选项
    onClickNav ({ detail = {} }) {
      this.mainActiveIndex = detail.index || 0
      this.provinceId = this.items[this.mainActiveIndex]['id']
      this.provinceName = this.items[this.mainActiveIndex]['text']
      console.log('dthis.provinceId_', this.provinceId)
    },
    // 点击城市选项
    onClickItem ({ detail = {} }) {
      const activeId = this.activeId === detail.id ? null : detail.id;
      this.cityName = detail.text
      this.activeId = activeId;
      this.cityId = activeId
      this.isGetDrugList()
    },
    // 获取位置权限
    getAuthorizeInfo (a = "scope.userLocation") {  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
      var _this = this;
      uni.authorize({
        scope: a,
        success () { //1.1 允许授权
          _this.getLocationInfo();
        },
        fail () {    //1.2 拒绝授权
          console.log("你拒绝了授权，无法获得周边信息")
        }
      })
    },
    getLocationInfo () {  //2. 获取地理位置
      var _this = this;
      uni.getLocation({
        type: 'wgs84',
        success (res) {
          let latitude, longitude;
          latitude = res.latitude.toString();
          longitude = res.longitude.toString();
          _this.queryLaction.lat = latitude
          _this.queryLaction.lng = longitude
          uni.request({
            header: {
              "Content-Type": "application/text"
            },
            url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
            success (re) {
              console.log(re)
              _this.provinceName = re.data.result.address_component.province
              _this.cityName = municipality.indexOf(_this.provinceName) > -1 ?
                re.data.result.address_component.district :
                re.data.result.address_component.city
              const locationProvinceAdd = _this.items.find((item) => {
                return item.text === _this.provinceName
              })
              _this.provinceId = locationProvinceAdd.id
              const locationCityAdd = locationProvinceAdd.children.find((item) => {
                return item.text === _this.cityName
              })
              _this.cityId = locationCityAdd.id
              console.log('_this.provinceId_', _this.provinceId, '_this.cityId_', _this.cityId)
              _this.isGetDrugList()
            }
          });
        }
      });
    },
    // 获取位置信息
    isGetLocation (a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
      var _this = this;
      uni.getSetting({
        success (res) {
          if (!res.authSetting[a]) {  //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
            _this.getAuthorizeInfo()
          } else {
            _this.getLocationInfo()
          }
        }
      });
    },
    // 依据位置信息，目的地信息获取dtp药房列表
    isGetDrugList (operate) {
      if (operate !== 'putdown') {
        this.drugLocationList = []
        this.pageNumber = 0
      }
      const params = {
        pageNumber: this.query.pageNumber,
        pageSize: this.query.pageSize,
        cityId: this.cityId,
        provinceId: this.provinceId,
        lat: this.queryLaction.lat,
        lng: this.queryLaction.lng,
      }
      return this.$http.get('admin/drugstore/drugstore', { params }).then((res) => {
        console.log('admin/drugstore/drugstore_', res.data);
        this.drugLocationList = this.drugLocationList.concat(res.data.pageList)
        this.selectArea = false
      })
    },
    operate () {
      this.selectArea = !this.selectArea
      if (this.selectArea) {
        // 默认选中北京
        this.provinceName = '北京市'
        this.provinceId = 110000
      }
    },
    // 滚动到底部
    scroll () {
      this.query.pageNumber++
      console.log('refresh');
      this.isGetDrugList('putdown').then(() => {
        uni.stopPullDownRefresh();
      })
    },
    //选中药房
    selectedDrug (item) {
      console.log('selectedDrug_', item)
      this.$store.commit('SELETE_DRUG', item)
      uni.navigateBack()
    }
  },
  computed: {
    areaHeight () {
      let capsuleHeight, areaHeight
      capsuleHeight = storage.getSync('capsuleInfo')
      areaHeight = capsuleHeight + 70
      return areaHeight
    }
  },
  onLoad () {
    this.items = this.$store.getters.getLocationAdd
    console.log('this.items_location_', this.items);
  },
  onReady () {
    this.isGetLocation();
  }
}
</script>
<style  lang='scss' scoped>
.wrap {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .location_select {
    margin: px2rpx(1) px2rpx(0);
    height: px2rpx(40);
    line-height: px2rpx(40);
    width: 100%;
    background: #fff;
    display: flex;
    border-top: px2rpx(1) solid #f3f3f3;
    align-items: center;
    font-size: px2rpx(16);
    img {
      width: px2rpx(22);
      height: px2rpx(22);
      margin-left: px2rpx(10);
    }
    span {
      margin-left: px2rpx(7);
    }
    .icon_style {
      font-size: px2rpx(12);
      color: #757575;
    }
  }
  .location_list {
    padding-top: px2rpx(5);
    flex: 1;
    overflow: scroll;
    background: #f3f3f3;
    .scrollView {
      height: 99%;
      .itemMessage {
        display: flex;
        flex-direction: column;
        height: px2rpx(171);
        margin-bottom: px2rpx(5);
        background: #ffffff;
        padding: px2rpx(0) px2rpx(10);
        .orderInfoHeader {
          height: px2rpx(55);
          line-height: px2rpx(55);
          display: flex;
          font-size: px2rpx(18);
          color: #282828;
          justify-content: space-between;
        }
        .orderInfoContent {
          display: flex;
          height: px2rpx(96);
          align-items: center;
          .itemImg {
            width: px2rpx(96);
            height: px2rpx(96);
            margin-right: px2rpx(7);
            img {
              background-size: cover;
              width: 100%;
              height: 100%;
            }
          }
          .itemInfo {
            display: flex;
            flex: 1;
            height: px2rpx(96);
            justify-content: space-between;
            flex-direction: column;
            .name {
              font-size: px2rpx(16);
              color: #6c6c6c;
              height: px2rpx(49);
              line-height: px2rpx(22);
              letter-spacing: 0;
              view {
                height: px2rpx(22);
                line-height: px2rpx(22);
                margin-bottom: px2rpx(5);
              }
            }
            .specification {
              display: flex;
              justify-content: space-between;
              font-size: px2rpx(16);
              color: #6c6c6c;
              letter-spacing: 0;
            }
          }
        }
      }
    }
  }
  .areaShow {
    position: fixed;
    top: px2rpx(1);
    height: 100%;
    width: "100%";
    overflow: scroll;
  }
  .activeLabel {
    color: #4da08a;
  }
  .deactiveLabel {
    color: rgb(200, 200, 200);
  }
}
.wrap /deep/ .van-tree-select__nitem--active:after {
  background-color: #4da08a;
}
.wrap /deep/ .van-tree-select__item--active {
  color: #4da08a;
}
.content {
  text-align: center;
  height: 400upx;
}
.tab {
  padding: 20upx 0;
  font-size: 32upx;
}
.result {
  margin-top: 200upx;
  font-size: 32upx;
}
</style>
