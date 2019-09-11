<template>
  <div class="main-content">
    <div class="content-location" @click.stop="choseLocation">
      <span>{{ locationText }}</span>
      <van-icon v-if="showLocation" name="arrow-up" /><van-icon
        v-else
        name="arrow-down"
      />
    </div>
    <div v-show="showLocation" class="content-city">
      <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        main-active-class="mainactiveclass"
        content-active-class="contentactiveclass"
        @clickNav="onClickNav"
        @clickItem="onClickItem"
      />
    </div>
    <div class="content-list">
      <div v-show="hospitalList.length < 1 && !isLoadData" class="no-content">
        <van-icon size="240rpx" color="rgba(16, 16, 16, 0.41)" name="photo-o" />
        <p class="content-text">目前该地区暂无药房</p>
        <p class="content-text">敬请期待</p>
      </div>
      <div
        class="list-main"
        v-for="hospital in hospitalList"
        :key="hospital.id"
      >
        <div class="list-item">
          <div class="item-left">
            <img :src="hospital.pic ? hospital.pic : defaultImg" alt="医院" />
          </div>
          <div class="item-center" @click="goToDetail(hospital)">
            <div class="center-top">{{ hospital.name }}</div>
            <div class="center-mid">
              <div class="center-mid-item" v-if="hospital.label">
                {{ hospital.label }}
              </div>
            </div>
            <div class="center-bot">
              <van-icon name="location" color="#C8C8C8" size="26rpx" />
              <span class="center-address">{{ hospital.address }}</span>
              <span class="center-distance">{{
                hospital.distance ? hospital.distance : "未知距离"
              }}</span>
            </div>
          </div>
          <div class="item-right" @click="handleCall(hospital.phoneList)">
            <van-icon name="phone-o" color="#fff" size="60rpx" />
          </div>
        </div>
      </div>
      <div class="bottom-loading" v-show="isLoadData">
        <van-loading type="spinner" /> <span>正在加载中...</span>
      </div>
    </div>

    <van-dialog id="van-dialog" />

    <van-action-sheet
      :show="showPhoneNo"
      :actions="phoneList"
      cancel-text="取消"
      @close="onNoClose"
      @cancel="onNoCancel"
      @select="onNoSelect"
    />
  </div>
</template>

<script>
import store from '../../store/index'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
import request from "../../utils/request.js"

