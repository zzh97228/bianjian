<template>
  <ocean />
</template>

<script>
import Ocean from '../../components/Ocean'
export default {
  name: 'OceanIndex',
  components: { Ocean },
  layout: 'RawLayout'
}
</script>

<style >
  @import "../../assets/css/css-global.css";

  html {
    font-size: 240px;
  }
  html,body {
    overflow: visible;
  }

</style>
