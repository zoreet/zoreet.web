import moment from 'moment'

export default {
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
        // context.commit('addDay', newDayId)
        context.commit('gotoDay', newDayId)
      }
    }
    
    let prevDayId = moment(newDayId)
    .subtract(1, 'days')
    .format('YYYYMMDD')
    if (!context.state[prevDayId]) {
      // context.commit('addDay', prevDayId)
    }
    let nextDayId = moment(newDayId)
    .add(1, 'days')
    .format('YYYYMMDD')
    if (!context.state[nextDayId]) {
      // context.commit('addDay', nextDayId)
    }
    
    this.state.activePanel = ''
  },
  
  // ////////////////////////////////////////////////////////////
  //
  // USER
  //
  // ////////////////////////////////////////////////////////////
  checkLogin(context) {
    if (window.location.hash.length > 20) {
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
  }
}
