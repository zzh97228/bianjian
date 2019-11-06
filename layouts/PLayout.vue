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
import logo2 from '@/assets/images/logo-pvg.png'

export default {
  name: 'PLayout',
  data: () => ({
    logo: logo2
  }),
  mounted () {
    this.axios.interceptors.request.use((config) => {
      if (!config.params) {
        config.params = {}
        config.params.airport = 'PVG'
      }
      return config
    })
  }
}
</script>
<style>
</style>
