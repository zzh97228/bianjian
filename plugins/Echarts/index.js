import Vue from 'vue'
import echartsInstance from 'echarts/lib/echarts'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/lines'
import 'echarts/lib/component/axis'
import 'echarts/lib/component/axisPointer'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'

import worldMap from 'echarts/map/json/world.json'
echartsInstance.registerMap('world', worldMap)
Vue.prototype.$echarts = echartsInstance
