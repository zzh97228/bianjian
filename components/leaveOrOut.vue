<template>
  <div v-show="currentScreen === 0" class="right-global-box">
    <div class="right-air-title">
      上海机场口岸出入境飞机及人员情况
    </div>
    <div class="right-global-list">
      <div class="r-g-item">
        <div class="right-global-title">
          当日办理航班数
        </div>
        <div class="right-global-line">
          <span class="flight-left-border" />
          <div class="flight-right-desc clearfix">
            <div class="f-r-in-line">
              <div class="flight-total-icon f-plane-icon" />
              <div class="f-r-total">
                <h4>入境数量</h4>
                <div>
                  {{ detail.flightCount.enter }} <span>/ 架次</span>
                </div>
              </div>
            </div>
            <div class="f-r-out-line">
              <div class="flight-total-icon f-plane-icon" />
              <div class="f-r-total">
                <h4>出境数量</h4>
                <div>
                  {{ detail.flightCount.exit }} <span>/ 架次</span>
                </div>
              </div>
            </div>
          </div>
          <span class="flight-right-border" />
        </div>
      </div>
      <div class="r-g-item">
        <div class="right-global-title">
          当日出入境人员数
        </div>
        <div class="right-global-line">
          <span class="flight-left-border" />
          <div class="flight-right-desc clearfix">
            <div class="f-r-in-line">
              <div class="flight-total-icon f-user-icon" />
              <div class="f-r-total">
                <h4>入境人员数</h4>
                <div>
                  {{ detail.people.enter }} <span>/ 人次</span>
                </div>
              </div>
            </div>
            <div class="f-r-out-line">
              <div class="flight-total-icon f-user-icon" />
              <div class="f-r-total">
                <h4>出境人员数</h4>
                <div>
                  {{ detail.people.exit }} <span>/ 人次</span>
                </div>
              </div>
            </div>
          </div>
          <span class="flight-right-border" />
        </div>
      </div>
      <div class="r-g-item">
        <div class="right-global-title">
          当日出入境旅客数
        </div>
        <div class="right-global-line">
          <span class="flight-left-border" />
          <div class="flight-right-desc clearfix">
            <div class="f-r-in-line">
              <div class="flight-total-icon f-travel-icon" />
              <div class="f-r-total">
                <h4>入境旅客数</h4>
                <div>
                  {{ detail.passengers.enter }} <span>/ 人次</span>
                </div>
              </div>
            </div>
            <div class="f-r-out-line">
              <div class="flight-total-icon f-travel-icon" />
              <div class="f-r-total">
                <h4>出境旅客数</h4>
                <div>
                  {{ detail.passengers.exit }} <span>/ 人次</span>
                </div>
              </div>
            </div>
          </div>
          <span class="flight-right-border" />
        </div>
      </div>
      <div class="r-g-item">
        <div class="right-global-title">
          当日出入境员工数
        </div>
        <div class="right-global-line">
          <span class="flight-left-border" />
          <div class="flight-right-desc clearfix">
            <div class="f-r-in-line">
              <div class="flight-total-icon f-work-icon" />
              <div class="f-r-total">
                <h4 class="f-r-d-title">
                  入境员工数量
                </h4>
                <div class="f-r-d-num">
                  {{ detail.staffs.enter }} <span>/ 人次</span>
                </div>
              </div>
            </div>
            <div class="f-r-out-line">
              <div class="flight-total-icon f-work-icon" />
              <div class="f-r-total">
                <h4 class="f-r-d-title">
                  出境员工数量
                </h4>
                <div class="f-r-d-num">
                  {{ detail.staffs.exit }} <span>/ 人次</span>
                </div>
              </div>
            </div>
          </div>
          <span class="flight-right-border" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LeaveOrOut',
  props: {
    detail: {
      type: [Boolean, Object],
      default: () => ({
        flightCount: {
          enter: 0,
          exit: 0
        },
        people: {
          enter: 0,
          exit: 0
        },
        passengers: {
          enter: 0,
          exit: 0
        },
        staffs: {
          enter: 0,
          exit: 0
        }
      })
    }

  },
  computed: {
    ...mapGetters(['currentScreen'])
  }
}
</script>

<style scoped>

</style>
