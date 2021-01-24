<template>
  <view>
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input
          :adjust-position="false"
          type="text"
          v-model="keywords"
          placeholder="输入手机、昵称"
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
    <dataList :http="getSearching" :rData="rData" :isShowNonData="isShowNonData" @data="handleList" ref="list">
      <item
        v-for="(bean, index) of list"
        :key="bean.id"
        :bean="bean"
        @go="
          () => {
            handleGo(bean, index);
          }
        "
        @add="
          () => {
            handleAdd(bean, index);
          }
        "
      ></item>
    </dataList>
    <view v-if="show">
      <addContacter v-model="show" :bean="bean" @success="refresh"></addContacter>
    </view>
  </view>
</template>

<script>
import dataList from '@/components/data-list';
import addContacter from '@/components/add-contacter';
import apiContacter from '@/api/contacter';
import rules from '@/asserts/rules';
import item from '../components/item';
export default {
  components: {
    dataList,
    item,
    addContacter
  },
  data() {
    return {
      getSearching: apiContacter.getSearching,
      rData: {},
      keywords: '朵',
      isShowNonData: false,
      list: [],
      show: false,
      bean: {},
      index: -1
    };
  },
  onShow() {
    this.refresh();
  },
  methods: {
    refresh() {
      let refreshList = this.$store.state.contacter.refreshList;
      if (Object.keys(refreshList).length >= 1) {
        let proposer = Object.assign({}, this.bean.proposer || {}, refreshList.proposer);
        let friend = Object.assign({}, this.bean.friend || {}, refreshList.friend);
        this.list.splice(this.index, 1, Object.assign({}, this.bean, { proposer, friend }));
        this.$store.commit('contacter/setRefreshList', {});
      }
    },
    handleSearch() {
      let rData = {
        keywords: this.keywords
      };
      if (!rules(rData, 'contacter')) return;
      this.rData = rData;
      this.isShowNonData = !!this.keywords;
    },
    handleList(data) {
      this.list = data;
    },
    handleClear() {
      this.isShowNonData = false;
      this.keywords = '';
      // this.rData = {};
    },
    handleGo(bean, index) {
      this.index = index;
      this.bean = bean;
      let proposer = bean.proposer;
      if (proposer.target_id === this.$store.state.userInfo.id && proposer.apply_status === 'underReview') {
        uni.navigateTo({
          url: `/pages/contacter/apply/apply-detail?id=${proposer.id}`
        });
        return;
      }
      uni.navigateTo({
        url: `/pages/contacter/searching/searching-detail?id=${bean.user.id}${
          bean.proposer.id ? '&proposer_id=' + bean.proposer.id : ''
        }`
      });
    },
    handleAdd(bean, index) {
      this.bean = bean;
      this.index = index;
      this.show = true;
      // 添加好友
    }
  },
  onReachBottom() {
    this.$nextTick(() => {
      this.$refs.list.handlerDown();
    });
  }
};
</script>
