<template>
  <view>
    <form>
      <view class="cu-form-group">
        <view class="title">用户名</view>
        <input placeholder="用户名" :maxlength="10" v-model="formBean.username" />
      </view>
      <view class="cu-form-group">
        <view class="title">昵称</view>
        <input placeholder="昵称" :maxlength="10" v-model="formBean.nickname" />
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <!-- <input placeholder="性别" v-model="formBean.gender" /> -->
        <simplePicker v-model="formBean.gender" simple :range="genderRange"></simplePicker>
      </view>
      <view class="cu-form-group">
        <view class="title">年龄</view>
        <input placeholder="年龄" :maxlength="10" type="number" v-model="formBean.age" />
      </view>
      <view class="cu-form-group">
        <view class="title">手机</view>
        <input placeholder="手机" :maxlength="11" type="number" v-model="formBean.mobile" />
      </view>
      <view class="cu-form-group">
        <view class="title">email</view>
        <input placeholder="email" v-model="formBean.email" />
      </view>
      <view class="cu-form-group">
        <view class="title">地址</view>
        <input placeholder="地址" v-model="formBean.address" />
      </view>
    </form>
    <save @save="handleGo"></save>
  </view>
</template>

<script>
import save from '@/components/buttom-button';
import simplePicker from '@/components/simple-picker';
import { user } from '@/asserts/ranges';
import apiUser from '@/api/user';
import rules from '@/asserts/rules';
export default {
  components: {
    save,
    simplePicker
  },
  data() {
    return {
      formBean: {
        username: '',
        nickname: null,
        age: null,
        gender: null,
        address: null,
        mobile: null,
        email: null
      },
      genderRange: user.gender
    };
  },
  watch: {},
  onLoad() {
    let userInfo = this.$store.state.userInfo;
    for (let key of Object.keys(this.formBean)) {
      let val = userInfo[key];
      if (this.$methods.propEmpty(val)) {
        this.formBean[key] = val;
      }
    }
  },
  methods: {
    handleGo() {
      if (!rules(this.formBean, 'userInfo')) return;
      uni.showLoading({ message: '保存中...', mask: true });
      this.formBean.pin_yin = this.$methods.transformPinYin(this.formBean.username);
      apiUser
        .setUserInfo(this.$methods.delNullProps(this.formBean))
        .then((res) => {
          uni.showToast({ title: res.message });
          this.$store.commit('setUserInfo', res.data);
        })
        .catch(() => {
          // console.log(err);
        })
        .finally(() => {
          uni.hideLoading();
        });
    }
  }
};
</script>

<style></style>
