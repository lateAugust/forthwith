<template>
  <view class="flex margin-top-sm padding-sm bg-white align-center" @tap="$emit('go', bean)">
    <avatar :url="user.avatar" :name="user.username" :quantity="[0, 3]"></avatar>
    <view class="flex-sub margin-left">
      <view class="text-bold text-lg">{{ user.nickname || user.username || '' }}</view>
      <view class="padding-top-xs">
        <view class="cu-tag sm line-red cuIcon-female padding-tb-xs" v-if="user.gender === '男'">
          男{{ user.age || '' }}
        </view>
        <view class="cu-tag sm line-blue cuIcon-male padding-tb-xs" v-else-if="user.gender === '女'">
          女{{ user.age || '' }}
        </view>
        <view class="cu-tag sm line-olive padding-tb-xs" v-else>保密{{ user.age || '' }}</view>
        <!-- 这里可以用来放标签 -->
        <view></view>
      </view>
    </view>
    <view>
      <button class="cu-btn bg-blue" v-if="friend.id" disabled>已添加</button>
      <button class="cu-btn bg-blue" v-else-if="proposer.id" disabled>申请中</button>
      <button class="cu-btn bg-blue" v-else @tap.stop="$emit('add', bean)">添加</button>
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
