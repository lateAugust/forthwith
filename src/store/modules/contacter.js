export default {
  namespaced: true,
  state: {
    applyDetail: {},
    count: 0,
    refreshList: {},
    refreshContactList: false
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
    },
    setRefreshContactList(state, boolean = false) {
      state.refreshContactList = boolean;
    }
  }
};
