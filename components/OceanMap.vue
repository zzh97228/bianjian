<template>
  <geo-map />
</template>

<script>
import GeoMap from './Map'
import { lineModel } from '@/config'
export default {
  name: 'OceanMap',
  components: { GeoMap },
  mixins: [GeoMap],
  data: () => ({
    lineModel
  }),
  mounted () {
    this.$nextTick(() => {
      this.lineModel.polyline = true
      this.setOption(this.options)
    })
  },
  methods: {
    setLineData (name, dataList, color = '#fff') {
      this.lineModel.data.push({
        name,
        coords: dataList,
        lineStyle: {
          color
        },
        effect: {
          show: true,
          trailLength: 0,
          constantSpeed: 20
        },
        tooltip: {
          show: true,
          formatter: '{c}',
          textStyle: {
            fontSize: 28
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
