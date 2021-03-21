<template>
  <view class="flex margin-top-sm padding-sm bg-white align-center" @tap="$emit('go', bean)">
    <avatar :url="user.avatar" :name="user.nickname || user.username" :quantity="[0, 3]"></avatar>
    <view class="flex-sub margin-left">
      <view class="text-bold text-lg">{{ user.nickname || user.username || '' }}</view>
      <view class="padding-top-xs">
        <view class="cu-tag sm line-blue padding-tb-xs" v-if="user.gender === '男'">
          <text class="cuIcon-male">男</text>
          <text class="dis-ib center">{{ user.age || '' }}</text>
        </view>
        <view class="cu-tag sm radius line-red padding-tb-xs" v-else-if="user.gender === '女'">
          <text class="cuIcon-female">女</text>
          <text class="dis-ib center">{{ user.age || '' }}</text>
        </view>
        <view class="cu-tag sm line-olive padding-tb-xs" v-else>
          <text class="cuIcon-female">保密</text>
          <text class="dis-ib center">{{ user.age || '' }}</text>
        </view>
        <!-- 这里可以用来放标签 -->
        <view></view>
      </view>
    </view>
    <view>
      <template v-if="$slots.buttons">
        <slot name="buttons"></slot>
      </template>
      <template v-else>
        <button class="cu-btn bg-blue" v-if="friend.id">发消息</button>
        <template v-else-if="proposer.id">
          <button
            class="cu-btn bg-blue"
            v-if="proposer.apply_status === 'underReview' && proposer.target_id === $store.state.userInfo.id"
          >
            待验证
          </button>
          <button class="cu-btn bg-blue" v-else-if="proposer.apply_status === 'underReview'" disabled>申请中</button>
          <button class="cu-btn bg-blue" v-else-if="proposer.apply_status === 'reject'" disabled>已拒绝</button>
        </template>
        <button class="cu-btn bg-blue" v-else @tap.stop="$emit('add', bean)">添加</button>
      </template>
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
    bean: {
      type: Object,
      required: true
    }
  },
  computed: {
    user() {
      console.log(this.bean);
      return this.bean.user;
    },
    friend() {
      return this.bean.friend;
    },
    proposer() {
      return this.bean.proposer;
    }
  }
};
</script>

<style lang="scss" scoped>
.center {
  height: 24rpx;
}
</style>
