<template>
  <view :class="{ wrap }" @tap="hideButtons">
    <view
      @click.stop="handleClick"
      class="round flex justify-around align-center z-index"
      :class="['bg-' + color, wrap ? 'box-shadow' : '']"
      :style="style"
    >
      <text class="text-xxl text-bold" :class="'cuIcon-' + icon"></text>
    </view>
    <view
      @click.stop="handleButton(item)"
      class="round flex justify-around align-center transition position-relative"
      :class="['bg-' + (item.color || color), 'transform' + (wrap ? index + ' box-shadow' : '222')]"
      :style="style"
      v-for="(item, index) of buttons"
      :key="index"
    >
      <view class="text-xxl text-bold" :class="'cuIcon-' + item.icon">{{ item.name }}</view>
      <view
        class="content shadow position-absolute transition1 card"
        :class="['bg-' + item.color]"
        v-if="wrap && item.explain"
      >
        {{ item.explain }}
      </view>
    </view>
  </view>
</template>

<script>
// 注意buttons最多就8个, 超过显示可能会有问题
export default {
  data() {
    return {
      wrap: ''
    };
  },
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
    },
    buttons: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick() {
      // this.$emit('go');
      this.wrap = this.wrap === 'wrap' ? '' : 'wrap';
    },
    handleButton(item) {
      this.$emit('go', item.name || item.icon);
      // this.wrap = "";
    },
    hideButtons() {
      // 外部调用此方法, 隐藏, 注意组件加载状态
      this.wrap = '';
    }
  },
  computed: {
    style() {
      return `width: ${this.w};height: ${this.h};bottom:${this.b};right:${this.r};position:fixed;`;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.wrap {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100000;
}
.transition {
  transition: all 0.2s ease;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.card {
  top: 50%;
  right: 0;
  z-index: 101;
  width: 140rpx;
  padding: 12rpx;
  transform: translate(-90%, -50%);
  border-radius: 10rpx;
}
.content:after {
  content: '';
  top: 50%;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg) translateY(-63%);
  position: absolute;
  z-index: -1;
  display: inline-block;
  overflow: hidden;
  width: 12px;
  height: 12px;
  left: auto;
  right: -1px;
  background-color: inherit;
}
.transform0 {
  transform: translateY(-120%);
}
.transform1 {
  transform: translateY(-240%);
}
.transform2 {
  transform: translateY(-360%);
}
.transform3 {
  transform: translateY(-480%);
}
.transform4 {
  transform: translateY(-600%);
}
.transform5 {
  transform: translateY(-720%);
}
.transform6 {
  transform: translateY(-840%);
}
.transform7 {
  transform: translateY(-960%);
}
.box-shadow {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
}
.z-index {
  z-index: 1000000;
}
</style>
