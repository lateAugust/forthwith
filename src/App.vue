<script>
// import paiUser from '@/api/user';
import Websocket from '@/utils/websocket';

import { mapState } from 'vuex';
export default {
  onLoad() {},
  onLaunch: function () {
    let $store = this.$store;
    // #ifdef H5
    $store.commit('setisH5');
    // #endif
    let websocket = new Websocket({
      url: process.env.VUE_APP_WEBSOCKET_URL,
      onMessage: this.onMessage,
      onError: this.onError,
      onClose: this.onClose
    });
    $store.commit('setWebsocket', websocket);
    $store.dispatch('getStorageUser');
    $store.dispatch('getSystemInfo');
    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
  watch: {
    unreadCount(data) {
      if (isNaN(data) || !data) {
        uni.removeTabBarBadge({ index: 0 });
      } else {
        uni.setTabBarBadge({
          index: 0,
          text: data.toString()
        });
      }
    }
  },
  methods: {
    onMessage({ data }) {
      data = JSON.parse(data);
      console.log(data);
      const $store = this.$store;
      switch (data.type) {
        case 'RejectConnect': {
          this.$store.state.websocket.close(); // 关闭连接
          break;
        }
        case 'NewMessage':
          {
            let key = this.$methods.rankKey([data.send_id, data.receive_id]);
            this.$store.commit('messages/setNewMessagesList', { key, value: data });
            this.$store.commit('messages/setNewMessage', data);
            if (data.send_id === this.userInfo.id) return;
            this.processMessage(data);
          }
          break;
        case 'NewApplyNotification': {
          // 新的申请添加好友通知
          $store.commit('contacter/setCount', ++$store.state.contacter.count);
          break;
        }
        case 'NewFriendNotification': {
          // 好友添加通知, 也要在process-apply里调用了
          this.$store.commit('contacter/setRefreshContactList', true);
          break;
        }
      }
    },
    onError() {
      // console.log(error);
    },
    onClose() {},
    processMessage(data) {
      console.log(data);
      // this.$store.commit('messages/setUnreadCount', 1);
      console.log(this.links);
      let index = this.links.findIndex(
        (item) =>
          (item.link.send_id === data.send_id && item.link.receive_id === data.receive_id) ||
          (item.link.receive_id === data.send_id && item.link.send_id === data.receive_id)
      );
      console.log(index, this.links);
      if (index > -1) {
        // 改变links的顺序
        this.$store.commit('messages/setNewLinksIndex', {
          index,
          data: { message: data.message, update_at: data.update_at } // , send_id: data.send_id, receive_id: data.receive_id
        });
      } else {
        // 刷新列表
        this.$store.commit('messages/setRefrechMessagesList', true);
      }
    }
  },
  computed: {
    ...mapState('messages', ['links', 'unreadCount']),
    ...mapState(['userInfo'])
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '../colorui/main.css';
@import '../colorui/icon.css';
@import 'app.scss';
</style>
