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
    getLinks({ state, commit }, data) {
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
              result.data.map((item) => item.link.unread_count).reduce((total, item) => total + item.unread_count)
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
      let item = state.links.splice(index, 1);
      item.message = data.message;
      if (methods.rankKey([data.sned_id, data.receive_id]) === state.currentMessages) {
        item.unreadCount += 1;
        state.unreadCount += 1;
      }
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
      let item = state.links.find((item) => item.id === id);
      if (item) {
        state.unreadCount -= item.unreadCount;
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
