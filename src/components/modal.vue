<template>
  <view class="cu-modal" :class="[value ? 'show' : '']">
    <view class="cu-dialog">
      <view class="cu-bar bg-white justify-end">
        <view class="content">
          {{ title }}
        </view>
        <view class="action" @tap="handleClose">
          <text class="cuIcon-close text-red"></text>
        </view>
      </view>
      <view class="padding-sm text-left" style="height: 150rpx">
        <textarea
          :placeholder="placeholder"
          v-model="textareaValue"
          focus
          auto-height
          confirm-type="send"
          @confirm="handleConfirm"
        ></textarea>
      </view>
      <view class="cu-bar bg-white justify-end">
        <view class="action">
          <button class="cu-btn line-red text-red" @tap="handleClose">取消</button>
          <button class="cu-btn bg-blue margin-left" @tap="handleConfirm">确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '填写附加信息...'
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      textareaValue: this.message
    };
  },
  methods: {
    handleClose() {
      this.$emit('cancel');
      this.$emit('input', false);
    },
    handleConfirm() {
      this.$emit('confirm', this.textareaValue);
      this.$emit('input', false);
    }
  }
};
</script>

<style></style>
