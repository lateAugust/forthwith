import apiMessage from '@/api/messages';

export default {
  namespaced: true,
  state: {
    messagesList: {},
    newMessagesList: {},
    newMessage: {}
  },
  actions: {
    getMessages({ state, commit }, data) {
      return new Promise((res, rej) => {
        // let key = methods.sortKey([data.send_id, data.receive_id]);
        let key = JSON.stringify(data);
        let current = state.messagesList[key] || {};
        let list = current[key] || [];
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
    }
  },
  mutations: {
    setMessagesList(state, data) {
      state.messagesList[data.key] = data.list;
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
    }
  }
};
