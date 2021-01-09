<template>
  <view>
    <userInfoBasically :userInfo="user" :showArrow="false"></userInfoBasically>
    <view class="margin-top">
      <view class="cu-form-group">
        <view class="title">用户名</view>
        <view class="content">{{ user.username }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">昵称</view>
        <view class="content">{{ user.username || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">年龄</view>
        <view class="content">{{ user.age || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <view class="content">{{ user.gender || '--' }}</view>
      </view>
    </view>
    <view class="margin-top">
      <view class="cu-form-group">
        <view class="title">手机</view>
        <view class="content">{{ user.mobile || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">email</view>
        <view class="content">{{ user.email || '--' }}</view>
      </view>
      <view class="cu-form-group">
        <view class="title">地址</view>
        <view class="content">{{ user.address || '' }}</view>
      </view>
    </view>
    <view class="margin-top">
      <view class="cu-form-group align-start">
        <view class="title">附加信息</view>
        <textarea maxlength="-1" disabled v-model="proposer.message" placeholder="--"></textarea>
      </view>
    </view>
    <view v-if="show">
      <addContacter v-model="show" :bean="bean" @success="handleSuccess"></addContacter>
    </view>
    <buttomButton :title="proposer.id ? '修改附加信息' : '添加'" @save="handleSave"></buttomButton>
  </view>
</template>

<script>
import userInfoBasically from '@/components/userinfo-basically';
import addContacter from '@/components/add-contacter';
import buttomButton from '@/components/buttom-button';
import apiContacter from '@/api/contacter';
export default {
  components: {
    userInfoBasically,
    buttomButton,
    addContacter
  },
  data() {
    return {
      bean: { user: {} },
      show: false
    };
  },
  onLoad({ id, proposer_id }) {
    this.getDetail(id, proposer_id);
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
