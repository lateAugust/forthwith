<template>
  <view>
    <view class="cu-form-group" @click="handleGo">
      <view class="title">添加好友</view>
      <!-- <input placeholder="统一标题的宽度" name="input" /> -->
      <view class="show-arrow flex-sub"></view>
    </view>
  </view>
</template>

<script>
import goLoginMixins from '@/mixins/user/go-login';
export default {
  mixins: [goLoginMixins],
  onShow() {
    this.goLogin();
  },
  methods: {
    handleGo() {
      uni.navigateTo({
        url: '/pages/contacter/searching/searching'
      });
    }
  }
};
</script>

<style></style>
