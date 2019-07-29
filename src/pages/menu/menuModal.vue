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
          <view class="confirmSelect">
            <sunny-list-item :style-info="{ height: '138rpx' }">
              <template v-slot:leftShow>
                <view class="leftShow">
                  <view class="text_1340X1">¥21</view>
                  <view class="text_1341X1">标准美式¥21+ 无糖¥0+ 无奶¥0</view>
                </view>
              </template>
              <template v-slot:rightOption>
                <view class="rightOperate">
                  <view class="circleBorder">-</view>
                  <view>1</view>
                  <view class="circleBorder">+</view>
                </view>
              </template>
            </sunny-list-item>
            <view class="handle">
              <view
                class="btn"
                v-for="(item, index) in btn"
                :key="index"
                :style="{ background: item['backgroundColor'] }"
              >
                <luButtonRipple
                  :rippleBackgroundColor="item.backgroundColor"
                  :rippleOpacity="item.opacity"
                  buttonRippleId="1"
                  @rippleTap="operateOption"
                >
                  <!-- <img :src="item['img']" alt="" /> -->
                  <view style="display:flex">
                    <img :src="item['img']" alt="" />
                    <view>{{ item["text"] }}</view>
                  </view>
                </luButtonRipple>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import sunnyListItem from '../../components/list/listItem'
import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
export default {
  props: ['modalShow', 'pitch'],
  components: {
    sunnyListItem,
    luButtonRipple
  },
  data () {
    return {
      pitchDrink: this.pitch,
      btn: [{
        backgroundColor: '#ff8102',
        opacity: 1,
        text: '充2赠1',
        img: '../../static/menu/图片 308.svg'
      }, {
        backgroundColor: '#88d4d5c2',
        opacity: 1,
        text: '收藏口味',
        img: '../../static/menu/图片 308-2.svg'
      }, {
        backgroundColor: '#88afd5',
        opacity: 1,
        text: '加入购物车',
        img: '../../static/menu/图片 308-3.svg'
      }]
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
    },
    // 选项
    operateOption () {
      console.log(123);
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
        .leftShow {
          .text_1340X1 {
            width: px2rpx(32);
            height: px2rpx(27);
            color: rgba(56, 56, 56, 1);
            font-size: px2rpx(18);
            line-height: px2rpx(27);
            text-align: left;
            font-weight: bold;
          }
          .text_1341X1 {
            width: px2rpx(149);
            height: px2rpx(15);
            color: rgba(80, 80, 80, 1);
            font-size: px2rpx(10);
            line-height: px2rpx(15);
            text-align: left;
          }
        }
        .rightOperate {
          display: flex;
          flex-direction: row;
          width: px2rpx(75);
          color: rgba(136, 175, 213, 1);
          font-size: px2rpx(14);
          height: px2rpx(24);
          line-height: px2rpx(24);
          justify-content: space-around;
          .circleBorder {
            height: px2rpx(22);
            line-height: px2rpx(21);
            text-align: center;
            width: px2rpx(22);
            border-radius: px2rpx(11);
            color: rgba(136, 175, 213, 1);
            border: 1px solid rgba(136, 175, 213, 1);
          }
        }
        // 下面的操作
        .handle {
          height: px2rpx(50);
          width: px2rpx(260);
          padding: 0 px2rpx(20);
          display: flex;
          justify-content: space-between;
          .btn {
            display: flex;
            justify-content: center;
            width: px2rpx(84);
            height: px2rpx(32);
            position: relative;
            font-size: px2rpx(12);
            text-align: center;
            border-radius: px2rpx(4);
            top: 50%;
            margin-top: px2rpx(-16);
            img {
              width: px2rpx(16);
              height: px2rpx(16);
              margin-right: px2rpx(2);
            }
          }
        }
      }
    }
  }
}
</style>