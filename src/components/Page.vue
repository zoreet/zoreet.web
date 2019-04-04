<template>
  <div :id="id" class="page" :class="{isLoading: isLoading}">
    <div class="header">
      <div class="subtitle">{{ dateSubtitle }}</div>
      <h3 class="title">{{ dateTitle }}</h3>
    </div>
    <draggable v-model="tasks" @end="saveTasks" delay="200" class="content">
      <task
        v-for="taskItem in tasks"
        :key="taskItem.id"
        v-bind:task.sync="taskItem"
        @addEmptyTaskAfter="addEmptyTaskAfter"
        @updateTask="updateTask"
        @removeTask="removeTask"
        :autofocus="taskItem.id == focusedTask"
      ></task>
    </draggable>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import draggable from 'vuedraggable'
import task from './Task'

export default {
  name: 'Page',
  props: {
    dayId: String,
    id: String,
  },
  components: {
    task,
    draggable,
  },
  data() {
    return {
      date: moment(this.dayId, 'YYYYMMDD'),
      isLoading: false,
      focusedTask: 0,
      tasks: [],
    }
  },
  computed: {
    isVisible() {
      return this.date.isSame(this.$store.state.currentDay, 'day')
    },
    dateTitle() {
      let now = moment()

      if (now.year() == this.date.year()) return this.date.format('DD MMMM')
      else return this.date.format('DD MMM Y')
    },
    dateSubtitle() {
      return this.date.format('dddd')
    },
    doneTasksTitle() {
      return 'Done tasks'
    },
    unfinishedTasksTitle() {
      return 'Unfinished tasks'
    },
  },
  mounted() {
    if (this.isVisible) {
      this.loadTasks()
    }

    this.$store.subscribe(mutation => {
      switch (mutation.type) {
        case 'gotoDay':
          if (this.isVisible) {
            this.loadTasks()
          }
          break
      }
    })
  },
  methods: {
    loadTasks() {
      console.log('Loading tasks for', this.dayId)
      this.isLoading = true
      if (!navigator.onLine) {
        return
      }
      axios
        .get('https://api.zoreet.com/days/' + this.dayId, {
          headers: { Authorization: 'Bearer ' + this.$store.state.token },
        })
        .then(response => {
          let rawTasks = response.data.day.tasks

          this.isLoading = false
          this.error = ''

          try {
            this.tasks = JSON.parse(rawTasks)
          } catch (e) {
            this.tasks = rawTasks
              .replace(/<br>/g, '')
              .replace(/<div class="\s*[a-z]*\s*">\s*<\/div>/g, '') // empty divs
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
          }

          if (this.tasks.length && this.isVisible) {
            console.log(this.dayId, 'gets focused')
            this.$nextTick(() => {
              this.focusedTask = this.tasks[this.tasks.length - 1].id
            })
          } else if (this.tasks.length == 0) {
            this.addEmptyTask()
          }
        })
        .catch(error => {
          console.log(error)
          let message = error.response.data.error.message

          if (message.indexOf('expired') >= 0) {
            this.silentLogin()
          }

          this.error = message
        })
    },
    saveTasks() {
      console.log('Saving tasks for', this.dayId)
      if (!navigator.onLine) {
        return
      }

      axios
        .post(
          'https://api.zoreet.com/days/' + this.dayId,
          { tasks: JSON.stringify(this.tasks) },
          { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
        )
        .then(() => {
          this.error = ''
        })
        .catch(error => {
          let message = error.response.data.error.message

          if (message.indexOf('expired') >= 0) {
            this.silentLogin()
          }

          this.error = message
        })
    },
    addEmptyTask() {
      let newTask = {
        id: Date.now(),
        title: '',
        done: false,
      }
      this.tasks.push(newTask)
      this.$nextTick(function() {
        this.focusedTask = newTask.id
      })
    },
    addEmptyTaskAfter(task) {
      let index = this.findTaskById(task.id)
      let newTask = {
        id: Date.now(),
        title: '',
        done: task.done,
      }
      this.tasks.splice(index + 1, 0, newTask)
      this.$nextTick(function() {
        this.focusedTask = newTask.id
      })
    },
    updateTask(task) {
      let index = this.findTaskById(task.id)
      this.tasks[index] = task
      this.saveTasks()
    },
    findTaskById(id) {
      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) {
          return i
        }
      }
    },
    removeTask(task) {
      if (task.id == undefined) return false

      let index = this.findTaskById(task.id)
      this.tasks.splice(index, 1)
      this.saveTasks()

      this.$nextTick(() => {
        if (index) {
          this.focusedTask = this.tasks[index - 1].id
        } else if (this.tasks.length) {
          this.focusedTask == this.tasks[0].id
        } else {
          this.addEmptyTask()
        }
      })
    },
  },
  watch: {
    isVisible() {
      this.focusedTask = ''
      if (this.tasks.length && this.tasks.length)
        this.focusedTask = this.tasks[this.tasks.length - 1].id
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
.header {
  background-color: var(--accent);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  height: 107px;
  box-sizing: content-box;
  justify-content: center;
  margin-bottom: 0;
  padding: 0 16px;
  text-decoration: none;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
.title {
  font-size: 32px;
  font-weight: 700;
  margin-top: 4px;
}
.subtitle {
  font-size: 13px;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
}
.content {
  background-color: var(--back);
  flex: 1 1 auto;
  justify-content: flex-start;
  overflow: scroll;
  padding: 20px 0 40px;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}

.isLoading .content > * {
  display: none;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.isLoading .content:after {
  animation: rotate 0.8s infinite linear;
  border: 8px solid;
  border-radius: 50%;
  border-right-color: transparent;
  content: '';
  display: block;
  height: 28px;
  left: 50%;
  margin: -14px 0 0 -14px;
  position: absolute;
  top: 50%;
  width: 28px;
}

.tasks-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 32px;
}
</style>
