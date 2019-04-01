<template>
  <div :id="id" class="page">
    <div class="page__header">
      <div class="page__subtitle">{{ dateSubtitle }}</div>
      <h3 class="page__title">{{ dateTitle }}</h3>
    </div>
    <div class="page__content">
      <div v-for="task in tasks" :key="task.id">{{task.title}}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Page',
  props: {
    dayId: String,
    id: String,
  },
  data() {
    return {
      tasks: [],
      date: moment(this.dayId, 'YYYYMMDD'),
      isLoading: false,
    }
  },
  computed: {
    isVisible() {
      return this.date.isSame(this.$store.state.currentDay, 'day')
    },
    dateTitle() {
      let now = moment()

      if (now.year() == this.date.year()) return this.date.format('DD MMM')
      else return this.date.format('DD MMM Y')
    },
    dateSubtitle() {
      return this.date.format('dddd')
    },
  },
  mounted() {
    this.loadTasks()

    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'gotoDay':
          if (this.isVisible) this.loadTasks()
          break
        case 'changeTask':
          if (this.isVisible) this.saveTasks()
          break
      }
    })
  },
  methods: {
    // ////////////////////////////////////////////////////////////
    //
    // TASKS
    //
    // ////////////////////////////////////////////////////////////
    editTask() {
      this.$store.dispatch('editTask', {
        task: this.$store.state.tasks[0],
        title: 'Vlad',
      })
    },
    loadTasks() {
      console.log('Loading tasks for', this.date.format('YYYYMMDD'))
      this.isLoading = true
      if (!navigator.onLine) {
        return
      }
      axios
        .get('https://api.zoreet.com/days/' + this.date.format('YYYYMMDD'), {
          headers: { Authorization: 'Bearer ' + this.$store.state.token },
        })
        .then(response => {
          let rawTasks = response.data.day.tasks
          let tasks

          this.showMenu = false
          this.isLoading = false
          this.error = ''

          try {
            tasks = JSON.parse(rawTasks)
            this.tasks = tasks
            this.sortTasks()

            if (this.tasks.length == 0) {
              this.addEmptyTask()
            }
          } catch (e) {
            this.tasks = rawTasks
              .replace(/<br>/g, '')
              .replace(/\<div class\=\"\s*[a-z]*\s*\"\>\s*\<\/div\>/g, '') // empty divs
              .split('</div>')
              .filter(task => task.length)
              .map((task, index) => {
                let done = task.indexOf('<div class="active">') !== -1
                let title = task.trim().replace(/(<([^>]+)>)/gi, '') // all tags
                let id = parseInt(this.date) + index

                return {
                  id: id,
                  title: title,
                  done: done,
                }
              })
              .filter(task => task.title.length)
            this.sortTasks()
          }
        })
        .catch(error => {
          console.log(error)
          let code = error.response.status
          let message = error.response.data.error.message

          if (message.indexOf('expired') >= 0) {
            this.silentLogin()
          }

          this.error = message
        })
    },
    sortTasks() {
      this.tasks = this.tasks.sort(function(b, a) {
        if (a.done && !b.done) {
          return -1
        }

        return 0
      })
    },
    saveTasks() {
      console.log('Saving tasks for', this.date.format('YYYYMMDD'))
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  background-color: var(--back);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.page__header {
  background-color: var(--accent);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  height: 107px;
  justify-content: center;
  margin-bottom: 0;
  padding: 0 16px;
  text-decoration: none;
}
.page__title {
  font-size: 32px;
  font-weight: 700;
  margin-top: 4px;
}
.page__subtitle {
  font-size: 13px;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
}
.page__content {
  background-color: var(--back);
  flex: 1 1 auto;
  justify-content: flex-start;
  overflow: scroll;
  padding: 0 16px;
}
</style>
