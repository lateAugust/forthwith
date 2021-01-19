<template>
  <view>
    <view class="cu-form-group" @click="handleGo">
      <view class="title">添加好友</view>
      <!-- <input placeholder="统一标题的宽度" name="input" /> -->
      <view class="show-arrow flex-sub"></view>
    </view>
    <view class="cu-form-group" @click="handleApply">
      <view class="title">验证信息</view>
      <!-- <input placeholder="统一标题的宽度" name="input" /> -->
      <view class="show-arrow flex-sub">
        <view class="cu-tag bg-red sm radius" v-if="count">{{ count }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import goLoginMixins from '@/mixins/user/go-login';
import apiContacter from '@/api/contacter';
export default {
  mixins: [goLoginMixins],
  data() {
    return {};
  },
  onShow() {
    this.goLogin();
  },
  onLoad() {
    this.getApplyCount();
  },
  methods: {
    handleGo() {
      uni.navigateTo({
        url: '/pages/contacter/searching/searching'
      });
    },
    handleApply() {
      uni.navigateTo({
        url: '/pages/contacter/apply/list'
      });
    },
    getApplyCount() {
      apiContacter.getApplyCount().then((res) => {
        this.$store.commit('contacter/setCount', res.data.count);
      });
    }
  },
  computed: {
    count() {
      return this.$store.state.contacter.count || 0;
    }
  }
};
</script>

<style></style>
