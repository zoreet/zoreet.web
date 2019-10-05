import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from './store'
import './registerServiceWorker'
import moment from 'moment'

Vue.config.productionTip = false

window.addEventListener('focus', () => {
  let wasLookingAtToday = false
  if (store.state.today.isSame(store.state.currentDay, 'day')) {
    wasLookingAtToday = true
  }

  let now = moment()
  if (store.state.today.isSame(now, 'day')) {
    store.commit('newToday', now)

    if (wasLookingAtToday) {
      store.dispatch('gotoDay', { today: true })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
