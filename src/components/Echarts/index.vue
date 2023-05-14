<template>
  <div ref="echart" :style="{ width: '100%', height: `${height}px` }" />
</template>

<script>
import * as echarts from 'echarts'
// echarts 官方主题： vintage、dark、macarons、infographic、shine、shine
require('echarts/theme/macarons')
import resize from './resize'
export default {
  name: 'Echartsrew',
  mixins: [resize],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    height: {
      type: Number,
      default: 350
    }
  },
  data() {
    return {
      chart: null,

      /* 图表的默认配置 */
      defaultOption: {}
    }
  },

  /* 更新图表数据 */
  watch: {
    options: {
      handler(val) {
        this.draw(val)
      },
      deep: true
    }
  },
  mounted() {
    this.draw(this.options)
  },
  methods: {
    async draw(options) {
      /* 基于准备好的dom，初始化echarts实例，并设置主题颜色*/
      this.chart = echarts.init(this.$refs.echart, 'macarons')

      /* 异步绘制图表 */
      await this.chart.setOption({ ...this.defaultOptions, ...options })
    }
  }
}
</script>