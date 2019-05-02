import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import moment from 'moment'
import auth0 from 'auth0-js'
import router from '@/router/index.js'

Vue.config.productionTip = false
import Vuex from 'vuex'
Vue.use(Vuex)

window.onfocus = function() {
  let now = moment()
  if (store.state.today.format('YYYYMMDD') !== now.format('YYYYMMDD')) {
    store.commit('newToday', now)
  }
  if (
    store.state.today.format('YYYYMMDD') !==
    store.state.currentDay.format('YYYYMMDD')
  ) {
    store.dispatch('gotoDay', { today: true })
  }
}

// temporary cleanup for versions up to and including v3.0.3
localStorage.removeItem('currentDayId')

let currentDayId = moment().format('YYYYMMDD')

let lastViewedDay = JSON.parse(localStorage.getItem('lastViewedDay'))
if (lastViewedDay && lastViewedDay.when && lastViewedDay.id) {
  if (lastViewedDay.when == currentDayId) {
    currentDayId = lastViewedDay.id
  }
}

const store = new Vuex.Store({
  state: {
    today: moment(),
    currentDay: moment(currentDayId, 'YYYYMMDD'),
    days: {},
    activePanel: '',
    errorMessage: '',
    editingTask: false,
    token: null,
    user: null,
    webAuth: new auth0.WebAuth({
      domain: 'todayapp.eu.auth0.com',
      clientID: 'Zz9d2EICFe1981TC5Ym7dfva9Y1jECmP',
      responseType: 'token id_token',
      scope: 'openid email profile',
      redirectUri: window.location.origin + '/',
      audience: 'todayapp',
    }),
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
    newToday(state, date) {
      state.today = ''
      state.today = date
    },
    gotoDay(state, id) {
      let lastViewedDay = JSON.stringify({
        id: id,
        when: state.today.format('YYYYMMDD'),
      })

      state.currentDay = ''
      state.currentDay = moment(id)

      localStorage.setItem('lastViewedDay', lastViewedDay)
    },
    changePanel(state, panelId) {
      this.state.activePanel = panelId
    },
    token(state, token) {
      state.token = token
    },
    user(state, newUser) {
      state.user = newUser
    },
    errorMessage(state, newErrorMessage) {
      state.errorMessage = newErrorMessage
    },
    editingTask(state, newState) {
      state.editingTask = newState
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

    // ////////////////////////////////////////////////////////////
    //
    // USER
    //
    // ////////////////////////////////////////////////////////////
    checkLogin(context) {
      if (window.location.hash.length > 1) {
        this.dispatch('handleAuthentication')
      } else {
        let expiresAt = parseInt(localStorage.getItem('expires_at'))
        let now = new Date().getTime()
        let expiresIn = expiresAt - now
        let token = localStorage.getItem('access_token')

        if (token && expiresAt && now < expiresAt) {
          context.commit('user', JSON.parse(localStorage.getItem('user')))

          context.commit('token', token)
          context.dispatch('scheduleRenewal', expiresIn)

          window.onfocus = function() {
            let now = new Date().getTime()
            if (expiresAt < now) {
              context.dispatch('silentLogin')
            }
          }
        } else {
          this.dispatch('login')
        }
      }
    },
    login(context) {
      context.state.webAuth.authorize()
    },
    silentLogin(context) {
      let that = this
      context.state.webAuth.checkSession({}, function(err, result) {
        if (err) {
          that.error = err
        } else {
          that.error = ''
          that.dispatch('saveLoginData', result)
        }
      })
    },
    handleAuthentication(context) {
      context.state.webAuth.parseHash(function(err, authResult) {
        if (err) {
          alert(
            'Error: ' + err.error + '. Check the console for further details.'
          )
          console.log('This is the error you got: ', err)
        } else if (authResult && authResult.accessToken && authResult.idToken) {
          context.dispatch('saveLoginData', authResult)
          window.location.replace('/')
        } else {
          alert('Oups!/n/nTry again')
          window.location.replace('/')
        }
      })
    },
    scheduleRenewal(context, expiresIn) {
      if (!expiresIn) return

      window.setTimeout(() => {
        context.dispatch('silentLogin')
      }, expiresIn)
    },
    saveLoginData(context, result) {
      var expiresAt = new Date().getTime() + result.expiresIn * 1000
      var user = JSON.stringify({
        email: result.idTokenPayload.email,
        nickname: result.idTokenPayload.nickname,
        sub: result.idTokenPayload.sub,
      })

      localStorage.setItem('access_token', result.accessToken)
      localStorage.setItem('id_token', result.idToken)
      localStorage.setItem('expires_at', expiresAt)
      localStorage.setItem('user', user)

      context.commit('token', result.accessToken)
      context.commit('user', user)
      context.dispatch('scheduleRenewal', result.expiresIn * 1000)
    },
    clearSession() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('user')
    },
    logout() {
      document.querySelector('body').classList.add('loading')

      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('user')
      localStorage.removeItem('user')

      // log out to Auth0 ( and if needed google, facebook or whatever id provider they used )
      let iframe = document.createElement('iframe')
      iframe.src = 'https://todayapp.eu.auth0.com/v2/logout'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)

      window.setTimeout(() => {
        window.top.location.href = '/'
      }, 2000)
    },
  },
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App,
  },
})
