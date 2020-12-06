<template>
  <view @click="handleClick" class="round flex justify-around align-center" :class="'bg-' + color" :style="style">
    <text class="text-xxl text-bold" :class="'cuIcon-' + icon"></text>
  </view>
</template>

<script>
export default {
  props: {
    w: {
      type: String,
      default: '50px'
    },
    h: {
      type: String,
      default: '50px'
    },
    b: {
      type: String,
      default: '25px'
    },
    r: {
      type: String,
      default: '25px'
    },
    color: {
      type: String,
      default: 'blue'
    },
    icon: {
      type: String,
      default: 'add'
    }
  },
  methods: {
    handleClick() {
      this.$emit('go');
    }
  },
  computed: {
    style() {
      return `width: ${this.w};height: ${this.h};bottom:${this.b};right:${this.r};position:fixed;box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);`;
    }
  }
};
</script>

<style></style>
