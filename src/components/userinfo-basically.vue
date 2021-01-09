<template>
  <view class="flex bg-white padding-tb-sm padding-left-sm padding-right">
    <avatar :name="userInfo.username || ' '" :url="userInfo.avatar" />
    <view class="margin-left flex-sub text-lg">
      <view class="margin-right text-bold padding-bottom-xs">{{ userInfo.nickname || userInfo.username || '' }}</view>
      <view class="flex align-center" :class="{ 'show-arrow': showArrow }">
        <template>
          <view class="cu-tag sm line-blue cuIcon-male padding-tb-xs" v-if="userInfo.gender === '男'">
            <text class="cuIcon-male">男</text>
            <text class="dis-ib center">{{ userInfo.age || '' }}</text>
          </view>
          <view class="cu-tag sm radius line-red cuIcon-female padding-tb-xs" v-else-if="userInfo.gender === '女'">
            <text class="cuIcon-female">女</text>
            <text class="dis-ib center">{{ userInfo.age || '' }}</text>
          </view>
          <view class="cu-tag sm line-olive padding-tb-xs" v-else>
            <text class="cuIcon-female">保密</text>
            <text class="dis-ib center">{{ userInfo.age || '' }}</text>
          </view>
        </template>
        <view class="padding-left-xs text-df" style="min-height: 32rpx">
          <text>{{ userInfo.mobile || '' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import avatar from '@/components/avatar';
export default {
  components: {
    avatar
  },
  props: {
    userInfo: {
      type: Object,
      reqiured: true
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.center {
  height: 32rpx;
  line-height: 1.5;
}
</style>
