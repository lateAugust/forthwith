<script>
// import paiUser from '@/api/user';
import Websocket from '@/utils/websocket';
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
  methods: {
    onMessage({ data }) {
      data = JSON.parse(data);
      let key = this.$methods.rankKey([data.send_id, data.receive_id]);
      this.$store.commit('messages/setNewMessagesList', { key, value: data });
      this.$store.commit('messages/setNewMessage', data);
    },
    onError() {
      // console.log(error);
    },
    onClose() {}
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '../colorui/main.css';
@import '../colorui/icon.css';
@import 'app.scss';
</style>
