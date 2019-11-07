<template>
  <div class="main">
    <div class="left-border slide-border" />
    <div class="right-border slide-border" />
    <div class="bottom-border" />
    <div class="left-main">
      <div v-show="currentScreen > 0" class="back-btn" @click="pushBack">
        <img src="@/assets/images/back-txt.png">
      </div>
      <div class="left-move-border" />
      <continental-flight
        :continental-data="continentalFlights"
        @onChangeContinental="onChangeContinental"
      />
      <flight-detail
        :nations="continentalResult.nations"
        :flight-number="continentalResult.lines"
        :flights="continentalResult.flights.length"
        :continental-name="continentalResult.name"
        @changeNation="onChangeNation"
      />
    </div>
    <div class="middle-main">
      <div class="main-chart">
        <figure v-if="showMap" class="map">
          <flights-map
            ref="mapChart"
            :check-box-pvg="checkBox.PVG"
            :check-box-sha="checkBox.SHA"
            :check-box-airbus="checkBox.AIRBUS"
            :check-box-cargo="checkBox.CARGO"
          />
        </figure>

        <div class="checkbox-group">
          <label v-if="!displayAtPVG" ref="SHA_BTN" @click="enableFlightListChange = true">
            <img src="@/assets/images/line-yellow.png">
            <input
              v-model="checkBox.SHA"
              type="checkbox"
              value="SHA"
              hidden
            >虹桥国际机场
          </label>
          <label v-if="!displayAtPVG" ref="PVG_BTN" @click="enableFlightListChange = true">
            <img src="@/assets/images/line-green.png">
            <input
              v-model="checkBox.PVG"
              type="checkbox"
              value="PVG"
              hidden
            >浦东国际机场
          </label>
          <label ref="AIRBUS_BTN" @click="enableFlightListChange = false">
            <img src="@/assets/images/chart-icon3.png">
            <input
              v-model="checkBox.AIRBUS"
              type="checkbox"
              value="AIRBUS"
              hidden
            >客机
          </label>
          <label ref="CARGO_BTN" @click="enableFlightListChange = false">
            <img src="@/assets/images/chart-icon2.png">
            <input
              v-model="checkBox.CARGO"
              type="checkbox"
              value="CARGO"
              hidden
            >
            货机
          </label>
        </div>
      </div>
      <div class="navMenu">
        <ul v-if="!displayAtPVG">
          <li class="left-menu">
            <img src="@/assets/images/nav-txt1.png" alt="">
          </li>
          <li class="right-menu active">
            <img src="@/assets/images/nav-txt2.png" alt="">
          </li>
        </ul>
        <div v-else class="navMenuBox">
          <img src="@/assets/images/nav-txt2.png" alt="">
        </div>
      </div>
    </div>
    <div class="right-main">
      <div class="right-move-border" />
      <div class="right-time">
        {{ calcTime }}
      </div>
      <flight-list
        ref="flightList"
        :continental-name="continentalResult.name"
        :flight-list="continentalResult.flights"
      />
      <leave-or-out
        :detail="entryOrExit"
      />
    </div>
  </div>
</template>

<script>
import FlightsMap from './FlightsMap'
import { entryOrExit } from '@/config'
import ContinentalFlight from '@/components/ContinentalFlight'
import FlightList from '@/components/FlightList'
import LeaveOrOut from '@/components/leaveOrOut'
import FlightDetail from '@/components/FlightDetail'
// import GeoMap from '@/components/Map'

