<template>
  <view class="wrap">
    <topBar page-title="添加收货地址"></topBar>
    <form @submit="submit">
      <catLabel dataType="text" text="账号" />
    </form>
  </view>
</template>
<script>
import topBar from '../../components/topNavigation/index'
import wPicker from "../../components/w-picker/components/w-picker/w-picker.vue";
// import validate from '../../utils/validate'
export default {
  components: {
    topBar,
    wPicker
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    submit () {
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
}
</style>