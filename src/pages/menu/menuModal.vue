<template>
  <view v-if="modalShow" class="modal" @click="closeModel">
    <view class="modalContent" @click.stop="clickInner">
      <img
        @click="closeModel"
        class="modalClose"
        src="../../static/menu/图标 66.svg"
        alt=""
      />
      <view>
        <view class="showImg">
          <img src="../../static/menu/图片 303.jpg" alt="" />
        </view>
        <view class="modelContent">
          <view class="optionStyle">
            <view
              class="options"
              v-for="(item, index) in pitchDrink['details']['options']"
              :key="index"
            >
              <text class="labelInfo">{{ item["option"] }}</text>
              <view class="optionInfo">
                <view
                  class="text_1323X1"
                  :class="
                    value === item['defaultValue']
                      ? 'buttonSelected'
                      : 'text_1323X1'
                  "
                  v-for="(value, valueIndex) in item['value']"
                  :key="valueIndex"
                  @click="optionSelect(item, value)"
                  >{{ value }}</view
                >
              </view>
            </view>
          </view>
          <view> </view>
          <view class="confirmSelect"> </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: ['modalShow', 'pitch'],
  data () {
    return {
      pitchDrink: this.pitch
    }
  },
  methods: {
    closeModel () {
      // this.closeModel = false
      this.$emit('closeModal')
    },
    clickInner () {

      console.log('clickInner');
    },
    // option 选项选中
    optionSelect (info, value) {
      debugger
      console.log('info_', info);
      console.log('value_', value);
      info['defaultValue'] = value
    }
  }
}
</script>
<style lang="scss">
.modal {
  width: 100%;
  height: 100%;
  background-color: #130b0b31;
  position: absolute;
  .modalContent {
    position: absolute;
    width: px2rpx(335);
    height: px2rpx(500);
    left: 50%;
    top: 50%;
    margin-top: px2rpx(-250);
    margin-left: px2rpx(-165);
    border-radius: px2rpx(8);
    .modalClose {
      z-index: 999;
      position: absolute;
      width: px2rpx(20);
      height: px2rpx(20);
      right: px2rpx(10);
      top: px2rpx(10);
      font-size: px2rpx(20);
      color: rgba(255, 255, 255, 0.8);
    }
    .showImg {
      width: px2rpx(335);
      height: px2rpx(150);
      img {
        width: 100%;
        height: 100%;
        border-radius: px2rpx(10) px2rpx(10) 0 0;
      }
    }
    .modelContent {
      border-radius: 0 0 px2rpx(10) px2rpx(10);
      width: px2rpx(305);
      height: px2rpx(310);
      padding: px2rpx(20) px2rpx(15);
      background: #ffffff;
      position: relative;
      .optionStyle {
        border-bottom: 1px solid #ccc0b4;
        .options {
          width: px2rpx(305);
          margin-bottom: px2rpx(8);
          height: auto;
          display: flex;
          align-items: baseline;
          .labelInfo {
            width: px2rpx(37);
            height: px2rpx(21);
            color: rgba(56, 56, 56, 1);
            font-size: px2rpx(14);
            line-height: 150%;
            text-align: left;
            margin-right: px2rpx(20);
          }
          .optionInfo {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            width: px2rpx(330);
            .text_1323X1 {
              display: inline-block;
              margin-bottom: px2rpx(5);
              margin-left: px2rpx(5);
              width: px2rpx(70);
              height: px2rpx(25);
              line-height: px2rpx(25);
              color: rgba(204, 192, 180, 1);
              box-shadow: rgba(204, 192, 180, 1) solid 1px;
              border: rgba(204, 192, 180, 1) solid 1px;
              border-radius: px2rpx(15);
              font-size: px2rpx(14);
              text-align: center;
            }
            .buttonSelected {
              background-color: rgba(204, 192, 180, 1);
              color: #fff;
            }
          }
        }
      }
      .confirmSelect {
        position: absolute;
        bottom: px2rpx(0);
        width: px2rpx(305);
        height: px2rpx(120);
        background-color: yellow;
      }
    }
  }
}
</style>