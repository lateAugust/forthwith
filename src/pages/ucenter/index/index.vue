<template>
  <view class="text-black">
    <!-- <view class="cu-form-group">
      <avatar :name="userInfo.username" :url="userInfo.avatar" />
      <view>
        <text>{{ userInfo.username || '' }}</text>
        <text>{{ userInfo.mobile || '' }}</text>
      </view>
    </view> -->
    <view class="flex bg-white padding-tb-sm padding-left-sm">
      <avatar :name="userInfo.username || ' '" :url="userInfo.avatar" />
      <view class="margin-left flex-sub">
        <view class="text-bold text-lg">
          <view style="min-height: 76rpx">{{ userInfo.username || '' }}</view>
          <view class="cuIcon-female text-pink" v-if="userInfo.age"></view>
        </view>
        <view class="show-arrow padding-top-sm">{{ userInfo.mobile || ' ' }}</view>
      </view>
    </view>
    <view class="margin-top-sm">
      <view class="cu-list menu">
        <view class="cu-item arrow" @tap="handleSet">
          <view class="content">
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
import avatar from '@/components/avatar';
import goLoginMixins from '@/mixins/user/go-login';
import { mapState } from 'vuex';
export default {
  mixins: [goLoginMixins],
  components: {
    avatar
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
            that.$store.commit('logOut');
            that.goLogin();
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
      uni.navigateTo({
        url: '/pages/ucenter/login/login'
      });
    }
  }
};
</script>

<style></style>
