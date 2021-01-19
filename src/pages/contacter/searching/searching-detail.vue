<template>
  <view>
    <detail :user="bean.user"></detail>
    <view class="margin-top" v-if="proposer.id">
      <view class="cu-form-group align-start">
        <view class="title">附加信息</view>
        <textarea maxlength="-1" disabled v-model="proposer.message" placeholder="--"></textarea>
      </view>
    </view>
    <view v-if="show">
      <addContacter v-model="show" :bean="bean" @success="handleSuccess"></addContacter>
    </view>
    <template v-if="$slots.buttons">
      <slot slot="buttons"></slot>
    </template>
    <template v-else-if="friend.id">
      <buttomButton title="发消息" @save="handleSave"></buttomButton>
    </template>
    <template v-else>
      <buttomButton :title="buttomTitle" @save="handleSave"></buttomButton>
    </template>
  </view>
</template>

<script>
import addContacter from '@/components/add-contacter';
import buttomButton from '@/components/buttom-button';
import detail from '../components/detail';
import apiContacter from '@/api/contacter';
export default {
  components: {
    buttomButton,
    addContacter,
    detail
  },
  data() {
    return {
      bean: { user: {} },
      show: false
    };
  },
  onLoad({ id, proposer_id }) {
    this.getDetail(id, proposer_id || 0);
  },
  methods: {
    getDetail(id, proposer_id) {
      uni.showLoading({ title: '加载中...', mask: true });
      apiContacter
        .getSearchingDetail({ id, proposer_id })
        .then((res) => {
          let data = res.data;
          this.bean = data;
          let { username, nickname } = data.user;
          uni.setNavigationBarTitle({ title: nickname || username });
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    handleSave() {
      this.show = true;
    },
    handleSuccess() {
      setTimeout(() => {
        uni.navigateBack();
      }, 1200);
    }
  },
  computed: {
    user() {
      return this.bean.user || {};
    },
    proposer() {
      return this.bean.proposer || {};
    },
    friend() {
      return this.bean.friend || {};
    },
    buttomTitle() {
      let title = '添加';
      if (this.proposer.id) {
        title = this.proposer.status === 'reject' ? '重新申请' : '修改附加消息';
      }
      return title;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.content {
  font-size: 30rpx;
}
</style>
