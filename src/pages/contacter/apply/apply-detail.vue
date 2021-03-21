<template>
  <view>
    <detail :user="bean.user"></detail>
    <view class="margin-top">
      <view class="cu-form-group align-start">
        <view class="title">附加信息</view>
        <textarea maxlength="-1" disabled v-model="bean.proposer.message" placeholder="--"></textarea>
      </view>
    </view>
    <doubleButtons
      :leftButton="leftButton"
      :rightButton="rightButton"
      v-if="bean.proposer.apply_status === 'underReview'"
      @left="handleRejectShow"
      @right="
        () => {
          handleAgree();
        }
      "
    ></doubleButtons>
    <save v-else-if="bean.proposer.apply_status === 'reject'" disabled title="已拒绝"></save>
    <save v-else title="发消息"></save>
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
import detail from '../components/detail';
import doubleButtons from '@/components/double-buttons';
import modal from '@/components/modal';
import save from '@/components/buttom-button';

import contacterMixins from '@/mixins/contacter/process-apply';

import apiContacter from '@/api/contacter';
export default {
  mixins: [contacterMixins],
  components: {
    detail,
    doubleButtons,
    modal,
    save
  },
  data() {
    return {
      bean: {
        user: {},
        proposer: {}
      },
      userInfo: this.$store.state.userInfo,
      leftButton: {
        title: '拒绝'
      },
      rightButton: {
        title: '同意'
      }
    };
  },
  onLoad({ id }) {
    this.getDetail(id);
  },
  computed: {
    title() {
      let user = this.bean.apply_user;
      return user.nickname || user.username;
    }
  },
  methods: {
    getDetail(id) {
      uni.showLoading({ title: '加载中...', mask: true });
      apiContacter
        .getApplyListDetail(id)
        .then((res) => {
          this.bean = res.data;
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    success() {
      uni.navigateBack();
    }
  }
};
</script>

<style></style>
