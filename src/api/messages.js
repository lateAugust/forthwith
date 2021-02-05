import http from '@/utils/http';
// function http() {}
export default {
  getMessages(data) {
    return http('/message/list', data);
  },
  getLinks(data) {
    return http('/message/links', data);
  }
};
