<template>
  <flights :display-at-p-v-g="false" :current-time="calcTime" />
</template>

<script>
// import '@/assets/css/css-global.css'
import Flights from '@/components/Flights'

export default {
  components: { Flights },
  data: () => ({
    nowDate: new Date().getTime()
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
    }
  },
  created () {
    this.getDate()
    this.dateTimer = setInterval(() => {
      if (!isNaN(this.nowDate)) {
        this.nowDate += 1000
      }
    }, 1000)
  },
  destroyed () {
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
    }

  }
}
</script>

<style>
  @import "../assets/css/css-global.css";
</style>
