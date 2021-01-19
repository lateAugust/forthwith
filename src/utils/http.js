const BASE_URL = process.env.VUE_APP_BASE_URL;
import store from '@/store';

let tasks = {};
let index = 0;

export default function (url, data, method = 'GET') {
  let token = store.state.token;
  return new Promise((resolve, reject) => {
    let tIndex = index;
    let requestTask = uni.request({
      url: `${BASE_URL}${url}`,
      data,
      method: method.toUpperCase(),
      header: {
        Authorization: `Bearer ${token}`
      },
      success(res) {
        let { data } = res;
        Reflect.deleteProperty(tasks, tIndex.toString());
        let status = data.statusCode;
        let isLoggedOn = !!token;
        switch (status) {
          case 401: {
            for (let item of Object.values(tasks)) {
              item.abort();
            }
            tasks = {};
            uni.showModal({
              title: isLoggedOn ? '登录过期' : '还未登录',
              content: '是否现在去登录',
              cancelColor: '#085820',
              confirmColor: '#ff0000',
              cancelText: '取消',
              confirmText: '确定',
              success(res) {
                if (res.confirm) {
                  uni.reLaunch({
                    url: '/pages/ucenter/login/login'
                  });
                }
              }
            });
            break;
          }
          case 400:
            uni.showToast({
              title: data.message,
              icon: 'none'
            });
            reject(data);
            break;
          case 500:
            uni.showToast({
              title: '网络错误, 请重试',
              icon: 'none'
            });
            reject(new Error('500'));
            break;
          case 200:
            resolve(data);
            break;
          default:
            resolve(data);
            break;
        }
      },
      fail() {
        reject(new Error('调用request, api出错, 请重试'));
      }
    });
    tasks[index] = requestTask;
    index++;
  });
}
