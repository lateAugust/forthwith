import methods from '@/utils/methods';
const RULES = {
  loginRegister: {
    username: '用户名是必须的',
    password: '密码是必须的',
    confirm_password: '确认密码是必须的'
  }
};

export default function rules(data, rulesKey) {
  let rules = RULES[rulesKey];
  for (let [key, val] of Object.entries(data)) {
    if (rules[key] && !methods.propEmpty(val)) {
      uni.showToast({ title: rules[key], icon: 'none' });
      return false;
    }
  }
  return true;
}
