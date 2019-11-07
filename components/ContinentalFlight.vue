<template>
  <div v-show="currentScreen === 0" class="left-global-box">
    <div class="left-air-title">
      各大洲及港澳台出入航班情况
    </div>
    <div class="left-air-chart">
      <div class="chart-unit">
        单位：架
      </div>
      <div class="plane-legend">
        <span class="entry-icon">入境飞机</span>
        <span class="exit-icon">出境飞机</span>
      </div>
      <bar-chart ref="bEeChart" :class-p="globalChart" @changeMap="changeMapData" />
      <div class="chart-box">
        <bar-chart ref="pEeChart" :class-p="partChart" @changeMap="changeMapData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BarChart from '@/components/BarChart'
export default {
  name: 'ContinentalFlight',
  components: { BarChart },
  props: {
    continentalData: [Boolean, Object]
  },
  watch: {
    continentalData (val, old) {
      this.changeChartData(val)
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  computed: {
    ...mapGetters(['currentScreen'])
  },
  data: () => ({
    globalChart: 'entry-exit-chart',
    partChart: 'part-ee-chart',
    globalAttr: {
      grid: [{
        left: '9%',
        width: '33%'
      }, {
        left: '50.5%'
      }, {
        right: '9%',
        width: '33%'
      }
      ],
      fontSize: 30
    },
    partAttr: {
      grid: [{
        left: '9%',
        width: '24%'
      }, {
        left: '50.6%'
      }, {
        right: '10%',
        width: '24%'
      }
      ],
      fontSize: 25
    }
  }),
  methods: {
    changeMapData (val) {
      this.$emit('onChangeContinental', val)
    },
    changeChartData (val) {
      const model = {
        'name': '',
        'value': null,
        'left': '',
        'right': ''
      }
      let global = val.global
      if (Array.isArray(global) && global.length > 0) {
        const first = global.shift()
        global = [first, model, model].concat(global)
        if (global.length < 8) {
          for (let i = 0; i < 8 - global.length; i++) {
            global.push(model)
          }
        }
      }
      const globalData = {
        'data': global
      }
      this.$refs.bEeChart.setOption(this.globalAttr, globalData)
      const partData = {
        'data': val.china
      }
      this.$refs.pEeChart.setOption(this.partAttr, partData)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
