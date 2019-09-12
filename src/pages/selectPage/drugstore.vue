<template>
  <view class="wrap">
    <topBar page-title="选取药店"></topBar>
    <view class="location_select" @click="selectArea = !selectArea">
      <img src="../../static/homePage/icon/dingwei@2x.png" alt="" />
      <span>上海</span>
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
    <view class="location_list"> </view>
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
import topBar from '../../components/topNavigation/index'
import * as storage from '../.../../../config/storage'
export default {
  components: {
    topBar,
  },
  data () {
    return {
      items: [
        {
          // 导航名称
          text: '所有城市',
          id: 1,
          // 禁用选项
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: '温州1',
              // id，作为匹配选中状态的标识
              id: 1,
              message: 'dadad'
              // 禁用选项
            },
            {
              text: '杭州1',
              id: 2,
              message: 'dadad'
            }
          ]
        },
        {
          // 导航名称
          text: '城市',
          id: 2,
          // 禁用选项
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: '温州',
              // id，作为匹配选中状态的标识
              id: 1,
              // 禁用选项
            },
            {
              text: '杭州',
              id: 2
            }
          ]
        }
      ],
      mainActiveIndex: 0,
      activeId: null,
      selectArea: false,
      query: {
        pageNumber: 0,
        pageSize: 10
      },
    }
  },
  methods: {
    // 点击首选项
    onClickNav ({ detail = {} }) {
      this.mainActiveIndex = detail.index || 0
      console.log('detail_onClickNav_', detail)
    },
    // 点击城市选项
    onClickItem ({ detail = {} }) {
      const activeId = this.activeId === detail.id ? null : detail.id;
      console.log('detail_', detail)
      this.activeId = activeId;
      console.log('detail_onClickItem_', detail)
    },
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
  }
}
</script>
<style  lang='scss' scoped>
.wrap {
  background: #f3f3f3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .location_select {
    margin: px2rpx(1) px2rpx(0) px2rpx(5);
    height: px2rpx(40);
    line-height: px2rpx(40);
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
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
    .icon_styleTwo {
      font-size: px2rpx(20);
      color: #757575;
    }
  }
  .location_list {
    display: flex;
    flex: 1;
    background: #fff;
  }
  .areaShow {
    position: fixed;
    top: px2rpx(1);
    height: px2rpx(150);
    overflow: scroll;
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
