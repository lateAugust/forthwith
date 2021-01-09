<template>
  <view class="cu-modal" :class="[value ? 'show' : '']">
    <view class="cu-dialog">
      <view class="cu-bar bg-white justify-end">
        <view class="content">
          添加-
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
        gender: userInfo.gender,
        age: userInfo.age,
        id: userInfo.id
      },
      target_user: {
        nickname: user.nickname,
        username: user.username,
        age: user.age,
        gender: user.gender,
        id: user.id
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
  }
};
</script>
