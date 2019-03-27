import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import App from './App.vue'
import moment from 'moment'
import Vue2TouchEvents from 'vue2-touch-events'

// import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Vue2TouchEvents, {
  swipeTolerance: 100,
})

const store = new Vuex.Store({
  state: {
    today: moment(),
    currentDay: moment(),
    tasks: [
      {
        id: 1,
        title: 'title',
        done: false,
      },
    ],
  },
  getters: {
    day(state) {
      let id = state.currentDay.format('YYYYMMDD')
      let isToday = id === state.today.format('YYYYMMDD')
      return {
        id,
        isToday,
      }
    },
  },
  mutations: {
    changeDay(state, payload) {
      let currentDay = state.currentDay
      state.currentDay = ''
      if (payload.step) {
        //-1 or 1
        state.currentDay = currentDay.add(payload.step, 'days')
      } else if (payload.today) {
        state.currentDay = moment(state.today.format('YYYYMMDD'))
      }
    },
    editTask(state, payload) {
      let task = payload.task
      let index = state.tasks.indexOf(task)
      task.title = payload.title

      state.tasks.splice(index, task)
    },
  },
})

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
})
