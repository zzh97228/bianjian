<template>
  <div class="main">
    <div class="left-border slide-border" />
    <div class="right-border slide-border" />
    <div class="bottom-border" />
    <div class="left-main" />
    <div class="middle-main">
      <div class="main-chart">
        <figure class="map">
          <ocean-map />
        </figure>
      </div>
      <div class="navMenu">
        <ul>
          <li class="left-menu active">
            <img src="@/assets/images/nav-txt1.png" alt="">
          </li>
          <li class="right-menu">
            <img src="@/assets/images/nav-txt2.png" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="right-main" />
  </div>
</template>

<script>
import OceanMap from './OceanMap'
export default {
  name: 'Ocean',
  components: { OceanMap }
}
</script>

<style scoped>

</style>
