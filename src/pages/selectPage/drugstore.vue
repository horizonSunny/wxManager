<template>
  <div class="wrap">
    <topBar page-title="选取药店"></topBar>
    <!--<view class="location_select"> </view>
    <view class="location_list">  </view> -->
    <!-- <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      main-active-class="mainactiveclass"
      content-active-class="contentactiveclass"
      @clickNav="onClickNav"
      @clickItem="onClickItem"
    /> -->
    <w-picker
      mode="region"
      :defaultVal="['浙江省', '杭州市', '滨江区']"
      @confirm="onConfirm"
      ref="region"
      themeColor="#f00"
    >
    </w-picker>
  </div>
</template>
<script>
// van-tree-select只能用在app和小程序中
import topBar from '../../components/topNavigation/index'
import wPicker from "../../components/w-picker/components/w-picker/w-picker.vue";
export default {
  components: {
    topBar
  },
  data () {
    return {
      items: [
        {
          // 导航名称
          text: '所有城市',
          // 禁用选项
          disabled: false,
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
        },
        {
          // 导航名称
          text: '城市',
          // 禁用选项
          disabled: false,
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
    }
  },
  methods: {
    onClickNav ({ detail = {} }) {
      // this.setData({
      //   mainActiveIndex: detail.index || 0
      // });
      this.mainActiveIndex = detail.index || 0
    },
    onClickItem ({ detail = {} }) {
      const activeId = this.activeId === detail.id ? null : detail.id;
      console.log('detail_', detail)
      this.activeId = activeId
    }
  }
}
</script>
<style  scoped>
.wrap {
  background: #f3f3f3;
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  // .location_select {
  //   margin: px2rpx(1) px2rpx(0) px2rpx(5);
  //   height: px2rpx(40);
  //   width: 100%;
  //   background: #fff;
  // }
  // .location_list {
  //   display: flex;
  //   flex: 1;
  //   background: #fff;
  // }
}
.mainactiveclass {
  color: #00d1a4;
}
.contentactiveclass {
  color: #00d1a4;
}
.van-tree-select__nitem--active:after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3.6px;
  background-color: #00d1a4;
  content: "";
}
</style>
