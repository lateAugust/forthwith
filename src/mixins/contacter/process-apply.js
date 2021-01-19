import apiContacter from '@/api/contacter';
export default {
  data() {
    return {
      rejectShow: false,
      rejectMessage: ''
    };
  },
  methods: {
    handleApply(status = 'agreement') {
      uni.showLoading({
        title: '处理中...',
        mask: true
      });
      let message = status === 'reject' ? { message: this.rejectMessage } : {};
      apiContacter
        .processAgree(Object.assign({}, this.params, { apply_status: status }, message))
        .then((res) => {
          let store = this.$store;
          store.commit('contacter/setCount', Math.max(store.state.contacter.count - 1, 0));
          // 这里的id可能是朋友id或者当前列表id
          // 在同意后就出现发消息按钮, 拼接上friend_id, 判断主要用apply_status
          let { apply_status, id, friend_id } = res.data;
          if (!apply_status) {
            apply_status = 'agreement';
            friend_id = id;
          }
          store.commit('contacter/setRefreshList', { apply_status, friend_id });
          this.refresh && this.refresh();

          uni.showToast({
            title: res.message,
            icon: 'success',
            mask: true
          });
          // 这里需要处理更新, 是否刷新页面
          if (this.success) {
            setTimeout(() => {
              this.success();
            }, 1200);
          }
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    handleAgree(status = 'agreement') {
      let that = this;
      let user = that.bean.apply_user;
      let name = user.nickname || user.username;
      let type = status === 'agreement' ? '同意' : '拒绝';
      let option = {
        title: type + name,
        content: `确定${name}的${type}申请?`,
        cancelColor: '#085820',
        confirmColor: '#ff0000',
        cancelText: '取消',
        confirmText: '确定'
      };
      uni.showModal({
        ...option,
        success(result) {
          if (result.confirm) {
            that.handleApply();
          }
        }
      });
    },
    handleRejectShow() {
      this.rejectShow = true;
    }
  },
  computed: {
    params() {
      let bean = this.bean;
      return {
        relation_id: bean.apply_id,
        contact_user: bean.target_user,
        relation_user: bean.apply_user,
        contact_id: bean.target_id,
        proposers_id: bean.id
      };
    }
  }
};
