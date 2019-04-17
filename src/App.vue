<template>
  <div id="app" v-cloak :class="{darkMode: darkMode}">
    <div class="banner info" id="refresh" style="display: none" @click.prevent="refresh">
      <strong>A new version is available.</strong>
      <br>Press here to get the latest changes
    </div>
    <div class="windows">
      <div
        v-for="day in days"
        :key="day.id"
        class="window"
        :class="{'window--past': day.id - currentDayId < 0, 'window--future': day.id - currentDayId > 0, 'window--current': day.id == currentDayId }"
      >
        <page id="editor" :dayId="day.id"></page>
      </div>
    </div>
    <navbar></navbar>
    <panel id="calendar" title="Pick a date">
      <!-- <div class="buttons">
        <a id="yesterday" href="#" class="button" @click.prevent="jumpToYesterday">Yesterday</a>
        <a id="today" href="#" class="button" @click.prevent="jumpToToday">Today</a>
        <a id="tomorrow" href="#" class="button" @click.prevent="jumpToTomorrow">Tomorrow</a>
      </div>-->
      <month></month>
    </panel>
    <panel id="settings" title="Settings">
      <div>
        <h4>Theme</h4>
        <btn @action="switchTheme('')" :selected="!darkMode">Ligth</btn>
        <btn @action="switchTheme('dark')" :selected="darkMode">Dark</btn>
      </div>
      <div>
        <h4>Logged in as</h4>
        <div id="user--email">{{ user.email }}</div>
        <btn @action="logout">Log out</btn>
      </div>
      <div class="version">
        You're using version
        <strong>v3.0.4</strong> of zoreet.com
      </div>
    </panel>
  </div>
</template>

<script>
import auth0 from 'auth0-js'
import btn from './components/Button'
import moment from 'moment'
import month from './components/Month'
import navbar from './components/Navbar'
import page from './components/Page'
import panel from './components/Panel'
import Swipe from './modules/swipe' // keep this, I'm using it
// import Component from './components/Component.vue'

