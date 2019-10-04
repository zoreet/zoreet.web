import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import { store } from '@/store/index.js'
import router from '@/router/index.js'

Vue.config.productionTip = false
import Vuex from 'vuex'
Vue.use(Vuex)

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App,
  },
})
