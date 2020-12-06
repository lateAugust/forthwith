function propEmpty(val) {
  return (
    /(number|boolean)/gi.test(typeof val) ||
    (!/\[object (undefined|null)]/gi.test(Object.prototype.toString.call(val)) && !!val)
  );
}

function _makePhoneCall(number) {
  uni.makePhoneCall({
    phoneNumber: number,
    fail() {
      uni.showToast({
        title: '拨打电话失败, 请重试...',
        icon: 'none'
      });
    }
  });
}

function makePhoneCall(number, isIOS = true) {
  if (isIOS) {
    _makePhoneCall(number);
  } else {
    uni.showActionSheet({
      itemList: ['拨打电话'],
      success(res) {
        if (res.tapIndex === 0) {
          _makePhoneCall(number);
        }
      }
    });
  }
}

function overKill(v) {
  let obj = {};
  for (let item of v) {
    obj[item] = obj[item] === undefined ? -1 : obj[item];
    obj[item]++;
  }
  let b = [];
  for (let [key, val] of Object.entries(obj)) if (!val) b.push(Number(key));
  return b;
}

function isPhone(v) {
  return v && /^1[\d]{10}$/.test(v);
}

const dataType = {
  '[object String]': 'string',
  '[object Number]': 'number',
  '[object Boolean]': 'boolean',
  '[object Symbol]': 'Symbol',
  '[object Undefined]': 'undefined',
  '[object Null]': 'null',
  '[object Function]': 'function',
  '[object Date]': 'date',
  '[object Array]': 'array',
  '[object RegExp]': 'regexp',
  '[object Object]': 'object',
  '[object Error]': 'error',
  '[object HTMLDocument]': 'htmlDocument',
  '[object Window]': 'window'
};
function typeOf(v) {
  return dataType[Object.prototype.toString.call(v)];
}

export default {
  propEmpty,
  makePhoneCall,
  overKill,
  typeOf,
  isPhone
};
