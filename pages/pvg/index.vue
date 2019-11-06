<template>
  <flights :display-at-p-v-g="true" />
</template>

<script>
// import '@/assets/css/css-pvg.css'

import Flights from '@/components/Flights.vue'
export default {
  name: 'Pvg',
  layout: 'PLayout',
  components: {
    Flights
  }
}
</script>

<style>
  @import "../../assets/css/css-pvg.css";

  html {
    font-size: 240px;
  }

</style>
