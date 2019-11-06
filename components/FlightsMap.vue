<template>
  <geo-map />
</template>

<script>
import GeoMap from './Map'
import { CARGO_SYMBOL, AIRBUS_SYMBOL, SHA_SYMBOL, colorPoints, PVG_SYMBOL, continentalColors, lineModel, specialScatter, DEFAULT_COORDINATES, geoModel } from '@/config'

export default {
  name: 'FlightsMap',
  components: { GeoMap },
  mixins: [GeoMap],
  props: {
    checkBoxPvg: {
      type: [Object, Boolean],
      default: true
    },
    checkBoxSha: {
      type: [Object, Boolean],
      default: true
    },
    checkBoxCargo: {
      type: [Object, Boolean],
      default: true
    },
    checkBoxAirbus: {
      type: [Object, Boolean],
      default: true
    }
  },
  data: () => ({
    SHA_COORDS: DEFAULT_COORDINATES.SHA,
    PVG_COORDS: DEFAULT_COORDINATES.PVG,

    continentalColors,
    lineModel,
    pointScatter: JSON.parse(JSON.stringify(specialScatter)),

    options: geoModel,
    flightLines: [],
    boundingCoords: [[120.47, 31.2], [121.47, 31]],
    cache: []

  }),
  watch: {
    checkBoxPvg: {
      handler (val, old) {
        this.checkAirport(val, true)
        this.setOption(this.options)
      }
    },
    checkBoxSha: {
      handler (val, old) {
        this.checkAirport(val, false)
        this.setOption(this.options)
      }
    },
    checkBoxAirbus: {
      handler (val, old) {
        this.checkAirType(val, true)
        this.setOption(this.options)
      }
    },
    checkBoxCargo: {
      handler (val, old) {
        this.checkAirType(val, false)
        this.setOption(this.options)
      }
    }

  },
  mounted () {
    this.$nextTick(() => {
      // this.setOption(this.options)
      this.clearSeries()
      this.update()
    })
  },
  methods: {
    checkAirType (checked, airbus = true) {
      if (checked === true) {
        const reduced = this.cache.reduce((prev, next) => {
          if (next.type !== 'lines') { return prev }
          if (next.airbus === airbus) {
            if (this.checkBoxSha === true && this.checkBoxPvg === true) {
              prev.push(next)
            } else if (this.checkBoxSha === true && this.checkBoxPvg === false) {
              if (!next.pvg) {
                prev.push(next)
              }
            } else if (this.checkBoxSha === false && this.checkBoxPvg === true) {
              if (next.pvg) { prev.push(next) }
            }
          }
          return prev
        }, [])
        this.options.series = this.options.series.concat(reduced)
      } else if (checked === false) {
        // 按钮变暗
        this.options.series = this.options.series.filter((curr) => {
          if (curr.type === 'effectScatter') { return true }
          return curr.airbus === !airbus
        })
      }
    },
    checkAirport (checked, pvg = true) {
      if (checked === true) {
        const reduced = this.cache.reduce((prev, next) => {
          if (next.type !== 'lines') { return prev }
          if (next.pvg === pvg) {
            if (this.checkBoxAirbus === true && this.checkBoxCargo === true) {
              prev.push(next)
            } else if (this.checkBoxAirbus === true && this.checkBoxCargo === false) {
              if (next.airbus) {
                prev.push(next)
              }
            } else if (this.checkBoxAirbus === false && this.checkBoxCargo === true) {
              if (!next.airbus) { prev.push(next) }
            }
          }
          return prev
        }, [])
        this.options.series = this.options.series.concat(reduced)
      } else if (checked === false) {
        this.options.series = this.options.series.filter((curr) => {
          if (curr.type === 'effectScatter') { return true }
          return curr.pvg === !pvg
        })
      }
    },
    clearSeries () {
      if (this.options.series) {
        this.boundingCoords = [JSON.parse(JSON.stringify(DEFAULT_COORDINATES.SHA)), JSON.parse(JSON.stringify(DEFAULT_COORDINATES.PVG))]
        this.options.geo.zoom = 1
        this.options.geo.layoutCenter = ['50%', '50%']
        this.options.series = []
        this.cache = []
      }
    },
    update (continental, nation, callback) {
      this.getFlightLines(continental, nation).then((data) => {
        this.clearSeries()
        this.flightLines = data

        const processedLines = this.convertFlightLines()
        if (continental) {
          this.options.geo.layoutSize = '90%'
        } else {
          this.options.geo.layoutSize = '120%'
        }
        if (nation) {
          this.options.geo.layoutSize = '80%'
        }

        this.options.geo.boundingCoords = this.boundingCoords
        this.options.geo.center = this.calculateCenter()

        const scatter = JSON.parse(JSON.stringify(specialScatter))

        scatter.name = ''
        scatter.data.push({
          symbol: PVG_SYMBOL,
          symbolSize: 28,
          name: '浦东国际机场',
          value: this.PVG_COORDS
        })
        scatter.data.push({
          symbol: SHA_SYMBOL,
          symbolSize: 28,
          name: '虹桥国际机场',
          value: this.SHA_COORDS
        })
        this.specialScatter = scatter
        this.cache.push(scatter)

        if (callback) { callback() }

        this.options.series.push(scatter)
        this.setOption(this.options)

        setTimeout(() => {
          for (const key in processedLines) {
            if (processedLines.hasOwnProperty(key)) {
              this.cache.push(processedLines[key])
              // this.options['series'].push(processedLines[key])
            }
          }
          // this.checkAirType(this.checkBoxCargo, false)
          // this.checkAirType(this.checkBoxAirbus, true)
          this.checkAirport(this.checkBoxPvg, true)
          this.checkAirport(this.checkBoxSha, false)

          this.setOption(this.options)
        }, 1000)
      }).catch((err) => {
        console.log(err)
      })
    },
    convertContinentalName (val) {
      switch (val) {
        case '亚洲': return 'Asia'
        case '非洲': return 'Africa'
        case '美洲': return 'America'
        case '大洋洲': return 'Oceania'
        case '欧洲': return 'Europe'
        default: return ''
      }
    },
    convertFlightLines () {
      let level = 4
      // let aLevel = 10
      return this.flightLines.reduce((prev, next) => {
        const { pvg, airbus, continental } = next
        // if (Math.abs(next['coordinates'][0]) > 180 || )
        const entry = Math.random() > 0.5
        const coords = [pvg ? this.PVG_COORDS : this.SHA_COORDS, next.coordinates]
        this.boundingCoords = this.calculateBoundingCoords(coords[1])

        const lineType = `${pvg ? 'pvg' : 'sha'}-${airbus ? 'airbus' : 'cargo'}-${entry ? 'entry' : 'exit'}`
        // const scatterType = `scatter-${pvg ? 'pvg' : 'sha'}-${airbus ? 'airbus' : 'cargo'}-${entry ? 'entry' : 'exit'}`
        const point = pvg ? colorPoints[this.convertContinentalName(continental)] : colorPoints.SHA
        const lineData = {
          coords: entry ? coords : coords.reverse(),
          value: next.portName || '',
          symbol: entry ? ['none', point] : [point, 'none'],
          lineStyle: {
            color: pvg ? this.continentalColors[this.convertContinentalName(continental)] : this.continentalColors.SHA,
            curveness: this.calculateCorveness(coords[0], coords[1], pvg, !entry)
          },
          effect: {
            show: true,
            symbol: airbus ? AIRBUS_SYMBOL : CARGO_SYMBOL,
            symbolSize: [8, 16],
            trailLength: 0,
            constantSpeed: 20
          },
          tooltip: {
            show: true,
            zlevel: 10 + level,
            formatter: '{c}',
            textStyle: {
              fontSize: 28
            }
          }
        }
        if (!prev[lineType]) {
          const tempLineModel = JSON.parse(JSON.stringify(this.lineModel))
          tempLineModel.name = lineType
          // tempLineModel['symbol'] = entry ? ['none', point] : [point, 'none']
          // tempLineModel['effect']['symbol'] = airbus ? AIRBUS_SYMBOL : CARGO_SYMBOL
          tempLineModel.pvg = pvg
          tempLineModel.airbus = airbus
          tempLineModel.zlevel = level++

          tempLineModel.animationDelay = function (idx) {
            return idx * 300 + 10
          }
          tempLineModel.animationDelayUpdate = function (idx) {
            return idx * 300 + 10
          }
          tempLineModel.data.push(lineData)
          prev[lineType] = tempLineModel
          return prev
        }
        prev[lineType].data.push(lineData)
        // if (prev[scatterType]) prev[scatterType]['data'].push(scatterData)
        return prev
      }, {})
    },
    calculateBoundingCoords (coords) {
      const left = [this.boundingCoords[0][0], this.boundingCoords[0][1]]
      const right = [this.boundingCoords[1][0], this.boundingCoords[1][1]]
      if (coords[0] < left[0]) {
        left[0] = coords[0]
      } else if (coords[0] > right[0]) {
        right[0] = coords[0]
      }

      if (coords[1] > left[1]) {
        left[1] = coords[1]
      } else if (coords[1] < right[1]) {
        right[1] = coords[1]
      }
      return [left, right]
    },
    calculateCenter () {
      return [(this.boundingCoords[0][0] + this.boundingCoords[1][0]) / 2, (this.boundingCoords[0][1] + this.boundingCoords[1][1]) / 2]
    },
    calculateCorveness (domestic, abroad, pvg, entry) {
      const x = abroad[0] - domestic[0]
      const y = abroad[1] - domestic[1]
      let converness = pvg ? 0.3 : 0.2
      if ((x < 0 && y > 0) || (x > 0 && y < 0)) { converness = -converness }
      if (entry) { converness = -converness }
      return converness
    },
    getFlightLines (continental, nation) {
      return new Promise((resolve, reject) => {
        this.axios.get(`/getFlightLines?continental=${!continental ? '' : continental}&nation=${!nation ? '' : nation}`).then(({ status, data }) => {
          if (status === 200) {
            resolve(data)
          }
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    }

  }
}
</script>

<style scoped>

</style>
