<template>
  <div :id="id" class="day" :class="{isLoading: isLoading}">
    <div class="header">
      <div class="header__copy">
        <div class="subtitle" @click.prevent="showPanel('calendar')">
          {{ dateSubtitle }}
          <span v-if="isToday">- Today</span>
        </div>
        <h3 class="title" @click.prevent="showPanel('calendar')">{{ dateTitle }}</h3>
      </div>

      <a href="#" class="header__add-task" @click.prevent="addFirstEmptyTask">+</a>
      <a href="#" class="calendar" @click.prevent="showPanel('calendar')">
        <svg
          width="24px"
          height="25px"
          viewBox="0 0 30 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="calendar" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              d="M6,2 C6.27614237,2 6.5,2.22385763 6.5,2.5 C6.5,2.77614237 6.27614237,3 6,3 L4,3 C2.34314575,3 1,4.34314575 1,6 L1,28 C1,29.6568542 2.34314575,31 4,31 L26,31 C27.6568542,31 29,29.6568542 29,28 L29,6 C29,4.34314575 27.6568542,3 26,3 L24,3 C23.7238576,3 23.5,2.77614237 23.5,2.5 C23.5,2.22385763 23.7238576,2 24,2 L26,2 C28.209139,2 30,3.790861 30,6 L30,28 C30,30.209139 28.209139,32 26,32 L4,32 C1.790861,32 2.705415e-16,30.209139 0,28 L0,6 C-2.705415e-16,3.790861 1.790861,2 4,2 L6,2 Z"
              id="Path"
              fill="#000000"
              fill-rule="nonzero"
            ></path>
            <rect id="Rectangle" fill="#000000" x="1" y="12" width="28" height="1"></rect>
            <path
              d="M19,2 C19.2761424,2 19.5,2.22385763 19.5,2.5 C19.5,2.77614237 19.2761424,3 19,3 L11,3 C10.7238576,3 10.5,2.77614237 10.5,2.5 C10.5,2.22385763 10.7238576,2 11,2 L19,2 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M9,5.05000906 C10.1411202,5.28164422 11,6.29052104 11,7.5 C11,8.88071187 9.88071187,10 8.5,10 C7.11928813,10 6,8.88071187 6,7.5 C6,6.29052104 6.85887984,5.28164422 8,5.05000906 L8,0.5 C8,0.223857625 8.22385763,0 8.5,0 C8.77614237,0 9,0.223857625 9,0.5 L9,5.05000906 Z M8.5,9 C9.32842712,9 10,8.32842712 10,7.5 C10,6.67157288 9.32842712,6 8.5,6 C7.67157288,6 7,6.67157288 7,7.5 C7,8.32842712 7.67157288,9 8.5,9 Z"
              id="Combined-Shape"
              fill="#000000"
            ></path>
            <path
              d="M22,5.05000906 C23.1411202,5.28164422 24,6.29052104 24,7.5 C24,8.88071187 22.8807119,10 21.5,10 C20.1192881,10 19,8.88071187 19,7.5 C19,6.29052104 19.8588798,5.28164422 21,5.05000906 L21,0.5 C21,0.223857625 21.2238576,0 21.5,0 C21.7761424,0 22,0.223857625 22,0.5 L22,5.05000906 Z M21.5,9 C22.3284271,9 23,8.32842712 23,7.5 C23,6.67157288 22.3284271,6 21.5,6 C20.6715729,6 20,6.67157288 20,7.5 C20,8.32842712 20.6715729,9 21.5,9 Z"
              id="Combined-Shape-Copy"
              fill="#000000"
            ></path>
          </g>
        </svg>
      </a>
    </div>
    <div class="empty-state content" v-if="this.tasks.length == 0">
      <div>
        <h3 class="empty-state__title">Start planning your day</h3>
        <p class="empty-state__subtitle">You don't have any tasks added for this day</p>
        <div>
          <btn @action="addFirstEmptyTask">Add first task</btn>
        </div>
      </div>
    </div>
    <!-- 200ms so that I can scroll comfortably and never miss -->
    <draggable
      v-else
      v-model="tasks"
      @end.prevent="onDragEnd"
      delay="200"
      class="content"
      :options="{disabled: editingTask}"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group :name="!drag ? 'reorder-list' : null">
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
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import draggable from 'vuedraggable'
import task from './Task'
import btn from './Button'

export default {
  name: 'Day',
  props: {
    dayId: String,
    id: String,
  },
  components: {
    btn,
    draggable,
    task,
  },
  data() {
    return {
      date: moment(this.dayId, 'YYYYMMDD'),
      drag: false,
      focusedTask: -1,
      isLoading: true,
      tasks: [],
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
      let now = moment()

      if (now.year() == this.date.year()) return this.date.format('DD MMMM')
      else return this.date.format('DD MMM Y')
    },
    dateSubtitle() {
      return this.date.format('dddd')
    },
    editingTask() {
      return this.$store.state.editingTask
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
          this.$store.commit('errorMessage', '')

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

          this.sortTasks()
        })
        .catch(error => {
          let message = JSON.stringify(error)
          this.$store.commit('errorMessage', message)
        })

      setTimeout(() => {
        if (this.isLoading) {
          this.isLoading = false
          this.$store.commit(
            'errorMessage',
            `We couldn't load your task for this day. Try again later.`
          )
        }
      }, 10000)
    },
    saveTasks() {
      if (!navigator.onLine) {
        return
      }

      this.sortTasks()

      axios
        .post(
          'https://api.zoreet.com/days/' + this.dayId,
          { tasks: JSON.stringify(this.tasks) },
          { headers: { Authorization: 'Bearer ' + this.$store.state.token } }
        )
        .then(() => {
          this.$store.commit('errorMessage', '')
        })
        .catch(error => {
          let message = error.response.data.error.message
          this.$store.commit('errorMessage', message)
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
      this.saveTasks()
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
    addFirstEmptyTask() {
      let newTask = {
        id: Date.now(),
        title: '',
        done: false,
      }
      this.tasks.unshift(newTask)
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
    showPanel(pannelId) {
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
  border-radius: 10px 10px 0 0;
}
.header {
  align-items: flex-start;
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
.header__copy {
  flex: 1 0 auto;
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
  color: var(--default--text);
}

.reorder-list-move {
  transition: transform 0.3s;
}

.empty-state__title {
  color: var(--default--text--strong);
}

.calendar {
  border: 0 none;
  border-radius: 6px;
}
.calendar svg * {
  fill: var(--accent--strong);
}

.header__add-task {
  font-size: 34px;
  line-height: 20px;
  color: var(--accent--strong);
  text-decoration: none;
  height: 25px;
  width: 24px;
  text-align: center;
  margin-right: 24px;
  font-weight: 200;
  display: inline-block;
}

@media (min-width: 1024px) {
  /* iPad and up */
  .day {
    border-radius: 0;
  }
  .header {
    align-items: flex-end;
  }
  .header__add-task {
    line-height: 14px;
  }
}
</style>