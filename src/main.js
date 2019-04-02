import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import App from './App.vue'
import moment from 'moment'

// import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    today: moment(),
    currentDay: moment(),
    days: {},
    token: null,
    activePanel: '',
  },
  mutations: {
    addDay(state, newDateId) {
      // if I receive a day id YYYYMMDD and it's not used already
      if (newDateId && !state.days[newDateId]) {
        let day = moment(newDateId)
        let tasks = []
        if (day.isValid()) {
          Vue.set(state.days, day.format('YYYYMMDD'), { id: newDateId, tasks })
        }
      }
    },
    gotoDay(state, id) {
      let tempDay = state.currentDay
      state.currentDay = ''
      state.currentDay = moment(id)
      localStorage.setItem('current-date', this.date)
    },
    changePanel(state, panelId) {
      this.state.activePanel = panelId
    },
    token(state, token) {
      state.token = token
    },
  },
  actions: {
    gotoDay(context, payload) {
      let newDayId,
        oldDayId = context.state.currentDay.format('YYYYMMDD')
      if (payload.step) {
        //-1 or 1
        let tempDay = context.state.currentDay
        tempDay.add(payload.step, 'days')
        newDayId = tempDay.format('YYYYMMDD')
      } else if (payload.today) {
        newDayId = context.state.today.format('YYYYMMDD')
      } else if (payload.id) {
        newDayId = payload.id
      }

      if (newDayId !== oldDayId) {
        if (context.state.days[newDayId]) {
          context.commit('gotoDay', newDayId)
        } else {
          context.commit('addDay', newDayId)
          context.commit('gotoDay', newDayId)
        }
      }

      let prevDayId = moment(newDayId)
        .subtract(1, 'days')
        .format('YYYYMMDD')
      if (!context.state[prevDayId]) {
        context.commit('addDay', prevDayId)
      }
      let nextDayId = moment(newDayId)
        .add(1, 'days')
        .format('YYYYMMDD')
      if (!context.state[nextDayId]) {
        context.commit('addDay', nextDayId)
      }

      this.state.activePanel = ''
    },
  },
})

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {
    App,
  },
})
