<script>
// import paiUser from '@/api/user';
export default {
  onLoad() {},
  onLaunch: function () {
    let $store = this.$store;
    // ifdef H5
    $store.commit('setisH5');
    // #endif
    $store.dispatch('getStorageUser');
    $store.dispatch('getSystemInfo');
    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '../colorui/main.css';
@import '../colorui/icon.css';
@import 'app.scss';
</style>
