<template>
  <view class="cu-modal" :class="[value ? 'show' : '']">
    <view class="cu-dialog">
      <view class="cu-bar bg-white justify-end">
        <view class="content">
          {{ title }}-
          <text class="text-bold">{{ bean.user.username }}</text>
        </view>
        <view class="action" @tap="handleClose">
          <text class="cuIcon-close text-red"></text>
        </view>
      </view>
      <view class="padding-sm text-left" style="height: 150rpx">
        <textarea
          placeholder="填写附加信息..."
          v-model="formBean.message"
          focus
          auto-height
          confirm-type="send"
          @confirm="handleCreate"
        ></textarea>
      </view>
      <view class="cu-bar bg-white justify-end">
        <view class="action">
          <button class="cu-btn line-red text-red" @tap="handleClose">取消</button>
          <button class="cu-btn bg-blue margin-left" @tap="handleCreate">确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import apiContacter from '@/api/contacter';
export default {
  data() {
    const userInfo = this.$store.state.userInfo;
    const { user, proposer } = this.bean;
    let formBean = {
      apply_id: userInfo.id,
      target_id: user.id,
      message: proposer.message,
      apply_status: 'underReview',
      proposers_id: proposer.id,
      apply_user: {
        nickname: userInfo.nickname,
        username: userInfo.username,
        pin_yin: userInfo.pin_yin,
        gender: userInfo.gender,
        age: userInfo.age,
        id: userInfo.id,
        avatar: userInfo.avatar
      },
      is_review: proposer.apply_status || '',
      target_user: {
        nickname: user.nickname,
        username: user.username,
        pin_yin: user.pin_yin,
        age: user.age,
        gender: user.gender,
        id: user.id,
        avatar: user.avatar
      }
    };
    return {
      formBean
    };
  },
  props: {
    value: {
      type: Boolean
    },
    bean: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCreate() {
      uni.showLoading({
        title: '发送中...',
        mask: true
      });
      apiContacter
        .createApply(this.formBean)
        .then((res) => {
          uni.showToast({
            title: res.message,
            icon: 'success',
            mask: true
          });
          let { apply_status, id, message, target_id } = res.data;
          this.$store.commit('contacter/setRefreshList', { proposer: { apply_status, id, message, target_id } });
          this.$emit('success');
          this.handleClose();
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    handleClose() {
      this.formBean.message = '';
      this.$emit('input', false);
    }
  },
  computed: {
    title() {
      let title = '添加';
      let is_review = this.formBean.is_review;
      if (is_review === 'reject') {
        title = '重新添加';
      } else if (is_review === 'underReview') {
        title = '修改';
      }
      return title;
    }
  }
};
</script>
