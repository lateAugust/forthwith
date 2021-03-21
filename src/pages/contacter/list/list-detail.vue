<template>
  <view>
    <detail :user="bean.user"></detail>
    <view class="margin-top">
      <view class="cu-form-group">
        <view class="title">成为好友</view>
        <view>{{ bean.friend.create_at | moment('now') }}</view>
      </view>
    </view>
    <save title="发消息" @save="handleGo"></save>
  </view>
</template>

<script>
import detail from '../components/detail';
import save from '@/components/buttom-button';

import apiContacter from '@/api/contacter';
export default {
  components: {
    detail,
    save
  },
  data() {
    return {
      bean: {
        user: {},
        friend: {}
      }
    };
  },
  onLoad({ friend_id, user_id }) {
    this.friendId = +friend_id;
    this.userId = +user_id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      uni.showLoading({ message: '加载中...', mask: true });
      let data = {
        friend_id: this.friendId,
        user_id: this.userId
      };
      console.log(data);
      apiContacter
        .friendsDetail(data)
        .then((res) => {
          let data = res.data;
          this.bean = data;
          uni.setNavigationBarTitle({ title: data.user.nickname || data.user.username });
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    handleGo() {
      uni.navigateTo({
        url: `/pages/messages/window/message?receive_id=${this.bean.user.id}&send_id=${this.$store.state.userInfo.id}&link_id=${this.bean.link.id}`
      });
    }
  }
};
</script>

<style></style>
