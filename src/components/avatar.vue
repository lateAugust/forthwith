<template>
  <view>
    <view class="cu-avatar" :class="[isSquare ? 'radius' : 'round', isSmall ? 'small' : 'lg']" v-if="url">
      <img style="width: 100%; height: 100%" class="round" :src="url" alt="" />
    </view>
    <view class="cu-avatar lg" :class="[isSquare ? 'radius' : 'round', bgColor]" v-else-if="name">
      <text class="avatar-text" style="overflow: hidden">{{ name.substring(quantity[0], quantity[1]) }}</text>
      <!-- <view class="cu-tag badge bg-pink">30%</view> -->
    </view>
  </view>
</template>

<script>
export default {
  props: {
    name: String,
    url: String,
    isSquare: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: 'bg-blue'
    },
    quantity: {
      type: Array,
      default: () => [0, 3]
    }
  }
};
</script>

<style></style>