export default {
  name: 'app',
  data() {
    return {
      swipe: null,
      user: {},
      webAuth: null,
      isStandalone: localStorage.getItem('isStandalone'),
      loggedIn: false,
      darkMode: false,
    }
  },
  components: {
    // Component,
    btn,
    month,
    navbar,
    page,
    panel,
  },
  computed: {
    days() {
      return this.$store.state.days
    },
    currentDayId() {
      return this.$store.state.currentDay.format('YYYYMMDD')
    },
    activePanel() {
      return this.$store.state.activePanel
    },
  },
  beforeMount() {
    if (window.location.search) localStorage.setItem('isStandalone', true)

    this.webAuth = new auth0.WebAuth({
      domain: 'todayapp.eu.auth0.com',
      clientID: 'Zz9d2EICFe1981TC5Ym7dfva9Y1jECmP',
      responseType: 'token id_token',
      scope: 'openid email profile',
      redirectUri: window.location.origin + '/',
      audience: 'todayapp',
    })

    this.darkMode = JSON.parse(localStorage.getItem('darkMode')) ? true : false

    if (window.navigator.onLine) {
      this.checkLogin()
    }
  },
  mounted() {
    let that = this

    document.addEventListener(
      'touchmove',
      function(e) {
        if (e.target == document.body) e.preventDefault()
      },
      { passive: false }
    )

    this.$store.commit('addDay', this.currentDayId)

    let yesterdayId = moment(this.currentDayId)
      .subtract(1, 'days')
      .format('YYYYMMDD')
    this.$store.commit('addDay', yesterdayId)
    let tomorrowId = moment(this.currentDayId)
      .add(1, 'days')
      .format('YYYYMMDD')
    this.$store.commit('addDay', tomorrowId)

    document
      .querySelector('.windows')
      .addEventListener('swipeLeft', function() {
        if (!that.activePanel) that.gotoNextDay()
      })
    document
      .querySelector('.windows')
      .addEventListener('swipeRight', function() {
        if (!that.activePanel) that.gotoPrevDay()
      })
  },
  methods: {
    // ////////////////////////////////////////////////////////////
    //
    // DAYS
    //
    // ////////////////////////////////////////////////////////////
    gotoPrevDay() {
      this.$store.dispatch('gotoDay', { step: -1 })
    },
    gotoNextDay() {
      this.$store.dispatch('gotoDay', { step: 1 })
    },

    // ////////////////////////////////////////////////////////////
    //
    // UI
    //
    // ////////////////////////////////////////////////////////////
    swipeHandler(direction, event) {
      if (event.target.type !== 'textarea') {
        if (direction == 'left') {
          this.gotoNextDay()
        } else if (direction == 'right') {
          this.gotoPrevDay()
        }
      }
    },
    switchTheme(flag) {
      this.darkMode = flag ? true : false
      localStorage.setItem('darkMode', this.darkMode)
    },
    refresh() {
      window.location.reload(true)
    },
    // ////////////////////////////////////////////////////////////
    //
    // USER
    //
    // ////////////////////////////////////////////////////////////
    checkLogin() {
      if (window.location.hash.length > 1) {
        this.handleAuthentication()
      } else {
        let expiresAt = parseInt(localStorage.getItem('expires_at'))
        let now = new Date().getTime()
        let expiresIn = expiresAt - now
        let token = localStorage.getItem('access_token')

        if (token && expiresAt && now < expiresAt) {
          this.user = JSON.parse(localStorage.getItem('user'))

          this.$store.commit('token', token)
          this.scheduleRenewal(expiresIn)

          let that = this
          window.onfocus = function() {
            let now = new Date().getTime()
            if (expiresAt < now) {
              that.silentLogin()
            }
          }
        } else {
          this.login()
        }
      }
    },
    login() {
      this.webAuth.authorize()
    },
    silentLogin() {
      let that = this
      this.webAuth.checkSession({}, function(err, result) {
        if (err) {
          that.error = err
        } else {
          that.error = ''
          that.token = result.accessToken
          that.saveLoginData(result)
          that.scheduleRenewal(result.expiresIn * 1000)
        }
      })
    },
    handleAuthentication() {
      let that = this
      this.webAuth.parseHash(function(err, authResult) {
        if (err) {
          alert(
            'Error: ' + err.error + '. Check the console for further details.'
          )
          console.log('This is the error you got: ', err)
        } else if (authResult && authResult.accessToken && authResult.idToken) {
          that.saveLoginData(authResult)
          window.location.replace('/')
        } else {
          alert('Oups!/n/nTry again')
          window.location.replace('/')
        }
      })
    },
    scheduleRenewal(expiresIn) {
      if (!expiresIn) return

      let that = this
      window.setTimeout(() => {
        that.silentLogin()
      }, expiresIn)
    },
    saveLoginData(result) {
      var expiresAt = new Date().getTime() + result.expiresIn * 1000
      var user = JSON.stringify({
        email: result.idTokenPayload.email,
        nickname: result.idTokenPayload.nickname,
      })

      localStorage.setItem('access_token', result.accessToken)
      localStorage.setItem('id_token', result.idToken)
      localStorage.setItem('expires_at', expiresAt)
      localStorage.setItem('user', user)
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
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: var(--accent);
}
[v-cloak] {
  display: none !important;
}

#app {
  -webkit-font-smoothing: antialiased;
  background-color: rgb(128, 128, 128);
  color: var(--text);
  display: flex;
  flex-direction: column;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
}
.windows {
  flex: 1 0 auto;
  height: calc(100% - 86px);
  overflow: hidden;
  position: relative;
  width: 100%;
  left: 0px;
}

.window {
  background-color: #fff;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.4s;
}
.window--past {
  transform: translateX(calc(-100vw - 100px));
}
.window--future {
  transform: translateX(calc(100vw + 100px));
}

body * {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
::selection {
  background: #5ceea7;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

/* Colour Palette */
#app {
  /* light mode */
  --text: #1e2c4a;
  --text--secondary: #e3e3e3;
  --back: #fff;
  --back--dark: #f2f2f2;
  --accent: #2be4a4;
  --accent--text: #0d067c;
}
#app.darkMode {
  /* dark mode */
  --text: #fafafa;
  --text--secondary: #63709f;
  --back: #1e2b4c;
  --back--dark: #161e35;
  --accent: #24e3ae;
  --accent--text: #24e3ae;
  background-color: #000;
}

textarea {
  font-size: 16px;
  width: 100%;
}

#settings h4 {
  margin-bottom: 8px;
}
#settings .content > div {
  margin-bottom: 32px;
}
#user--email {
  margin-bottom: 12px;
}

.banner {
  position: fixed;
  z-index: 999;
  padding: 12px 16px;
  background: #dedede;
  font-size: 12px;
  width: 100%;
}

.banner.info {
  text-align: center;
}

.version {
  font-size: 12px;
}
</style>