const municipality = ['上海市', '重庆市', '北京市', '天津市']
export default {
  data () {
    return {
      locationText: '全国',
      showLocation: false,
      showPhoneNo: false,
      isLastPage: false,
      isLoadData: false,
      mainActiveIndex: 0,
      phoneList: [],
      activeId: '',
      items: [],
      hospitalList: [],
      query: {
        pageNumber: 0,
        pageSize: 10
      },
      defaultImg: require('../../../static/images/yaofang.png')
    }
  },
  mounted () {
    // 获取城市列表
    request({
      url: `/wx/provinceCity`,
      type: "GET",
      data: {
        status: 1
      }
    }).then(
      (res) => {
        if (res && res.status == "1") {
          // 处理城市数据
          this.handleProvinceCity(res.body)
        }
        this.getPermission()
      },
      (err) => {
        this.getPermission()
      }
    )
  },
  onReachBottom () {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    console.log("下拉刷新")
    if (!this.isLastPage) {
      this.getList()
    }
  },
  onUnload () {
    this.hospitalList = []
    this.query.pageNumber = 0
  },
  onPullDownRefresh () {
    // 上拉刷新
    console.log("上拉刷新")
    this.query.pageNumber = 0
    this.hospitalList = []
    this.getList()
    // if (!this.loading) {
    //   this. fetchArticleList(1, true).then(() => {
    //     // 处理完成后，终止下拉刷新
    //     wx.stopPullDownRefresh()
    //   })
    // }
  },
  methods: {
    // 获取位置权限
    getPermission () {
      let vm = this
      wx.getSetting({
        success (res) {
          // scope.userLocation 为真， 代表用户已经授权
          if (res.authSetting['scope.userLocation']) {
            vm.getLocation()
          } else {
            // 未授权时先自动请求权限
            wx.authorize({
              scope: 'scope.userLocation',
              success (res) {
                vm.getLocation()
              },
              fail (res) {
                // 用户未授权时引导授权
                wx.showModal({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                  success: function (tip) {
                    if (tip.confirm) {
                      wx.openSetting({
                        success: function (data) {
                          if (data.authSetting["scope.userLocation"] === true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            vm.getLocation()
                          } else {
                            wx.showToast({
                              title: '授权失败',
                              icon: 'success',
                              duration: 1000
                            })
                            vm.locationText = '全国'
                          }

                        }
                      })
                    }
                    if (tip.cancel) {
                      console.log("run fail", tip)
                      vm.locationText = '全国'
                    }
                  }
                })
              }
            })

          }
        }
      })
    },
    // 使用 getlocation 获取用户 经纬度位置
    getLocation () {
      let vm = this
      vm.locationText = '正在定位..'
      wx.getLocation({
        success (res) {
          vm.query.lat = res.latitude
          vm.query.lng = res.longitude
          vm.getAddress(res.latitude, res.longitude)
        }
      })
    },
    // 获取列表数据
    getList () {
      this.isLoadData = true
      request({
        // url: `/wx/drugstore/${this.query.cityId}`,
        url: `/wx/drugstore`,
        type: "GET",
        data: {
          cityId: this.activeId,
          provinceId: this.items ? this.items[this.mainActiveIndex].id : 0,
          ...this.query
        }
      }).then(
        (res) => {
          this.isLoadData = false
          console.log('res:', res)
          if (res && res.status == "1") {
            this.isLastPage = res.body.lastPage
            this.hospitalList.push(...res.body.pageList)
            this.query.pageNumber = this.query.pageNumber + 1
            wx.stopPullDownRefresh()
          }
        },
        (err) => {
          this.isLoadData = false
          console.log("请求错误:", err)
        }
      )
    },
    // 处理省市区数据
    handleProvinceCity (data) {
      if (data.length > 0) {
        let tempItem = []
        data.forEach((item, index) => {
          let temp = {}
          temp.text = item.name
          temp.id = item.value
          temp.uid = item.value
          temp.children = []
          item.children.forEach((childrenItem) => {
            temp.children.push({
              text: childrenItem.name,
              id: childrenItem.value
            })
          })
          tempItem.push(temp)
        })
        console.log(tempItem)
        this.items = tempItem
      } else {
        this.items = [
          {
            text: '全国',
            children: []
          }
        ]
      }
    },

    // 切换地址
    choseLocation (e) {
      this.showLocation = !this.showLocation;
    },
    // 点击省份
    onClickNav (event) {
      this.mainActiveIndex = event.target.index;
    },
    // 点击地区
    onClickItem (event) {
      this.activeId = event.target.id;
      this.locationText = event.target.text;
      this.showLocation = false;
      this.query.pageNumber = 0;
      this.hospitalList = []
      this.getList()
    },
    // 点击内容，前往详情页
    goToDetail (detail) {
      console.log('detail:', detail)
      store.commit('setHospitalDetail', detail)
      const url = '/pages/hospitalDetail/main'
      wx.navigateTo({ url })
    },
    // 获取地址
    getAddress (latitude, longitude) {
      var vm = this
      let qqmapsdk = new QQMapWX({
        key: '7L3BZ-M7MWQ-S4V5R-GG5KR-ORGGO-HNBT4'
      })
      qqmapsdk.reverseGeocoder({
        location: { latitude, longitude },
        sig: 'NsXvQMibw9QqROY4Xqm5HA4CLDPzFT5r',
        success (res) {
          console.log('success', res)
          if (res.status == 0) {
            let province = res.result.ad_info.province
            let district = res.result.ad_info.district
            let city = res.result.ad_info.city
            // let cityId = res.result.ad_info.adcode
            let cityId = res.result.ad_info.city_code.slice(3)
            vm.locationText = res.result.ad_info.city
            if (municipality.includes(province)) {
              province = res.result.ad_info.city
              city = res.result.ad_info.district
              cityId = res.result.ad_info.adcode
              vm.locationText = res.result.ad_info.district
            }
            let mainActiveIndex = vm.provinceInlist(province);
            let activeId = vm.districtInlist(province, cityId)
            if (mainActiveIndex > -1) {
              vm.mainActiveIndex = mainActiveIndex
            }
            if (activeId > -1) {
              vm.activeId = activeId
            }
            // 定位成功之后获取数据
            this.hospitalList = []
            vm.getList();
          }
        },
        fail (res) {
          vm.locationText = '全国'
        }
      })
    },
    // 判断自动定位省份是否在级联菜单内
    provinceInlist (province) {
      let _index = -1;
      this.items.forEach((element, index) => {
        if (element.text == province) {
          _index = index
        }
      });
      return _index
    },
    // 判断自动定位区是否在级联菜单内
    districtInlist (province, cityId) {
      let _index = -1;
      this.items.forEach((element, index) => {
        if (element.text == province) {
          element.children.forEach(elementSe => {
            if (elementSe.id == cityId) {
              _index = elementSe.id
            }
          })
        }
      });
      return _index
    },
    // 点击打电话图标
    handleCall (phoneList) {
      // TODO 将电话号码push到phoneList中
      console.log('phoneList:', phoneList)
      if (!phoneList) {
        this.phoneList = [
          {
            name: "暂无电话",
            disabled: true
          }
        ]
      } else {
        let tempPhoneList = phoneList.split(',')
        console.log('tempPhoneList:', tempPhoneList)
        if (tempPhoneList.length > 0) {
          this.phoneList = []
          for (let i = 0; i < tempPhoneList.length; i++) {
            this.phoneList.push({ name: tempPhoneList[i] })
          }
        }
      }
      this.showPhoneNo = true;
    },
    // 关闭电话列表
    onNoCancel () {
      this.showPhoneNo = false
    },
    // 关闭
    onNoClose () {
      this.showPhoneNo = false
    },
    // 点击电话列表
    onNoSelect (event) {
      wx.makePhoneCall({
        phoneNumber: event.target.name // 仅为示例，并非真实的电话号码
      })
    },
  }
}
</script>

