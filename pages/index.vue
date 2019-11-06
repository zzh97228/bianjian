<template>
  <flights :display-at-p-v-g="false" />
</template>

<script>
// import '@/assets/css/css-global.css'
import Flights from '@/components/Flights'

export default {
  layout: 'RawLayout',
  components: { Flights }
}
</script>

<style>
  @import "../assets/css/css-global.css";

  html {
    font-size: 240px;
  }

</style>
