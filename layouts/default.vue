<template>
  <div class="wrap">
    <div class="circle-rotate" />
    <div class="top">
      <div class="breath-lamp breath-lamp-left" />
      <div class="breath-lamp breath-lamp-right" />
      <div class="logo">
        <img :src="logo" alt="">
      </div>
    </div>
    <nuxt :current-time="calcTime" />
  </div>

<!--  <div>-->
<!--    <nuxt />-->
<!--  </div>-->
</template>
<script>
import logo1 from '@/assets/images/logo.png'
import logo2 from '@/assets/images/logo-pvg.png'

export default {
  data: () => ({
    logo: logo1
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
  mounted () {
    if (this.$nuxt.$route.path.includes('/pvg')) {
      this.logo = logo2
      this.axios.interceptors.request.use((config) => {
        if (!config.params) {
          config.params = {}
          config.params.airport = 'PVG'
        }
        return config
      })
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
html {
  font-size: 240px;
}
</style>
