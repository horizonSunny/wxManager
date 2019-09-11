<template>
  <view class="content">
    <view
      class="tab"
      :class="{ active: index == tabIndex }"
      @tap="toggleTab(item, index)"
      v-for="(item, index) in tabList"
      :key="index"
      >{{ item.name }}</view
    >
    <w-picker
      mode="region"
      :defaultVal="['浙江省', '杭州市', '滨江区']"
      @confirm="onConfirm"
      ref="region"
    ></w-picker>
  </view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
export default {
  components: {
    wPicker
  },
  data () {
    return {
      title: 'Hello',
      mode: "range",
      tabList: [
        {
          mode: "region",
          name: "省市区"
        }],
      tabIndex: 0,
    }
  },
  computed: {

  },
  methods: {
    toggleTab (item, index) {
      this.tabIndex = index;
      this.mode = item.mode;
      this.defaultVal = item.value;
      this.$refs[item.mode].show();
    },
    onConfirm (val) {
      console.log(val);
      //如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
      // switch(this.mode){
      // 	case "date":
      // 		break;
      // }
      this.resultInfo = val;
    }
  }
}
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}
.tab {
  padding: 20upx 0;
  font-size: 32upx;
}
.tab.active {
  color: #f00;
}
.result {
  margin-top: 200upx;
  font-size: 32upx;
}
</style>
