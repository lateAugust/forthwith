<template>
  <view>
    <!-- <view class="cu-card case"> -->
    <form>
      <view class="cu-form-group">
        <view class="title">用户名</view>
        <input placeholder="用户名" :maxlength="10" v-model="formBean.username" />
      </view>
      <view class="cu-form-group">
        <view class="title">密码</view>
        <input placeholder="密码" password v-model="formBean.password" confirm-type="done" @confirm="handleLogin" />
      </view>
      <!-- <button @tap="handleLogin">登录</button> -->
      <!-- <button @tap="wechatlogin">wechat</button>
				<button open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials>open_type</button> -->
      <view class="padding-lr padding-tb-sm flex justify-between">
        <view @tap="handleRegister">没有账号?去注册</view>
        <!-- 忘记密码 -->
        <view></view>
      </view>
      <view class="text-center margin-lr-lg margin-top-lg">
        <button @tap="handleLogin" class="bg-blue">登录</button>
      </view>
      <!-- </view> -->
    </form>
  </view>
</template>

<script>
import apiUser from '@/api/user';
import rules from '@/asserts/rules';
export default {
  data() {
    return {
      formBean: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleRegister() {
      uni.navigateTo({
        url: '/pages/ucenter/register/register'
      });
    },
    handleLogin() {
      if (!rules(this.formBean, 'loginRegister')) return;
      uni.showLoading({ title: '登录中...' });
      apiUser
        .login(this.formBean)
        .then((res) => {
          this.$store.commit('login', { userInfo: res.data, token: res.token });
          this.$store.state.websocket.init(res.token);
          uni.showToast({ title: '登录成功' });
          uni.switchTab({
            url: '/pages/messages/list/list'
          });
        })
        .finally(() => {
          uni.hideLoading();
        });
    }
  }
};
</script>

<style scoped></style>
