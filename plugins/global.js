import Vue from 'vue'

import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts'
import loadStock from 'highcharts/modules/stock'
import Buefy from 'buefy'

import './formatNumbers'

loadStock(Highcharts)

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fas',
})
Vue.use(VueHighcharts, { Highcharts })