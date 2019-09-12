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
              // 禁用选项
            },
            {
              text: '杭州1',
              id: 2
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
      selectArea: false
    }
  },
  methods: {
    onClickNav ({ detail = {} }) {
      this.mainActiveIndex = detail.index || 0
      console.log('detail_onClickNav_', detail)
    },
    onClickItem ({ detail = {} }) {
      const activeId = this.activeId === detail.id ? null : detail.id;
      console.log('detail_', detail)
      this.activeId = activeId;
      console.log('detail_onClickItem_', detail)
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
