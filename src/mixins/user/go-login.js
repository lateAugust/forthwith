export default {
  methods: {
    /**
     * 默认登录提示, 用户从未登录过时调用
     * 记得不要在有接口一开始就请求的页面内使用(onLoad/onShow), 因为接口请求会有401登录提示
     */
    goLogin() {
      if (!this.$store.state.token) {
        uni.showModal({
          title: '还未登录',
          content: '是否现在去登录',
          cancelColor: '#085820',
          confirmColor: '#ff0000',
          cancelText: '取消',
          confirmText: '确定',
          success(res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/ucenter/login/login'
              });
            }
          }
        });
        return;
      }
    }
  }
};
