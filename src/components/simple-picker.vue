<template>
  <picker @change="handleChange" :value="valueAsync" :range="range" :range-key="rangeKey" :disabled="disabled">
    <view class="picker">
      {{ title || placeholder }}
      <text v-if="showT" class="cuIcon-triangledownfill"></text>
    </view>
  </picker>
</template>

<script>
export default {
  props: {
    rangeKey: {
      type: String,
      default: 'name'
    },
    range: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Boolean]
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    placeholder: {
      type: String,
      default: '还未选择'
    },
    showT: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange(e) {
      let inx = e.detail.value;
      this.$emit('input', this.simple ? this.range[inx] : this.range[inx][this.valueKey]);
    }
  },
  computed: {
    title() {
      let title = '';
      if (this.simple) {
        title = this.range.find((i) => i == this.value);
      } else {
        let item = this.range.find((i) => i[this.valueKey] == this.value);
        title = item ? item[this.rangeKey] : title;
      }
      return title;
    },
    valueAsync() {
      let index = this.range.findIndex((i) => (this.simple ? i == this.value : i[this.valueKey] == this.value));
      return index > -1 ? index : 0;
    }
  }
};
</script>

<style></style>
