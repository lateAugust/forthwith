import moment from 'moment';

moment.locale('zh-cn');
export default function (value, ...rest) {
  if (typeof value == 'undefined') return '';
  const date = value;

  if (moment(date).isValid()) {
    const key = rest.shift();

    if (typeof key === 'string') {
      switch (key) {
        case 'from': {
          value = moment(date).from();
          const otherOpts = rest.shift();

          if (otherOpts && typeof otherOpts === 'object') {
            value = moment(date).startOf(otherOpts.startOf).from();
          }

          break;
        }
        case 'chat': {
          let diff = moment().diff(moment(date));
          if (diff < 1000 * 3600 * 24) {
            value = moment(date).format('HH:mm');
          } else {
            value = moment(date).format('MM-DD');
          }
          break;
        }
        case 'now': {
          let end = moment();
          let start = moment(date);
          return end.diff(start, 'days') + '天';
        }
        case 'simple': {
          value = moment(date).format('MM-DD HH:mm');
          break;
        }
        default: {
          value = moment(date).format(key);
        }
      }
    }
  }

  return value;
}
