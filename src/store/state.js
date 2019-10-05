import moment from 'moment'
import auth0 from 'auth0-js'

export default {
  activePanel: null,
  currentDay: moment().format('YYYYMMDD'),
  editingTask: false,
  errorMessage: null,
  tasks: [],
  today: moment().format('YYYYMMDD'),
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
}
