export default {
  newToday(state, date) {
    state.today = ''
    state.today = date
  },
  gotoDay(state, date) {
    let lastViewedDay = JSON.stringify({
      id: date,
      when: state.today,
    })

    state.currentDay = date

    localStorage.setItem('lastViewedDay', lastViewedDay)
  },
  saveTasks(state, tasks) {
    Object.assign(state.tasks, tasks)
  },
  changePanel(state, panelId) {
    state.activePanel = panelId
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
    state.errorMessage = ''
  },
  startEditingTask(state) {
    state.editingTask = true
  },
  doneEditingTask(state) {
    state.editingTask = false
  },
}
