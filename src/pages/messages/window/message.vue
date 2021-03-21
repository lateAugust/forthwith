<template>
  <view class="cu-chat">
    <!-- dispatch="messages/getMessages" -->
    <dataList
      id="list"
      :http="getMessages"
      :rData="rData"
      :isShowNonData="false"
      ref="list"
      :listenersRdata="false"
      :upOrDown="false"
      @data="handleData"
    >
      <block v-for="item of list" :key="item.id">
        <!-- 我(右边)-->
        <!-- <view class="date">13:23</view> -->
        <view v-if="item.send_id === sendId" class="cu-item self">
          <view class="main">
            <view class="cuIcon-loading padding-sm rotate" v-if="!item.id && !item.message_id"></view>
            <view class="content bg-green shadow">
              <text>{{ item.message }}</text>
            </view>
          </view>
          <avatar :url="userInfo.avatar" :isSquare="true" :name="userInfo.nickname || userInfo.username"></avatar>
          <view class="date">{{ item.update_at | moment('chat') }}</view>
        </view>
        <!-- 对方(左边) -->
        <view v-else class="cu-item">
          <avatar
            :url="receiveUser.avatar"
            :isSquare="true"
            :name="receiveUser.nickname || receiveUser.username"
          ></avatar>
          <view class="main">
            <view class="shadow content">
              <text>{{ item.message }}</text>
            </view>
          </view>
          <view class="date">{{ item.update_at | moment('chat') }}</view>
        </view>
      </block>
    </dataList>
    <view style="height: 100rpx"></view>
    <view class="cu-bar foot input" :style="[{ bottom: InputBottom + 'px' }]">
      <!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
      <input
        class="solid-bottom"
        :adjust-position="false"
        :focus="false"
        maxlength="300"
        cursor-spacing="10"
        @focus="InputFocus"
        @blur="InputBlur"
        @confirm="handleSend"
        confirm-type="send"
        v-model="content"
      />
      <!-- <view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
      <button class="cu-btn bg-green shadow" @click="handleSend">发送</button>
    </view>
  </view>
</template>

<script>
import avatar from '@/components/avatar';
import dataList from '@/components/data-list';

import apiUser from '@/api/user';
// import apiMessages from '@/api/messages';

import { mapState } from 'vuex';
export default {
  components: {
    avatar,
    dataList
  },
  data() {
    const state = this.$store.state;
    return {
      oldList: [
        /* { id: 2, send_id: 2, username: '方朵朵' },
        { id: 1, send_id: 1, username: '张子枫' } */
      ],
      list: [],
      InputBottom: 0,
      receiveId: null,
      sendId: null,
      linkId: null,
      type: '',
      receiveUser: {},
      listHegith: 0,
      scrollTop: 0,
      rData: {},
      content: '',
      dpi: state.dpi
    };
  },
  onUnload() {
    this.$store.state.websocket.onSend({ link_id: this.linkId }, 'readed');
    this.$store.commit('messages/setRead', this.linkId);
  },
  onLoad({ receive_id, send_id, type, link_id }) {
    this.$store.commit('messages/setCurrentMessages', this.$methods.rankKey([receive_id, send_id]));
    this.$store.commit('messages/setRead', link_id);
    this.receiveId = +receive_id;
    this.sendId = +send_id;
    this.linkId = +link_id;
    this.type = type;
    // let { nickname, username } = this.receiveUser;
    // uni.setNavigationBarTitle({ title: nickname || username });
    this.getUserInfo();
    this.rData = {
      receive_id,
      send_id,
      type
    };
    this.$nextTick(() => {
      this.$refs.list.getData(true);
      this.watchList();
    });
  },
  onPullDownRefresh() {
    this.$nextTick(() => {
      this.rData.message_id = this.list[0].id;
      this.$refs.list.handlerDown();
      this.scrollTop = 0;
      this.watchList();
    });
  },
  watch: {
    '$store.state.messages.newMessage': {
      handler(data) {
        if (data.type !== 'NewMessage') return;
        if (data.send_id === this.userInfo.id) {
          this.scrollTop = 1000000000000000000000000;
          this.watchList(false);
        }
        this.getList();
      },
      deep: true
    }
  },
  methods: {
    handleData(list) {
      this.oldList = list;
      this.getList();
    },
    InputFocus(e) {
      this.InputBottom = e.detail.height;
    },
    getList() {
      console.log(this.$store.state.messages.newMessagesList);
      let message = this.$store.state.messages.newMessagesList[this.rankKey] || [];
      this.list = [...this.oldList.reverse(), ...message];
      // console.log(this.list.map((item) => item.id));
    },
    getUserInfo() {
      apiUser.getUserInfo(this.receiveId).then((res) => {
        let data = res.data;
        this.receiveUser = data;
        let { nickname, username } = data;
        uni.setNavigationBarTitle({ title: nickname || username });
      });
    },
    async selectList() {
      if (this.scrollTop === 1000000000000000000000000) {
        this.setScrollTop();
        return;
      }
      const that = this;
      let data = await this.getListWidth();
      let diff = data.height - that.listHegith;
      that.listHegith = data.height;
      // scrollTop = scrollTop > state.systemInfo.screenHeight - 188 * dpi ? scrollTop - dpi * 196 : 0;
      this.scrollTop = diff - this.dpi * 196;
      this.setScrollTop();
    },
    async watchList() {
      let unwatch = this.$watch('list', () => {
        this.$nextTick(() => {
          this.selectList();
          unwatch();
        });
      });
    },
    setScrollTop() {
      uni.pageScrollTo({
        scrollTop: this.scrollTop,
        duration: 50
      });
    },
    getListWidth() {
      return this.$methods.getElement('#list');
    },
    getMessages(data) {
      return this.$store.dispatch('messages/getMessages', data);
    },
    InputBlur() {
      this.InputBottom = 0;
    },
    handleSend() {
      if (this.content.trim()) {
        this.$store.state.websocket.onSend({
          send_id: this.sendId,
          receive_id: this.receiveId,
          message: this.content
        });
        this.content = '';
      } else {
        uni.showToast({
          title: '不能发送空消息',
          icon: 'error',
          mask: true
        });
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    rankKey() {
      return this.$methods.rankKey([this.sendId, this.receiveId]);
    }
  }
};
</script>

<style scoped>
.rotate {
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
