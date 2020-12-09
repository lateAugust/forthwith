<template>
  <view>用户联系人页面</view>
</template>

<script>
import goLoginMixins from '@/mixins/user/go-login';
export default {
  mixins: [goLoginMixins],
  onShow() {
    this.goLogin();
  }
};
</script>

<style></style>
