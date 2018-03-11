import Vue from 'vue'

import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts'
import loadStock from 'highcharts/modules/stock'
import VTooltip from 'v-tooltip'

loadStock(Highcharts)

Vue.use(VueHighcharts, { Highcharts })
Vue.use(VTooltip)