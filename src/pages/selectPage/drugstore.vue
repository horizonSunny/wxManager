<template>
  <div class="wrap">
    <topBar page-title="选取药店"></topBar>
    <view class="location_select content">
      <mix-tree
        :list="listInfo"
        :params="treeParams"
        @treeItemClick="treeItemClick"
      ></mix-tree>
    </view>
    <view class="location_list"> </view>
  </div>
</template>
<script>
// van-tree-select只能用在app和小程序中
import mixTree from '../../components/mix-tree/components/mix-tree/mix-tree'
import topBar from '../../components/topNavigation/index'
export default {
  components: {
    topBar,
    mixTree
  },
  data () {
    return {
      listInfo: [{
        id: 1,
        name: '题库',
        children: [{
          id: 11,
          name: '语文',
          children: [{
            id: 111,
            name: '高一卷',

          }, {
            id: 112,
            name: '高二卷',

          }]
        }, {
          id: 12,
          name: '数学',

        }]
      },
      {
        id: 2,
        name: '高考',
        children: [{
          id: 21,
          name: '高考1',

        }, {
          id: 22,
          name: '高考2',

        }, {
          id: 23,
          name: '高考3',

        },]
      },
      {
        id: 3,
        name: '课程'
      },
      {
        id: 4,
        name: '论文',
        children: [{
          id: 41,
          name: '论文分享',

        }]
      }
      ],
      treeParams: {
        defaultIcon: '/static/i2.png', // 默认图标
        currentIcon: '/static/i1.png', // 展开图标
        lastIcon: '/static/i3.png', //最后一级图标
        border: true   // 边框， 默认不显示
      }
    }
  },
  methods: {
    treeItemClick (item) {
      let {
        id,
        name,
        parentId
      } = item;
      uni.showModal({
        content: `点击了${parentId.length + 1}级菜单, ${name}, id为${id}, 父id为${parentId.toString()}`
      })
      console.log(item)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  .location_select {
    margin: px2rpx(1) px2rpx(0) px2rpx(5);
    height: px2rpx(400);
    width: 100%;
    background: #fff;
  }
  .location_list {
    // height: 200px;
    width: 100%;
    background: green;
    flex: 1;
  }
  .content {
    height: 200px;
    width: 100%;
  }
}
</style>
