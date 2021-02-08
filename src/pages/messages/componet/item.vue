<template>
  <view class="flex padding-sm solid-bottom" @click="$emit('go')">
    <avatar :url="user.avatar" :name="username"></avatar>
    <view class="margin-left-sm flex-sub">
      <view class="margin-bottom-sm flex align-center">
        <view class="text-lg text-bold">{{ username }}</view>
        <view class="flex-sub"></view>
        <view>{{ link.update_at | moment('link') }}</view>
      </view>
      <view class="flex align-center">
        <view class="text-cut">{{ link.message }}</view>
        <view class="flex-sub"></view>
        <view class="cu-tag bg-red sm round" v-if="link.receive_id === userInfo.id && link.unread_count">
          {{ link.unread_count }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import avatar from '@/components/avatar';
import { mapState } from 'vuex';
export default {
  components: {
    avatar
  },
  props: {
    bean: {
      type: Object,
      requird: true
    }
  },
  computed: {
    ...mapState(['userInfo']),
    user() {
      return this.bean.user;
    },
    link() {
      return this.bean.link;
    },
    username() {
      let { link, user } = this;
      if (link.title) {
        return link.title;
      }
      return user.nickname || user.username;
    }
  }
};
</script>

<style></style>
