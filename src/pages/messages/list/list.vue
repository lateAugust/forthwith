<template>
  <view class="bg-white">
    <dataList :http="getLinks" :isShowNonData="false" :pagenation="pagenation" ref="list">
      <item
        :bean="item"
        :key="item.link.id"
        v-for="item of links"
        @go="
          () => {
            handleGo(item);
          }
        "
      ></item>
    </dataList>
  </view>
</template>

<script>
import goLoginMixins from '@/mixins/user/go-login';

import dataList from '@/components/data-list';

import item from '../componet/item';

import { mapState } from 'vuex';
export default {
  mixins: [goLoginMixins],
  components: {
    dataList,
    item
  },
  data() {
    return {
      pagenation: {
        page: 1,
        page_size: 50
      }
    };
  },
  onLoad() {
    this.$nextTick(() => {
      this.$refs.list.getData();
    });
  },
  onShow() {
    this.goLogin();
    if (this.$store.state.messages.refreshMessagesList) {
      this.$refs.list.getData(true);
      this.$store.commit('messages/setRefrechMessagesList');
    }
  },
  methods: {
    getLinks(data) {
      return this.$store.dispatch('messages/getLinks', data);
    },
    handleGo(item) {
      let boolean = true;
      if (item.link.receive_id === this.userInfo.id) {
        boolean = this.$store.state.websocket.onSend({ link_id: item.link.id }, 'readed');
        this.$store.commit('messages/setRead', item.link.id);
      }
      if (!boolean) return;
      let params =
        'send_id=' +
        this.userInfo.id +
        '&receive_id=' +
        item.user.id +
        '&link_id=' +
        item.link.id +
        '&type=' +
        item.link.type;
      uni.navigateTo({
        url: `/pages/messages/window/${item.link.type}?` + params
      });
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState('messages', ['links'])
  },
  onReachBottom() {
    this.$nextTick(() => {
      this.$refs.list.handlerUp();
    });
  }
};
</script>

<style></style>
