export default {
  namespaced: true,
  state: {
    applyDetail: {},
    count: 0,
    refreshList: {}
  },
  mutations: {
    setApplyDetail(state, bean) {
      state.applyDetail = bean;
    },
    setCount(state, count) {
      state.count = count;
    },
    setRefreshList(state, data) {
      state.refreshList = data;
    }
  }
};
