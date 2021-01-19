import Vuex from 'vuex';
import Vue from 'vue';

import contacter from './modules/contacter';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { contacter },
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
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      uni.setStorage({ key: 'user', data: { token: state.token, userInfo } });
    },
    logOut(state) {
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
