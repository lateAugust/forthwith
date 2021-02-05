<template>
  <view class="cu-chat">
    <dataList
      id="list"
      :http="getMessages"
      :rData="rData"
      ref="list"
      :listenersRdata="false"
      :upOrDown="false"
      @data="handleData"
    >
      <block v-for="item of list" :key="item.id">
        <view class="cu-item">
          <avatar :isSquare="true" name="好友验证"></avatar>
          <view class="main">
            <view class="content bg-green shadow flex-direction">
              <text>{{ item.message }}</text>
              <button class="cu-btn sm bg-blue self-start margin-top-sm" @click="handleGo(item)">发消息</button>
            </view>
          </view>
          <view class="date">{{ item.update_at | moment('chat') }}</view>
        </view>
      </block>
    </dataList>
  </view>
</template>

<script>
import avatar from '@/components/avatar';
import dataList from '@/components/data-list';
export default {
  components: {
    avatar,
    dataList
  },
  data() {
    const state = this.$store.state;
    return {
      oldList: [],
      list: [],
      receiveId: null,
      sendId: null,
      linkId: null,
      type: '',
      receiveUser: {},
      rData: {},
      dpi: state.dpi
    };
  },
  onUnload() {
    this.$store.websocket.onSend({ link_id: this.linkId });
  },
  onLoad({ receive_id, send_id, type, link_id }) {
    this.$$store.commit('messages/setCurrentMessages', this.$methods.rankKey([receive_id, send_id]));
    this.$store.commit('message/setRead', link_id);
    this.receiveId = +receive_id;
    this.sendId = +send_id;
    this.linkId = +link_id;
    this.type = type;
    // let { nickname, username } = this.receiveUser;
    // uni.setNavigationBarTitle({ title: nickname || username });
    // this.getUserInfo();
    this.rData = {
      receive_id,
      send_id,
      type
    };
    this.$nextTick(() => {
      this.$refs.list.getData(true);
      this.watchList();
    });
  },
  onPullDownRefresh() {
    this.$nextTick(() => {
      this.rData.message_id = this.list[0].id;
      this.$refs.list.handlerDown();
      this.scrollTop = 0;
      this.watchList();
    });
  },
  watch: {
    '$store.state.messages.newMessage': {
      handler(data) {
        if (data.type !== 'notification') return;
        this.linkId = data.link_id;
        if (data.send_id === this.userInfo.id) {
          this.scrollTop = 1000000000000000000000000;
          this.watchList(false);
        }
        this.getList();
      },
      deep: true
    }
  },
  methods: {
    handleData(list) {
      this.oldList = list;
      this.getList();
    },
    handleGo(item) {
      uni.navigateTo({
        url: `/pages/messages/window/message?receive_id=${item.send_id}&send_id=${this.$store.state.userInfo.id}`
      });
    },
    getList() {
      let message = this.$store.state.messages.newMessagesList[this.rankKey] || [];
      this.list = [...this.oldList.reverse(), ...message];
      // console.log(this.list.map((item) => item.id));
    },
    getListWidth() {
      return this.$methods.getElement('#list');
    },
    getMessages(data) {
      return this.$store.dispatch('messages/getMessages', data);
    },
    setScrollTop() {
      uni.pageScrollTo({
        scrollTop: this.scrollTop,
        duration: 50
      });
    },
    async watchList() {
      let unwatch = this.$watch('list', () => {
        this.$nextTick(() => {
          this.selectList();
          unwatch();
        });
      });
    },
    async selectList() {
      if (this.scrollTop === 1000000000000000000000000) {
        this.setScrollTop();
        return;
      }
      const that = this;
      let data = await this.getListWidth();
      let diff = data.height - that.listHegith;
      that.listHegith = data.height;
      // scrollTop = scrollTop > state.systemInfo.screenHeight - 188 * dpi ? scrollTop - dpi * 196 : 0;
      this.scrollTop = diff - this.dpi * 196;
      this.setScrollTop();
    }
  }
};
</script>

<style></style>