export default {
  name: 'Flights',
  components: {
    FlightsMap,
    // GeoMap,
    FlightDetail,
    LeaveOrOut,
    FlightList,
    ContinentalFlight
  },
  props: {
    displayAtPVG: [Object, Boolean]
  },
  data: () => ({
    nowDate: new Date().getTime(),
    enableFlightListChange: false,
    checkBox: {
      PVG: true,
      SHA: true,
      CARGO: true,
      AIRBUS: true
    },
    currentContinental: undefined,
    currentRegion: undefined,
    showMap: false,
    dateTimer: null,
    updateTimer: null,
    continentalResult: {
      name: '',
      flights: [],
      nations: [],
      lines: 0
    },
    entryOrExit: {},
    continentalFlights: {
    }
  }),
  computed: {
    calcTime () {
      const timeStr = this.nowDate
      const t = parseInt(timeStr)
      if (isNaN(t)) { return }
      const time = new Date(t)
      const month = '' + (time.getMonth() + 1)
      const day = '' + time.getDate()
      return `${time.getFullYear()}.${month.length === 2 ? month : '0' + month}.${day.length === 2 ? day : '0' + day} ${time.toTimeString().slice(0, 8)}`
    },
    currentScreen: {
      get () {
        return this.$store.state.currentScreen
      },
      set (val) {
        this.$store.state.currentScreen = val
      }
    }
  },
  watch: {
    checkBox: {
      handler (val, old) {
        if (!val) { return }
        this.changeCheckBoxColor('PVG_BTN', val.PVG, '#fff', '#5f6769')
        this.changeCheckBoxColor('SHA_BTN', val.SHA, '#fff', '#5f6769')
        this.changeCheckBoxColor('CARGO_BTN', val.CARGO, '#fff', '#5f6769')
        this.changeCheckBoxColor('AIRBUS_BTN', val.AIRBUS, '#fff', '#5f6769')

        if (this.currentScreen === 1 && this.$refs.flightList) {
          this.$refs.flightList.clearData()
          if ((!val.PVG && !val.SHA) || !this.currentContinental) {
            this.$refs.flightList.updateData([])
            return
          }
          this.getContinentalDetail(this.currentContinental, {
            pvg: val.PVG,
            sha: val.SHA
          }, this.currentRegion).then((data) => {
            this.$refs.flightList.updateData(data.flights)
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.getDate()
    this.dateTimer = setInterval(() => {
      if (!isNaN(this.nowDate)) {
        this.nowDate += 1000
      }
    }, 1000)
    this.entryOrExit = entryOrExit
  },
  mounted () {
    this.$nextTick(() => {
      const self = this
      self.init()

      setTimeout(() => {
        this.showMap = true
      }, 1000)
      this.updateTimer = setInterval(() => {
        self.update()
      }, 180000)
    })
  },
  destroyed () {
    clearInterval(this.updateTimer)
    clearInterval(this.dateTimer)
  },
  methods: {
    getDate () {
      this.axios.get('/time').then(({ status, data }) => {
        if (status === 200) {
          this.nowDate = parseInt(data)
        }
      }).catch((err) => {
        console.log(err)
        this.nowDate = new Date().getTime()
      })
    },
    onChangeNation (nation) {
      const self = this
      const params = {
        pvg: this.displayAtPVG ? true : this.checkBox.PVG,
        sha: this.displayAtPVG ? false : this.checkBox.SHA
      }
      this.currentRegion = nation
      this.getContinentalDetail(this.currentContinental, params, nation).then((data) => {
        self.$refs.flightList.clearData()

        self.$refs.flightList.updateData(data.flights)
      }).catch((err) => {
        console.log(err)
      })
      setTimeout(() => {
        this.$refs.mapChart.update(this.currentContinental, nation)
      }, 500)
    },
    changeCheckBoxColor (btnName, val, notCheckedColor, checkedColor) {
      if (!this.$refs[btnName]) { return }
      if (!val) {
        this.$refs[btnName].style.color = checkedColor
      } else {
        this.$refs[btnName].style.color = notCheckedColor
      }
    },
    throttle (fn, delay) {
      let prev = Date.now()
      return function () {
        const now = Date.now()
        if (now - prev > delay) {
          fn()
          prev = Date.now()
        }
      }
    },
    pushBack () {
      this.currentScreen = 0
      this.currentRegion = undefined
      this.currentContinental = undefined
      setTimeout(() => {
        this.$refs.mapChart.update()
      }, 500)
    },
    convertContinentalName (val) {
      switch (val) {
        case '亚洲': return 'Asia'
        case '非洲': return 'Africa'
        case '美洲': return 'America'
        case '大洋洲': return 'Oceania'
        case '欧洲': return 'Europe'
        default: return null
      }
    },
    init () {
      this.getEntryOrExit().then((data) => {
        this.entryOrExit = data
      }).catch((err) => {
        console.log(err)
      })

      this.getContinentalFlights().then((data) => {
        this.continentalFlights = data
      }).catch((err) => {
        console.log(err)
      })
    },
    update () {
      this.getEntryOrExit().then((data) => {
        this.entryOrExit = data
      }).catch((err) => {
        console.log(err)
      })
    },
    onChangeContinental (val) {
      const self = this
      // const value = self.convertContinentalName(val)
      const value = val
      if (value === '中国香港' || value === '中国澳门' || value === '中国台湾') { return }
      if (!value) { return }
      self.getContinentalDetail(value, this.displayAtPVG ? {
        pvg: true,
        sha: false
      } : {
        pvg: this.checkBox.PVG,
        sha: this.checkBox.SHA
      }).then((data) => {
        self.continentalResult = data
        self.currentContinental = data.name
        self.currentScreen = 1

        this.$refs.mapChart.update(value)
      }).catch((err) => {
        console.log(err)
      })
    },
    getContinentalFlights () {
      return new Promise((resolve, reject) => {
        this.axios.get('/continentalFlights').then(({ status, data }) => {
          if (status === 200) {
            resolve(data)
          }
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    getContinentalDetail (name = '', mode = {
      pvg: true,
      sha: !this.displayAtPVG
    }, region = '') {
      let airport = ''
      if (mode.pvg && !mode.sha) {
        airport = 'PVG'
      } else if (!mode.pvg && mode.sha) {
        airport = 'SHA'
      }
      return new Promise((resolve, reject) => {
        this.axios({
          method: 'get',
          url: '/continental',
          params: {
            name,
            airport,
            region
          }
        }).then(({ status, data }) => {
          if (status === 200) {
            resolve(data)
          }
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    getEntryOrExit () {
      return new Promise((resolve, reject) => {
        this.axios.get('/entryExit').then(({ status, data }) => {
          if (status === 200) {
            resolve(data)
          }
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    }
  },
  destroy () {
  }

}
</script>

<style scoped>

</style>
