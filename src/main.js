import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import moment from 'moment'
import { store } from '@/store/index.js'
import router from '@/router/index.js'

Vue.config.productionTip = false
import Vuex from 'vuex'
Vue.use(Vuex)

window.addEventListener('focus', () => {
  // let wasLookingAtToday = false;
  // if (store.state.today.isSame(store.state.currentDay, 'day')) {
  //   wasLookingAtToday = true;
  // }

  // let now = moment()
  // if (store.state.today.isSame(now,'day')) {
  //   store.commit('newToday', now)

  //   if(wasLookingAtToday) {
  //     store.dispatch('gotoDay', { today: true })
  //   }
  // }

})

// temporary cleanup for versions up to and including v3.0.3
localStorage.removeItem('currentDayId')

let currentDayId = moment().format('YYYYMMDD')

let lastViewedDay = JSON.parse(localStorage.getItem('lastViewedDay'))
if (lastViewedDay && lastViewedDay.when && lastViewedDay.id) {
  if (lastViewedDay.when == currentDayId) {
    currentDayId = lastViewedDay.id
  }
}

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App,
  },
})
