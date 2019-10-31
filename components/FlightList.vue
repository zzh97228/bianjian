<template>
  <div v-if="currentScreen === 1" class="right-part-box">
    <div class="right-air-title air-title-flight">
      {{ continentalName }}各国及地区航班列表
    </div>
    <div class="part-country-list">
      <div class="table-list">
        <div class="table-title">
          <span class="sw1">航班号</span>
          <span class="sw2">出发地</span>
          <span class="sw4">目的地</span>
          <span class="sw5">抵离时间</span>
          <span class="sw6">频次</span>
        </div>
        <swiper v-if="!loading" :options="swiperOption" class="table-swiper">
          <swiper-slide v-for="(item,index) in dataList" :key="index" class="swiper-slide">
            <span class="sw1">{{ item.flightNumber }}</span>
            <span class="sw2">{{ item.departure }}</span>
            <span class="sw4">{{ item.destination }}</span>
            <span class="sw5">{{ dateFormat(item.arrivalTime) }}</span>
            <span class="sw6">{{ item.frequency }}</span>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FlightList',
  props: {
    flightList: {
      type: [Boolean, Array],
      default: () => ([])
    },
    continentalName: {
      type: [Boolean, String],
      default: ''
    }
  },
  data: () => ({
    dataList: [],
    loading: false,
    pvgName: '浦东国际机场',
    shaName: '虹桥国际机场'
  }),
  watch: {
    flightList: {
      handler (val, old) {
        this.dataList = val
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['currentScreen']),
    swiperOption () {
      const loop = this.dataList.length > 8
      return {
        direction: 'vertical',
        autoplay: {
          delay: 30000
        },
        speed: 1500,
        slidesPerView: 8,
        slidesPerGroup: 8,
        freeMode: false,
        loop,
        observer: true,
        observeParents: true
      }
    }
  },
  methods: {
    updateData (data) {
      this.dataList = data || []

      setTimeout(() => {
        this.loading = false
      }, 0)
    },
    clearData () {
      this.loading = true
      this.dataList = []
    },
    dateFormat (str) {
      if (!str) { return '' }
      // let year = str.substring(0, 4)
      const date = str.substring(4, 8)
      const time = str.substring(8, 12)
      return `${date.substring(0, 2)}/${date.substring(2, 4)} ${time.substring(0, 2)}:${time.substring(2, 4)}`
    }

  }
}
</script>

<style scoped>

</style>
