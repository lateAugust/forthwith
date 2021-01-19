<template>
  <view>
    <userInfoBasically :userInfo="user" :showArrow="false"></userInfoBasically>
    <view class="margin-top">
      <view class="cu-form-group">
        <view class="title">用户名</view>
        <view class="content">{{ user.username }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">昵称</view>
        <view class="content">{{ user.username || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">年龄</view>
        <view class="content">{{ user.age || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <view class="content">{{ user.gender || '--' }}</view>
      </view>
    </view>
    <view class="margin-top">
      <view class="cu-form-group">
        <view class="title">手机</view>
        <view class="content">{{ user.mobile || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">email</view>
        <view class="content">{{ user.email || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">地址</view>
        <view class="content">{{ user.address || '' }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import userInfoBasically from '@/components/userinfo-basically';
export default {
  components: {
    userInfoBasically
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.content {
  font-size: 30rpx;
}
</style>
