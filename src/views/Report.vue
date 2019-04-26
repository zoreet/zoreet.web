<template>
  <div :id="id" class="day" :class="{isLoading: isLoading}">
    <div class="header">
      <div>
        <div class="subtitle">
          {{ dateSubtitle }}
          <span v-if="isToday">- Today</span>
        </div>
        <h3 class="title">{{ dateTitle }}</h3>
      </div>
    </div>
    <div class="empty-state content" v-if="this.tasks.length == 0">
      <div>
        <h3 class="empty-state__title">Nothing found</h3>
        <p class="empty-state__subtitle">You don't have any tasks for this dates</p>
      </div>
    </div>
    <!-- 200ms so that I can scroll comfortably and never miss -->
    <div v-else class="content">
      <task
        v-for="taskItem in tasks"
        :key="taskItem.id"
        v-bind:task.sync="taskItem"
        :important="(isPast && taskItem.done == true) || (!isPast && taskItem.done == false)"
        @addEmptyTaskAfter="addEmptyTaskAfter"
        @updateTask="updateTask"
        @removeTask="removeTask"
        :autofocus="taskItem.id == focusedTask"
      ></task>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import task from '@/components/Task'

export default {
  name: 'Day',
  props: {
    dayId: String,
    id: String,
  },
  components: {
    task,
  },
  data() {
    return {
      date: moment(this.dayId, 'YYYYMMDD'),
      drag: false,
      focusedTask: -1,
      isLoading: true,
      fromDate: '20190422',
      tillDate: '20190428',
      tasks: [],
      days: [],
    }
  },
  computed: {
    isVisible() {
      return this.date.isSame(this.$store.state.currentDay, 'day')
    },
    isPast() {
      return this.date.isBefore(this.$store.state.today, 'day')
    },
    isToday() {
      return this.date.isSame(this.$store.state.today, 'day')
    },
    isFuture() {
      return this.date.isAfter(this.$store.state.today, 'day')
    },
    dateTitle() {
      return 'This week'
    },
    dateSubtitle() {
      return this.fromDate + ' - ' + this.tillDate
    },
  },
  beforeMount() {
    this.fromDate = moment()
      .isoWeekday(1)
      .format('YYYYMMDD')
    this.tillDate = moment()
      .isoWeekday(7)
      .format('YYYYMMDD')

    this.fromDate
  },
  mounted() {
    if (this.isVisible) {
      this.loadTasks()
    }

    this.getTasks()
  },
  methods: {
    // ////////////////////////////////////////////////////////////
    //
    // NETWORK
    //
    // ////////////////////////////////////////////////////////////
    getTasks() {
      this.isLoading = true
      if (!navigator.onLine) {
        return
      }
      axios
        .get(
          'https://api.zoreet.com/reports/' +
            this.fromDate +
            '/' +
            this.tillDate,
          {
            headers: { Authorization: 'Bearer ' + this.$store.state.token },
          }
        )
        .then(response => {
          this.days = response.data.days
          this.days.sort((a, b) => {
            let aDate = parseInt(a.date)
            let bDate = parseInt(b.date)

            if (aDate < bDate) return -1
            return 0
          })

          this.days.forEach(day => {
            let rawTasks = day.tasks
            try {
              let tasks = JSON.parse(rawTasks)
              day.tasks = tasks
            } catch (e) {
              day.tasks = rawTasks
                .replace(/<br>/g, '')
                .replace(/\<div class\=\"\s*[a-z]*\s*\"\>\s*\<\/div\>/g, '') // empty divs
                .split('</div>')
                .filter(task => task.length)
                .map((task, index) => {
                  let done = task.indexOf('<div class="active">') !== -1
                  let title = task.trim().replace(/(<([^>]+)>)/gi, '') // all tags
                  let id = parseInt(day.date) + index

                  return {
                    id: id,
                    title: title,
                    done: done,
                  }
                })
                .filter(task => task.title.length)
            }
          })

          this.days.forEach(day => {
            day.tasks.forEach(task => {
              this.tasks.push({
                id: task.id,
                title: task.title,
                done: task.done,
                date: day.date,
              })
            })
          })

          this.showMenu = false
          this.isLoading = false
          this.error = ''
        })
        .catch(error => {
          let code = error.response.status
          let message = error.response.data.error.message

          this.error = message
        })
    },
    sortTasks() {
      // done tasks on top, because I care to report on what tasks I've done
      if (this.isPast) {
        this.tasks = this.tasks.sort(function(b, a) {
          if (b.done && !a.done) {
            return -1
          }

          return 0
        })
      } else {
        // pending tasks on top, so I need to know what I need to work on
        this.tasks = this.tasks.sort(function(b, a) {
          if (a.done && !b.done) {
            return -1
          }

          return 0
        })
      }
    },
    onDragEnd(event) {
      let index = event.newIndex
      let movedTask = this.tasks[index]
      let prevTask = this.tasks[index - 1]
      let nextTask = this.tasks[index + 1]

      // The logic goes as follows
      // when between two tasks of the same kind you become the same kind
      if (prevTask && nextTask) {
        if (
          prevTask.done == nextTask.done &&
          prevTask.done !== movedTask.done
        ) {
          movedTask.done = prevTask.done
        }
      }
      if (this.isPast) {
        // when in the past, done tasks stay on top
        // so if you're the top task and below you there are done tasks, you become done
        if (index == 0 && movedTask.done == false && nextTask.done == true) {
          movedTask.done = true
        } else if (
          // if you're the last tasks, and above you there are pending tasks, you become pending
          index == this.tasks.length - 1 &&
          movedTask.done == true &&
          prevTask.done == false
        ) {
          movedTask.done = false
        }
      } else {
        // in the present and future, pending tasks are at the top
        // so if you're the top task and below you there are pending tasks, you become pending
        if (index == 0 && movedTask.done == true && nextTask.done == false) {
          movedTask.done = false
        } else if (
          // if you're the last tasks, and above you there are done tasks, you become dibe
          index == this.tasks.length - 1 &&
          movedTask.done == false &&
          prevTask.done == true
        ) {
          movedTask.done = true
        }
      }
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
        }
      })
    },
    showPannel(pannelId) {
      this.$store.commit('changePanel', pannelId)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.day {
  background-color: var(--default--strong);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
  border-radius: 8px 8px 0 0;
}
.header {
  align-items: flex-end;
  box-sizing: content-box;
  display: flex;
  flex: 0 0 auto;
  margin-bottom: 0;
  padding: 32px 16px 14px;
  position: relative;
}
.header:after {
  background-color: var(--acent);
  background-image: linear-gradient(
    17deg,
    var(--warning) 0%,
    var(--accent) 50%,
    var(--extra--light) 100%
  );
  bottom: 0;
  content: '';
  display: block;
  height: 4px;
  position: absolute;
  width: calc(100% - 32px);
}
.title {
  color: var(--default--text--strong);
  font-size: 32px;
  font-weight: 700;
}
.subtitle {
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--default--text);
}
.content {
  background-color: var(--default--strong);
  flex: 1 1 auto;
  justify-content: flex-start;
  overflow: scroll;
  padding: 14px 0 60px;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}

.editingTask .content {
  padding-bottom: 0;
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

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
.empty-state__subtitle {
  font-size: 14px;
  margin: 4px 0 24px;
  opacity: 0.6;
}

.reorder-list-move {
  transition: transform 0.3s;
}

.empty-state__title {
  color: var(--default--text--strong);
}
</style>
