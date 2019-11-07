<template>
  <div v-if="currentScreen === 1" class="left-part-box">
    <div class="left-air-title">
      {{ continentalName }}航班概况
    </div>
    <div class="flight-list">
      <div class="flight-line">
        <span class="flight-left-border" />
        <div class="flight-total">
          <div class="flight-total-icon" />
          <div class="flight-left-desc">
            <h4 class="flight-desc-title">
              通航国家及地区数量
            </h4>
            <div class="flight-desc-num">
              {{ nations.length }} <span>/ 个</span>
            </div>
          </div>
        </div>
        <span class="flight-right-border" />
      </div>
      <div class="flight-line">
        <span class="flight-left-border" />
        <div class="flight-total">
          <div class="flight-total-icon" />
          <div class="flight-left-desc">
            <h4 class="flight-desc-title">
              通航航线数
            </h4>
            <div class="flight-desc-num">
              {{ flightNumber }}
              <span>/ 条</span>
            </div>
          </div>
        </div>
        <span class="flight-right-border" />
      </div>
      <div class="flight-line">
        <span class="flight-left-border" />
        <div class="flight-total">
          <div class="flight-total-icon" />
          <div class="flight-left-desc">
            <h4 class="flight-desc-title">
              通航航班数
            </h4>
            <div class="flight-desc-num">
              {{ flights }}
              <span>/ 架</span>
            </div>
          </div>
        </div>
        <span class="flight-right-border" />
      </div>
    </div>
    <div class="country-name-title">
      通航国家名称
    </div>
    <div class="country-name-list" @mouseenter="on_bot_enter" @mouseleave="on_bot_leave">
      <swiper v-if="nations.length>0" ref="myBotSwiper" :options="countryOption" class="countryList">
        <swiper-slide
          v-for="(items,i) in swiperNations"
          :key="i"
          class="swiper-slide"
        >
          <ul>
            <li
              v-for="(nation,index) in items"
              :key="index"
            >
              {{ nation }}
            </li>
          </ul>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
let vm = null
export default {
  name: 'FlightDetail',
  props: {
    nations: {
      type: [Boolean, Array],
      default () {
        return []
      }
    },
    flights: {
      type: [Boolean, Number],
      default: 0
    },
    flightNumber: {
      type: [Boolean, Number],
      default: 0
    },
    continentalName: {
      type: [Boolean, String],
      default: ''
    }

  },
  data: () => ({
    countryOption1: {
      autoplay: {
        delay: 15000
      },
      effect: 'fade',
      speed: 1500,
      freeMode: false,
      loop: true,
      observer: true,
      observeParents: true,
      on: {
        init (swiper) {
          const slide = this.slides.eq(0)
          slide.addClass('ani-slide')
        },
        transitionStart () {
          for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides.eq(i)
            slide.addClass('ani-slide')
            slide.removeClass('ani-slide-in')
          }
        },
        transitionEnd () {
          const slide = this.slides.eq(this.activeIndex)
          slide.removeClass('ani-slide')
          slide.addClass('ani-slide-in')
        },
        click (e) {
          vm.changeNation(e.target.innerHTML)
        }
      }
    },
    countryOption2: {
      autoplay: false,
      effect: 'fade',
      freeMode: false,
      loop: false,
      observer: true,
      observeParents: true,
      on: {
        init (swiper) {
          const slide = this.slides.eq(0)
          slide.addClass('ani-slide-in')
        },
        click (e) {
          vm.changeNation(e.target.innerHTML)
        }
      }
    }

  }),
  computed: {
    ...mapGetters(['currentScreen']),
    countryOption () {
      const len = this.swiperNations.length
      return len <= 1 ? this.countryOption2 : this.countryOption1
    },
    swiperNations () {
      if (!Array.isArray(this.nations)) { return [[]] }
      const result = []
      for (let i = 0; i < Math.ceil(this.nations.length / 12); i++) {
        result.push(this.nations.slice(i * 12, i * 12 + 12))
      }
      return result
    },
    myBotSwiper () {
      return this.$refs.myBotSwiper.swiper
    }
  },
  created () {
    vm = this
  },
  methods: {
    on_bot_enter () {
      if (this.myBotSwiper.destroyed) { return }
      this.myBotSwiper.autoplay.stop()
    },
    on_bot_leave () {
      if (this.myBotSwiper.destroyed) { return }
      this.myBotSwiper.autoplay.start()
    },
    changeNation (nation) {
      this.$emit('changeNation', nation.trim())
    }
  }
}
</script>

<style scoped>

</style>
