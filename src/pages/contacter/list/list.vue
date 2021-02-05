<template>
  <view>
    <view class="cu-form-group" @click="handleGo">
      <view class="title">添加好友</view>
      <!-- <input placeholder="统一标题的宽度" name="input" /> -->
      <view class="show-arrow flex-sub"></view>
    </view>
    <view class="cu-form-group" @click="handleApply">
      <view class="title">验证信息</view>
      <!-- <input placeholder="统一标题的宽度" name="input" /> -->
      <view class="show-arrow flex-sub">
        <view class="cu-tag bg-red sm radius" v-if="count">{{ count }}</view>
      </view>
    </view>
    <scroll-view
      scroll-y
      class="indexes"
      :scroll-into-view="'indexes-' + listCurID"
      :style="[{ height: scrollViewHeight }]"
      :scroll-with-animation="true"
      :enable-back-to-top="true"
    >
      <block v-for="(item, index) in filterIndexes" :key="index">
        <view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
          <view class="padding">{{ item.name }}</view>
          <view class="cu-list menu-avatar no-padding">
            <view
              class="cu-item padding-left"
              style="justify-content: flex-start"
              v-for="(items, sub) in item.subs"
              :key="sub"
              @click="handleDetail(items)"
            >
              <avatar :name="items.user.nickname || items.user.username"></avatar>
              <view class="content">
                <view class="text-grey">
                  {{ items.user.nickname || items.user.username }}
                  <!-- <text class="text-abc">{{ indexes[sub].name }}</text> -->
                  <!-- 君 -->
                </view>
                <!-- <view class="text-gray text-sm">有{{ sub + 2 }}个主子需要伺候</view> -->
              </view>
            </view>
          </view>
        </view>
      </block>
    </scroll-view>
    <view class="indexBar" :style="[{ height: 'calc(100vh - ' + CustomBar + 'px - 50px)' }]">
      <view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
        <view
          class="indexBar-item"
          v-for="(item, index) in indexes"
          :key="index"
          :id="index"
          @touchstart="getCur"
          @touchend="setCur"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view v-show="!hidden" class="indexToast">
      {{ listCur }}
    </view>
  </view>
</template>

<script>
import goLoginMixins from '@/mixins/user/go-login';
import apiContacter from '@/api/contacter';
import avatar from '@/components/avatar';

import { mapState } from 'vuex';
export default {
  mixins: [goLoginMixins],
  components: {
    avatar
  },
  data() {
    return {
      indexes: [],
      hidden: true,
      listCurID: '',
      listCur: '',
      CustomBar: 0
    };
  },
  onShow() {
    this.goLogin();
    if (this.$store.state.contacter.refreshContactList) {
      this.getFriendsList();
      this.$store.commit('contacter/setRefreshContactList');
    }
  },
  onLoad() {
    this.getApplyCount();
    this.getFriendsList();
    // this.getIndexes();
  },
  onReady() {
    const that = this;
    uni
      .createSelectorQuery()
      .select('.indexBar-box')
      .boundingClientRect(function (res) {
        that.boxTop = res.top;
      })
      .exec();
    uni
      .createSelectorQuery()
      .select('.indexes')
      .boundingClientRect(function (res) {
        that.barTop = res.top;
      })
      .exec();
  },
  methods: {
    handleGo() {
      uni.navigateTo({
        url: '/pages/contacter/searching/searching'
      });
    },
    handleDetail(item) {
      uni.navigateTo({ url: `/pages/contacter/list/list-detail?friend_id=${item.friend.id}&user_id=${item.user.id}` });
    },
    tEnd() {
      this.hidden = true;
      this.listCurID = this.listCur;
    },
    tMove(e) {
      let y = e.touches[0].clientY,
        offsettop = this.boxTop,
        that = this;
      //判断选择区域,只有在选择区才会生效
      if (y > offsettop) {
        let num = parseInt((y - offsettop) / 20);
        let name = that.indexes[num] ? that.indexes[num].name : '';
        if (name) this.listCur = name;
      }
    },
    tStart() {
      this.hidden = false;
    },
    getCur(e) {
      this.hidden = false;
      this.listCur = this.indexes[e.target.id].name;
    },
    setCur() {
      this.hidden = true;
    },
    getIndexes(list) {
      let indexes = [];
      let emptyIndex = list.findIndex((item) => /[a-z]/gi.test(item.user.pin_yin.substr(0, 1)));
      let emptyList = [];
      let index = 0;
      if (emptyIndex > -1) {
        emptyList = list.splice(0, emptyIndex);
      }
      for (let i = 0; i < 26; i++) {
        indexes[i] = {
          subs: []
        };
        let name = String.fromCharCode(65 + i);
        indexes[i].name = name;
        let item = list[index];
        let isNext = true;
        while (isNext && item && this.hasSort(name, list[index])) {
          indexes[i].subs.push(item);
          isNext = this.hasSort(name, item);
          index++;
          item = list[index];
        }
      }
      indexes.push({ name: '#', subs: emptyList });
      this.indexes = indexes;
      this.listCur = indexes[0];
    },
    hasSort(name, item) {
      let reg = new RegExp(name, 'i');
      return reg.test(item.user.pin_yin.substr(0, 1));
    },
    handleApply() {
      uni.navigateTo({
        url: '/pages/contacter/apply/list'
      });
    },
    getApplyCount() {
      apiContacter.getApplyCount().then((res) => {
        this.$store.commit('contacter/setCount', res.data.count);
      });
    },
    getFriendsList() {
      uni.showLoading({ message: '加载中...', mask: true });
      apiContacter
        .friendsList()
        .then((res) => {
          let list = res.data;
          this.getIndexes(list);
        })
        .finally(() => {
          uni.hideLoading();
        });
    }
  },
  computed: {
    ...mapState(['userInfo']),
    count() {
      return this.$store.state.contacter.count || 0;
    },
    filterIndexes() {
      return this.indexes.filter((item) => item.subs.length);
    },
    scrollViewHeight() {
      let { isH5, dpi } = this.$store.state;
      return '100vh -' + ((isH5 ? 88 : 0) + 100 * 3) * dpi + 'px';
    }
  }
};
</script>

<style scoped>
.indexes {
  position: relative;
}

.indexBar {
  position: fixed;
  right: 0px;
  bottom: 0px;
  padding: 20upx 20upx 20upx 60upx;
  display: flex;
  align-items: center;
}

.indexBar .indexBar-box {
  width: 40upx;
  height: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
  border-radius: 10upx;
}

.indexBar-item {
  flex: 1;
  width: 40upx;
  height: 40upx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24upx;
  color: #888;
}

movable-view.indexBar-item {
  width: 40upx;
  height: 40upx;
  z-index: 9;
  position: relative;
}

movable-view.indexBar-item::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 10upx;
  height: 20upx;
  width: 4upx;
  background-color: #f37b1d;
}

.indexToast {
  position: fixed;
  top: 0;
  right: 80upx;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100upx;
  height: 100upx;
  border-radius: 10upx;
  margin: auto;
  color: #fff;
  line-height: 100upx;
  text-align: center;
  font-size: 48upx;
}
</style>
