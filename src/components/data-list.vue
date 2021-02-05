<template>
  <view class="data-list">
    <template v-if="!upOrDown">
      <slot name="noData" v-if="!loading && !list.length">
        <view :style="{ paddingTop: noDataTop + 'px' }" class="flex justify-around align-center" v-if="isShowNonData">
          <view>
            <view class="text-xsl">
              <text class="cuIcon-attentionforbidfill text-gray"></text>
            </view>
            <text class="text-gray">暂无数据</text>
          </view>
        </view>
      </slot>
      <slot name="isEnd" v-else-if="isEnd && !loading && list.length">
        <view class="cu-load over"></view>
      </slot>
      <slot name="loading" v-else-if="loading">
        <view class="cu-load loading"></view>
      </slot>
    </template>
    <slot></slot>
    <template v-if="upOrDown">
      <slot name="noData" v-if="!loading && !list.length">
        <view :style="{ paddingTop: noDataTop + 'px' }" class="flex justify-around align-center" v-if="isShowNonData">
          <view>
            <view class="text-xsl">
              <text class="cuIcon-attentionforbidfill text-gray"></text>
            </view>
            <text class="text-gray">暂无数据</text>
          </view>
        </view>
      </slot>
      <slot name="isEnd" v-else-if="isEnd && !loading && list.length">
        <view class="cu-load over"></view>
      </slot>
      <slot name="loading" v-else-if="loading">
        <view class="cu-load loading"></view>
      </slot>
    </template>
  </view>
</template>

<script>
// upOrDown (true)上拉 下拉(false), 默认上拉
export default {
  name: 'data-list',
  data() {
    let { page, page_size } = this.pagenation;
    return {
      page,
      isEnd: false,
      list: [],
      loading: false,
      page_size
    };
  },
  props: {
    rData: {
      type: Object,
      default: () => ({})
    },
    http: {
      type: Function,
      required: true
    },
    pagenation: {
      type: Object,
      default: () => ({ page: 1, page_size: 10 })
    },
    noDataTop: {
      type: Number,
      default: 200
    },
    isShowNonData: {
      type: Boolean,
      default: true
    },
    upOrDown: {
      type: Boolean,
      default: true
    },
    listenersRdata: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    rData: {
      handler() {},
      deep: true
    }
  },
  methods: {
    clearEmptyProps(o) {
      let c = { ...o };
      for (const [keys, val] of Object.entries(c)) {
        if (!this.$methods.propEmpty(val) || !this.$methods.propEmpty(val)) Reflect.deleteProperty(c, keys);
      }
      return c;
    },
    getData(reload = false) {
      this.loading = true;
      this.page = reload ? 1 : this.page;
      let page = this.page;
      let page_size = this.rData.page_size || this.page_size;
      let params = Object.assign({}, this.clearEmptyProps(this.rData), { page, page_size });
      this.http(params)
        .then((r) => {
          let data = r.data;
          if (page === 1) {
            this.list = [];
            this.isEnd = false;
          }
          // this.list[this.upOrDown ? 'push' : 'unshift'](...data);
          this.list.push(...data);
          this.$emit('data', this.list);
          this.isEnd = data.length < this.page_size;
        })
        .catch((error) => {
          this.$emit('error', error);
        })
        .finally(() => {
          this.loading = false;
          // #ifdef H5
          uni.stopPullDownRefresh();
          // #endif
        });
    },
    handlerUp() {
      if (!this.loading && !this.isEnd) {
        this.page++;
        this.getData();
      }
    },
    handlerDown() {
      if (!this.loading && !this.isEnd) {
        // this.upOrDown = false;
        this.page++;
        this.getData();
      } else {
        // #ifdef H5
        uni.stopPullDownRefresh();
        // #endif
      }
    }
  },
  mounted() {
    if (this.listenersRdata) {
      this.$watch(
        'rData',
        () => {
          if (!this.loading) {
            this.getData(true);
          }
        },
        { deep: true }
      );
    }
  }
};
</script>

<style lang="scss">
.refresh-wrap {
  position: absolute;
  height: 50px;
  z-index: 1;
}
.load-more::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
