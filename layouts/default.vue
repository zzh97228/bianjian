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
    <nuxt />
  </div>
</template>
<script>
import logo1 from '@/assets/images/logo.png'
import logo2 from '@/assets/images/logo-pvg.png'

export default {
  data: () => ({
    logo: logo1
  }),
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
  }

}
</script>

<style>
html {
  font-size: 240px;
}
</style>