<style scoped>
.main-content >>> .mainactiveclass {
  color: #00d1a4;
}
.main-content >>> .contentactiveclass {
  color: #00d1a4;
}
.main-content >>> .van-tree-select__nitem--active:after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3.6px;
  background-color: #00d1a4;
  content: "";
}
.main-content {
  background-color: #f0f0f2;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-flow: column;
}
.content-location {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-size: 26rpx;
  height: 80rpx;
  line-height: 80rpx;
  padding: 14rpx;
  background-color: #fff;
}
.content-location span {
  display: inline-block;
  margin-right: 10rpx;
}
.content-city {
  position: absolute;
  width: 100%;
  z-index: 10;
  top: 80rpx;
  height: 100%;
  background-color: rgba(240, 240, 242, 0.6);
}
.content-list {
  position: relative;
  width: 100%;
  /* margin-top:16rpx; */
  flex: 1;
}
.no-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
}
.content-text {
  color: rgba(16, 16, 16, 0.78);
  font-size: 28rpx;
  text-align: center;
  font-family: PingFangSC-regular;
}
.bottom-loading {
  text-align: center;
  font-size: 24rpx;
}
.list-main {
  box-sizing: border-box;
  /* margin-bottom: 8rpx; */
  margin-top: 6rpx;
  padding: 40rpx 26rpx;
  /* height: 178rpx; */
  background-color: #ffffff;
}
.list-item {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.item-left {
  width: 120rpx;
  height: 120rpx;
}
.item-left img {
  width: 120rpx;
  height: 120rpx;
}
.item-center {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  padding-left: 22rpx;
  padding-right: 22rpx;
}
.center-top {
  font-size: 34rpx;
  color: #303030;
  height: 42rpx;
  line-height: 42rpx;
  text-align: left;
  font-family: PingFang-SC-Bold;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  word-break: break-all; /* 内容自动换行 */
}
.center-mid {
  height: 36rpx;
  width: 136rpx;
  /* color: rgba(37, 155, 36, 1); */
  color: #feb753;
  font-size: 24rpx;
  border-radius: 4px;
  text-align: center;
  font-family: PingFang-SC-Medium;
  margin-bottom: 16rpx;
}
.center-mid-item {
  border-radius: 8rpx;
  border: 2px solid #feb753;
}
.center-distance {
  right: 4rpx;
  position: absolute;
}
.center-bot {
  font-size: 26rpx;
  height: 37rpx;
  line-height: 37rpx;
  color: #969696;
  text-align: left;
  font-family: PingFang-SC-Bold;
  position: relative;
  display: flex;
  flex-direction: row;
}
.center-address {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  word-break: break-all; /* 内容自动换行 */
  width: 320rpx;
  margin-left: 8rpx;
  font-family: PingFang-SC-Medium;
  font-size: 26rpx;
  color: #969696;
}
.item-right {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  background: #00d1a4;
  border-radius: 8px;
  font-size: 28rpx;
  color: #ffffff;
  font-family: PingFangSC-regular;
  padding-top: 12rpx;
  box-sizing: border-box;
}
.item-right-icon {
  width: 80rpx;
  height: 80rpx;
}
.item-right-text {
  color: rgba(51, 49, 49, 0.84);
  font-size: 24rpx;
  text-align: left;
  font-family: PingFangSC-regular;
  margin-top: 10rpx;
}
</style>
