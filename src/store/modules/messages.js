import apiMessage from '@/api/messages';
import methods from '@/utils/methods';

export default {
  namespaced: true,
  state: {
    messagesList: {},
    newMessagesList: {},
    newMessage: {},
    links: [],
    unreadCount: 0,
    refreshMessagesList: false,
    currentMessages: ''
  },
  actions: {
    getMessages({ state, commit }, data) {
      return new Promise((res, rej) => {
        // let key = methods.sortKey([data.send_id, data.receive_id]);
        let key = JSON.stringify(data);
        let list = state.messagesList[key] || [];
        if (list.length) {
          res({ data: list });
        } else {
          apiMessage
            .getMessages(data)
            .then((result) => {
              commit('setMessagesList', { key, list: result.data });
              res(result);
            })
            .catch((err) => {
              rej(err);
            });
        }
      });
    },
    getLinks({ state, rootState, commit }, data) {
      return new Promise((res, rej) => {
        if (data.page === 1) {
          commit('setLinks', []);
          commit('resetUnreadCount');
        }
        apiMessage
          .getLinks(data)
          .then((result) => {
            commit('setLinks', state.links.concat(result.data));
            commit(
              'setUnreadCount',
              result.data
                .map((item) => (item.link.receive_id === rootState.userInfo.id ? item.link.unread_count : 0))
                .reduce((total, item) => total + item.unread_count)
            );
            res(result);
          })
          .catch((err) => {
            rej(err);
          });
      });
    }
  },
  mutations: {
    setMessagesList(state, data) {
      state.messagesList[data.key] = data.list;
    },
    setLinks(state, list) {
      state.links = list;
    },
    setNewLinksIndex(state, { index, data }) {
      let item = state.links.splice(index, 1)[0];
      item.link.message = data.message;
      console.log(state.currentMessages);
      if (methods.rankKey([data.sned_id, data.receive_id]) !== state.currentMessages) {
        item.link.unread_count += 1;
      }
      console.log(item);
      state.links.splice(0, 0, item);
    },
    setNewMessagesList(state, data) {
      let values = state.newMessagesList[data.key];
      if (!values) {
        state.newMessagesList[data.key] = [];
      }
      state.newMessagesList[data.key].push(data.value);
    },
    setNewMessage(state, data) {
      state.newMessage = data;
    },
    setRefrechMessagesList(state, boolean = false) {
      state.refreshMessagesList = boolean;
    },
    setUnreadCount(state, number) {
      state.unreadCount += number;
    },
    setRead(state, id) {
      let index = state.links.findIndex((item) => item.link.id === +id);
      if (index > -1) {
        let item = state.links[index];
        state.unreadCount -= item.link.unread_count;
        item.link.unread_count = 0;
        state.links.splice(index, 1, item);
      }
    },
    resetUnreadCount(state) {
      state.unreadCount = 0;
    },
    setCurrentMessages(state, key) {
      state.currentMessages = key;
    }
  }
};
