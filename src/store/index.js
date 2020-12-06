import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    userInfo: {},
    token: '',
    isLogin: false
  },
  mutations: {
    login(state, { userInfo, token }) {
      state.userInfo = userInfo;
      state.isLogin = true;
      state.token = token;
      uni.setStorage({ key: 'user', data: { token, userInfo } });
    },
    loginOut(state) {
      state.userInfo = {};
      state.isLogin = false;
      state.token = '';
      uni.removeStorage({ key: 'user' });
    }
  },
  actions: {
    getStorageUser({ commit }) {
      return new Promise((res, rej) => {
        uni.getStorage({
          key: 'user',
          success(result) {
            let { userInfo, token } = result.data;
            if (token) {
              commit('login', { userInfo, token });
              res({ data: userInfo });
            } else {
              rej(null);
            }
          }
        });
      });
    }
  },
  getters: {}
});
