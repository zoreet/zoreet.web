import moment from 'moment'
import auth0 from 'auth0-js'

export default {
    today: moment(),
    currentDay: moment(),
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
    })
}
