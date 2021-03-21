export default class {
  constructor({ url, protocols, onMessage, onError, onClose }) {
    this.url = url || null;
    this.protocols = protocols || '';
    this.socketTask = null;
    this.websocketStatus = false;
    this.closed = false;
    this.onMessage = onMessage || null;
    this.onError = onError || null;
    this.onClose = onClose || null;
  }

  init(protocols) {
    this.protocols = protocols || '';
    this.connectWebsocket(); // 开始连接
  }

  /**
   * 连接websocket
   */
  connectWebsocket() {
    this.closed = false;
    this.socketTask = uni.connectSocket({
      url: this.url,
      protocols: [this.protocols],
      complete: () => {}
    });
    this.listenerWebsocket();
  }

  /**
   * 关闭websocket
   */
  closeWebsocket() {
    this.socketTask && this.socketTask.close(); // 注意可能在没有socketTask实例是的情况
    this.closed = true;
    this.websocketStatus = false;
  }

  listenerWebsocket() {
    let { socketTask } = this;
    socketTask.onOpen(() => {
      this.websocketStatus = true;
      socketTask.onMessage((data) => {
        if (this.onMessage) {
          this.onMessage(data);
        }
      });
    });

    socketTask.onError((data) => {
      if (this.onError) {
        this.onError(data);
      }
    });

    socketTask.onClose((data) => {
      // 重连 主动关闭不重连
      if (!this.closed) this.connectWebsocket();
      this.websocketStatus = false;
      if (this.onClose) {
        this.onClose(data);
      }
    });
  }

  objectToString(obj) {
    return JSON.stringify(obj);
  }

  /**
   * 发送消息
   * @param {*} data
   * @param {*} type 事件类型
   */
  onSend(data, type = 'message') {
    console.log(data);
    if (this.websocketStatus) {
      let obj = { event: type, data };
      this.socketTask.send({ data: this.objectToString(obj) });
      return true;
    } else {
      uni.showToast({
        title: '聊天室未连接',
        icon: 'error'
      });
    }
  }

  /**
   * 发送已读
   * @param {*} data
   */
  onReaded(data) {
    this.onSend(data, 'reaede');
  }
}
