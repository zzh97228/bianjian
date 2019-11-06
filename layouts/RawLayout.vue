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
export default {
  name: 'RawLayout',
  data: () => ({
    logo: logo1
  })

}
</script>
