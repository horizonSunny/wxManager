<template>
  <view class="modal-box" v-if="true">
    <view class="modal-content">
      <view class="content-title">提示信息</view>
      <view class="content-text">
        请根据指示授权
      </view>
    </view>
    <view class="modal-btns">
      <view class="weui-flex">
        <view class="weui-flex__item">
          <button class="dialog-btn cancel" open-type="exit" bindtap="cancel">
            拒绝授权
          </button>
          <button
            class="dialog-btn confirm"
            open-type="getUserInfo"
            bindgetuserinfo="confirm"
          >
            授权登录
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
// import 
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    cancel () {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,为保障您的利益请进行授权',
      })
    },
    confirm () {
      var that = this
      wx.getUserInfo({
        //获取头像昵称等仅需要调用wx.getUserInfo方法，但要注意button的open-type="getUserInfo"
        success: function (res) {
          console.log(res);
          //var avatarUrl = 'userInfo.avatarUrl';
          //var nickName = 'userInfo.nickName';
          that.setData({
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName,
          })
          wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl),//将头像放入缓存，
            wx.setStorageSync("nickName", res.userInfo.nickName)
        }
      })

    }
  },
  onLoad () {
    console.log('进入dialog');
  }
}
</script>
<style lang="scss">
.modal-box {
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0rpx;
  width: 100%;
  height: 100%;
}

.modal-content {
  background: #fff;
  width: 600rpx;
  margin: 42% auto 0;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebebec;
}

.content-title {
  height: 100rpx;
  text-align: center;
  font-size: 1.2rem;
  padding-top: 10rpx;
}

.content-text {
  padding: 50px 0;
  text-align: center;
}

.modal-btns {
  width: 600rpx;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.dialog-btn {
  border-radius: 0;
  background: #fff;
  height: 100rpx;
  width: 100%;
}

.dialog-btn::after {
  border: none;
  border-radius: 0;
}

.cancel {
  color: #ccc;
}

.confirm {
  border-left: 1px solid #ebebec;
  color: #60d048;
}
</style>