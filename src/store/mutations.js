import moment from 'moment'
import Vue from 'vue';

export default {
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
  clearErrorMessage(state) {
    if (state.errorMessage !== '')
    state.errorMessage = ''
  },
  editingTask(state, newState) {
    state.editingTask = newState
  },
}
