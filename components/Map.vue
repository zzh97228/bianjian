<template>
  <div class="echart" />
</template>

<script>
import { geoModel } from '@/config'
export default {
  name: 'GeoMap',
  data: () => ({
    chart: null
  }),
  created () {

  },
  mounted () {
    this.options = geoModel
    this.options.animationDelay = function (idx) {
      return idx * 100 + 10
    }

    this.options.animationDelayUpdate = function (idx) {
      return idx * 100 + 10
    }
  },
  methods: {
    setOption (option, notMerge, lazyUpdate) {
      if (this.chart === null) {
        this.chart = this.$echarts.init(this.$el, null, { renderer: 'canvas' })
      }
      this.chart.setOption(option, notMerge, lazyUpdate)
    }
  }

}
</script>

<style scoped>

</style>
