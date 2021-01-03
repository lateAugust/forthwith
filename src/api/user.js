import http from '@/utils/http';
// function http() {}
export default {
  login(data) {
    return http('/users/login', data, 'post');
  },
  register(data) {
    return http('/users/register', data, 'post');
  },
  setUserInfo(data) {
    return http('/users/info', data, 'put');
  }
};
