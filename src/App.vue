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
    '$store.state.messages.unreadCount': {
      handler(data) {
        if (data > 0) {
          uni.setTabBarBadge({
            index: 0,
            text: data.toString()
          });
        } else {
          uni.removeTabBarBadge({ index: 0 });
        }
      },
      deep: true
    }
  },
  methods: {
    onMessage({ data }) {
      data = JSON.parse(data);
      switch (data.type) {
        case 'notification':
          {
            this.$store.commit('conctacter/setRefreshContactList', true);
          }
          break;
        case 'message':
          {
            let key = this.$methods.rankKey([data.send_id, data.receive_id]);
            this.$store.commit('messages/setNewMessagesList', { key, value: data });
            this.$store.commit('messages/setNewMessage', data);
            this.processMessage(data);
          }
          break;
      }
    },
    onError() {
      // console.log(error);
    },
    onClose() {},
    processMessage(data) {
      this.$store.commit('messages/setUnreadCount', 1);
      let index = this.links.findIndex((item) => item.link.receive_id === this.userInfo.id);
      if (index > -1) {
        // 改变links的顺序
        this.$store.commit('messages/setNewLinksIndex', { data, index });
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
