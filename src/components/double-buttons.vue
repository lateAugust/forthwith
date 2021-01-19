<template>
  <view>
    <view style="height: 104upx"></view>
    <view class="cu-bar foot padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm bg-white">
      <button class="cu-btn response margin-right-sm" :class="[leftButton.bgColor || 'bg-red']" @click="handleleft">
        <text class="cuIcon-loading2 cuIconfont-spin margin-right-xs" v-if="leftButton.loading || false"></text>
        {{ leftButton.title || '取消' }}
      </button>
      <button class="cu-btn response" :class="[rightButton.bgColor || 'bg-blue']" @click="handleRight">
        <text class="cuIcon-loading2 cuIconfont-spin margin-right-xs" v-if="rightButton.loading || false"></text>
        {{ rightButton.title || '保存' }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    leftButton: {
      type: Object,
      default: () => ({
        bgColor: 'bg-red',
        title: '取消',
        loading: false
      })
    },
    rightButton: {
      type: Object,
      default: () => ({
        bgColor: 'bg-blue',
        title: '保存',
        loading: false
      })
    }
  },
  methods: {
    handleleft() {
      if (this.leftButton.loading) {
        return;
      }
      this.$emit('left');
    },
    handleRight() {
      if (this.rightButton.loading) {
        return;
      }
      this.$emit('right');
    }
  }
};
</script>

<style scoped lang="scss">
.foot {
  z-index: 10;
}
</style>
