<template>
  <div ref="entryExitChart" :class="classP" style="cursor: pointer" />
</template>

<script>
import 'echarts/lib/component/grid'
import 'zrender/lib/svg/svg'
import 'echarts/lib/chart/bar'
import echartsInstance from 'echarts/lib/echarts'

export default {
  name: 'BarChart',
  props: ['classP'],
  data () {
    return {
      entryExitChart: null
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  methods: {
    setOption (attrList, data) {
      this.continetChart(attrList, data)
    },
    continetChart (attr, data) {
      if (this.entryExitChart === null) {
        this.entryExitChart = echartsInstance.init(this.$el, null, { renderer: 'svg' })
        const _this = this

        this.entryExitChart.getZr().on('click', function (params) {
          if (!!params.target && params.target.eventData.componentType === 'yAxis') {
            _this.$emit('changeMap', params.target.eventData.value)
          } else {

          }
        })
      }
      const myData = []
      const dataL = []
      const dataR = []

      function dataConvert (data) {
        for (let i = 0; i < data.data.length; i++) {
          myData.push(data.data[i].name)
          dataL.push(data.data[i].entry)
          dataR.push(data.data[i].exit)
        }
      }
      dataConvert(data)
      const option = {
        grid: [{
          show: false,
          left: '0',
          top: 0,
          bottom: 0,
          width: '0%'
        }, {
          show: false,
          left: attr.grid[0].left,
          top: 0,
          bottom: 0,
          containLabel: true,
          width: attr.grid[0].width
        }, {
          show: false,
          left: attr.grid[1].left,
          top: '0',
          bottom: 0
        }, {
          show: false,
          right: attr.grid[2].right,
          top: 0,
          bottom: 0,
          containLabel: true,
          width: attr.grid[2].width
        }, {
          show: false,
          right: '0%',
          top: 0,
          bottom: 10,
          width: '0%'
        },
        {
          show: false,
          left: '23%',
          top: 0,
          bottom: 0,
          containLabel: true,
          width: '10%'
        },
        {
          show: false,
          left: '68%',
          top: 0,
          bottom: 0,
          containLabel: true,
          width: '10%'
        }],
        xAxis: [
          {
            show: false
          },
          {
            gridIndex: 1,
            type: 'value',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            position: 'top',
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false

            }
          }, {
            gridIndex: 2,
            show: false
          }, {
            gridIndex: 3,
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            position: 'top',
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#1F2022',
                width: 1,
                type: 'solid'
              }
            }
          }, {
            gridIndex: 4,
            show: false
          }],
        yAxis: [
          {
            gridIndex: 0,
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
              show: false
            },
            silent: false,
            cursor: 'pointer',
            triggerEvent: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: myData.map(function (value) {
              return {
                value,
                triggerEvent: true,
                textStyle: {
                  align: 'center'
                }
              }
            })
          },
          {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
              show: false
            },
            cursor: 'pointer',

            triggerEvent: true,
            silent: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              margin: 8,
              textStyle: {
                color: '#fff',
                fontSize: attr.fontSize
              }

            },
            data: myData
          },
          {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            cursor: 'pointer',

            position: 'left',
            axisLine: {
              show: false
            },
            silent: false,

            triggerEvent: true,
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: attr.fontSize
              }
            },
            data: myData.map(function (value) {
              return {
                value,
                triggerEvent: true,
                textStyle: {
                  align: 'center'
                }
              }
            })
          },
          {
            gridIndex: 3,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
              show: false
            },
            silent: false,
            cursor: 'pointer',

            triggerEvent: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: '#fff',
                fontSize: attr.fontSize
              }
            },
            data: myData
          }

        ],
        series: [ {
          type: 'bar',
          itemStyle: {
            color: '#50e3c2'
          },
          xAxisIndex: 1,
          yAxisIndex: 1,
          label: {
            show: true,
            position: 'left',
            color: '#fff',
            fontSize: '8%'
          },
          barWidth: '13%',
          z: 10,
          data: dataL
        }, {
          type: 'bar',
          itemStyle: {
            color: '#45c9ff'
          },
          label: {
            show: true,
            position: 'right',
            color: '#fff',
            fontSize: '8%'

          },
          barWidth: '13%',
          xAxisIndex: 3,
          yAxisIndex: 3,
          z: 10,
          data: dataR
        }

        ]
      }
      this.entryExitChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
