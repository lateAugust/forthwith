<template>
  <view>
    <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
      <view
        v-for="(item, index) in tabs"
        :key="index"
        :class="index == tabIndex ? 'text-blue cur' : ''"
        @tap="handleTab(index, item)"
        class="cu-item"
      >
        {{ item.title }}
      </view>
    </scroll-view>
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input
          :adjust-position="false"
          type="text"
          v-model="keywords"
          placeholder="输入手机、昵称、用户名"
          confirm-type="search"
          @confirm="handleSearch"
          maxlength="11"
        />
        <text class="cuIcon-close" @click="handleClear"></text>
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round" @click="handleSearch">搜索</button>
      </view>
    </view>
    <dataList :http="getApplyList" :rData="rData" @data="handleList" ref="list">
      <item
        v-for="(bean, index) of list"
        :key="bean.id"
        :bean="{ user: bean.user }"
        @go="
          () => {
            handleGo(bean, index);
          }
        "
      >
        <view slot="buttons">
          <button
            class="cu-btn bg-blue block margin-bottom-xs"
            @tap.stop="handleStatus('handleAgree', bean)"
            v-if="bean.apply_status === 'reject'"
            disabled
          >
            已拒绝
          </button>
          <button
            class="cu-btn bg-blue block margin-bottom-xs"
            @tap.stop="handleStatus('handleAgree', bean)"
            v-else-if="bean.apply_status === 'agreement'"
          >
            发消息
          </button>
          <template v-else>
            <button class="cu-btn bg-blue sm block margin-bottom-xs" @tap.stop="handleStatus('handleAgree', bean)">
              同意
            </button>
            <button class="cu-btn bg-red sm block" @tap.stop="handleStatus('handleRejectShow', bean)">拒绝</button>
          </template>
        </view>
      </item>
    </dataList>
    <modal
      v-model="rejectShow"
      :title="'拒绝'"
      placeholder="填写拒绝理由..."
      @confirm="
        () => {
          handleApply('reject');
        }
      "
    ></modal>
  </view>
</template>

<script>
import apiContacter from '@/api/contacter';
import dataList from '@/components/data-list';
import item from '../components/item';
import modal from '@/components/modal';

import contacterMixins from '@/mixins/contacter/process-apply';
export default {
  mixins: [contacterMixins],
  components: {
    dataList,
    item,
    modal
  },
  data() {
    return {
      getApplyList: apiContacter.getApplyList,
      keywords: '',
      rData: {},
      list: [],
      bean: {},
      index: -1,
      tabs: [
        { type: 'underReview', title: '未处理' },
        { type: 'agreement', title: '已同意' },
        { type: 'reject', title: '已拒绝' }
      ],
      scrollLeft: 0,
      tabIndex: 0,
      type: ''
    };
  },
  onLoad() {
    this.$nextTick(() => {
      this.$refs.list.getData();
    });
  },
  onShow() {
    this.refresh();
  },
  methods: {
    handleSearch() {
      let { type, keywords } = this;
      this.rData = { type, keywords };
    },
    handleClear() {
      this.keywords = '';
      // this.handleTab(0, { type: 'underReview' });
      this.rData = { type: this.type };
    },
    handleTab(index, { type }) {
      this.type = type;
      this.tabIndex = index;
      this.scrollLeft = (index - 1) * 60;
      this.keywords = '';
      this.handleSearch();
    },
    refresh() {
      let refreshList = this.$store.state.contacter.refreshList;
      if (Object.keys(refreshList).length >= 1) {
        this.list.splice(this.index, 1, Object.assign({}, this.bean, refreshList));
        this.$store.commit('contacter/setRefreshList', {});
      }
    },
    handleStatus(type, bean) {
      this.bean = bean;
      this[type]();
    },
    handleList(data) {
      this.list = data;
    },
    handleGo(bean, index) {
      this.index = index;
      this.$store.commit('contacter/setApplyDetail', bean);
      this.bean = bean;
      uni.navigateTo({
        url: `/pages/contacter/apply/apply-detail?id=${bean.proposer.id}`
      });
    },
    handleSwiperChange() {
      console.log(223);
    }
  },
  onReachBottom() {
    this.$nextTick(() => {
      this.$refs.list.handlerDown();
    });
  }
};
</script>

<style></style>
