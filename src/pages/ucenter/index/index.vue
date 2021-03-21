<template>
  <view class="text-black">
    <userInfoBasically :userInfo="userInfo"></userInfoBasically>
    <view class="margin-top-sm">
      <view class="cu-list menu">
        <view class="cu-item" @tap="handleSet">
          <view class="content show-arrow">
            <!-- <text class="cuIcon-circlefill text-grey"></text> -->
            <text>修改资料</text>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-list menu margin-top-sm">
      <template v-if="isLogin">
        <view class="cu-item" @tap="handleOut">
          <view class="content text-center">
            <!-- <text class="cuIcon-circlefill text-grey"></text> -->
            <text>退出登录</text>
          </view>
        </view>
        <view class="cu-item menu margin-top-sm">
          <view class="content text-center">
            <!-- <text class="cuIcon-circlefill text-grey"></text> -->
            <text>切换账号</text>
          </view>
        </view>
      </template>
      <template v-else>
        <view class="cu-item" @tap="handleLogin">
          <view class="content text-center">
            <!-- <text class="cuIcon-circlefill text-grey"></text> -->
            <text>登录</text>
          </view>
        </view>
        <view class="cu-item margin-top-sm" @tap="handleRegister">
          <view class="content text-center">
            <!-- <text class="cuIcon-circlefill text-grey"></text> -->
            <text>注册</text>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
import goLoginMixins from '@/mixins/user/go-login';
import userInfoBasically from '@/components/userinfo-basically';
import { mapState } from 'vuex';
export default {
  mixins: [goLoginMixins],
  components: {
    userInfoBasically
  },
  onShow() {
    this.goLogin();
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  methods: {
    handleSet() {
      this.goLogin();
      uni.navigateTo({
        url: '/pages/ucenter/userinfo/userinfo'
      });
    },
    handleOut() {
      const that = this;
      uni.showModal({
        title: '退出登录',
        content: '确定退出当前登录?',
        cancelColor: '#085820',
        confirmColor: '#ff0000',
        cancelText: '取消',
        confirmText: '确定',
        success(res) {
          if (res.confirm) {
            that.$store.state.websocket.closeWebsocket();
            that.$store.commit('logOut');
            // that.goLogin();
          }
        }
      });
    },
    handleRegister() {
      uni.navigateTo({
        url: '/pages/ucenter/register/register'
      });
    },
    handleLogin() {
      uni.reLaunch({
        url: '/pages/ucenter/login/login'
      });
    }
  }
};
</script>

<style></style>
