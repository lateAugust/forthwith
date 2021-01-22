<template>
  <view>
    <form>
      <view class="cu-form-group">
        <view class="title">用户名</view>
        <input placeholder="用户名" :maxlength="10" v-model="formBean.username" />
      </view>
      <view class="cu-form-group">
        <view class="title">密码</view>
        <input placeholder="密码" password v-model="formBean.password" confirm-type="done" @confirm="handleRegister" />
      </view>
      <view class="cu-form-group">
        <view class="title">确认密码</view>
        <input
          placeholder="确认密码"
          password
          v-model="formBean.confirm_password"
          confirm-type="done"
          @confirm="handleRegister"
        />
      </view>
      <!-- <button @tap="handleRegister">登录</button> -->
      <!-- <button @tap="wechatlogin">wechat</button>
				<button open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials>open_type</button> -->
      <view class="padding-lr padding-tb-sm flex justify-between">
        <view @tap="handleLogin">已有账号?去登陆</view>
        <view>忘记密码</view>
      </view>
      <view class="text-center margin-lr-lg margin-top-lg">
        <button @tap="handleRegister" class="bg-blue">注册</button>
      </view>
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
        password: '',
        confirm_password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      uni.navigateTo({
        url: '/pages/ucenter/login/login'
      });
    },
    handleRegister() {
      if (!rules(this.formBean, 'loginRegister')) return;
      uni.showLoading({ title: '注册中...' });
      this.formBean.pin_yin = this.$methods.transformPinYin(this.formBean.username);
      apiUser
        .register(this.formBean)
        .then(() => {
          uni.showModal({
            title: '登录',
            content: '注册成功, 是否去登录?',
            cancelColor: '#085820',
            confirmColor: '#ff0000',
            cancelText: '取消',
            confirmText: '确定',
            success(res) {
              console.log(res.confirm);
              if (res.confirm) {
                uni.redirectTo({
                  url: '/pages/ucenter/login/login'
                });
              }
            }
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
