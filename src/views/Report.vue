<template>
  <div id="report">
    <div class="day" :class="{isLoading: isLoading}">
      <div class="header">
        <div class="header__copy">
          <div class="subtitle" @click.prevent="showPanel('calendar')">
            <span v-if="tasks.length">{{doneTasks.length}}</span>
            Tasks completed
          </div>
          <h3 class="title" @click.prevent="showPanel('calendar')">{{ title }}</h3>
        </div>
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
      <div class="empty-state content" v-if="this.doneTasks.length == 0">
        <div>
          <h3 class="empty-state__title">Nothing found</h3>
          <p class="empty-state__subtitle">You don't have any tasks for this dates</p>
        </div>
      </div>
      <!-- 200ms so that I can scroll comfortably and never miss -->
      <div v-else class="content">
        <task
          v-for="taskItem in doneTasks"
          v-bind:task.sync="taskItem"
          :important="true"
          :disabled="true"
        ></task>
      </div>
    </div>
    <panel id="calendar" title="Generate report for">
      <month mode="range" :action="rangeSelected" :range="{startDate: startDate, endDate: endDate}"></month>
      <div class="buttons">
        <btn @action="gotoLastWeek">Last Week</btn>
        <btn @action="gotoThisWeek">This Week</btn>
        <btn v-if="user.sub == 'auth0|5be5dd454aecba31291994c4'" @action="gotoAll">So Far</btn>
      </div>
    </panel>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import month from '@/components/Month'
import btn from '@/components/Button'
import panel from '@/components/Panel'
import task from '@/components/Task'

export default {
  name: 'Report',
  components: {
    btn,
    month,
    panel,
    task,
  },
  data() {
    return {
      attrs: {
        key: 'today',
        highlight: {
          backgroundColor: '#ff8080',
          // Other properties are available too, like `height` & `borderRadius`
        },
      },
      date: moment(this.dayId, 'YYYYMMDD'),
      days: [],
      startDate: null,
      isLoading: true,
      tasks: [],
      endDate: null,
      title: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    doneTasks() {
      return this.tasks.filter(task => {
        return task.done
      })
    },
  },
  beforeMount() {
    let today = moment().isoWeekday()

    if (today <= 2) {
      // monday or tuesday
      this.gotoLastWeek()
    } else {
      this.gotoThisWeek()
    }
  },
  methods: {
    rangeSelected(range) {
      this.startDate = range.startDate
      this.endDate = range.endDate
      this.showPanel('')
      this.getTasks()

      let startDate = moment(range.startDate, 'YYYYMMDD')
      let endDate = moment(range.endDate, 'YYYYMMDD')
      let today = moment()

      let startDateFormat = 'D'
      let endDateFormat = 'D MMM'
      if (
        !startDate.isSame(endDate, 'month') &&
        startDate.isSame(endDate, 'year')
      ) {
        startDateFormat += ' MMM'
      }
      if (!startDate.isSame(endDate, 'year')) {
        startDateFormat += ` 'YY`
        endDateFormat += ` 'YY`
      } else if (!startDate.isSame(today, 'year')) {
        endDateFormat += ` 'YY`
      }

      this.title =
        startDate.format(startDateFormat) +
        ' - ' +
        endDate.format(endDateFormat)
    },
    gotoLastWeek() {
      this.title = 'Last Week'
      let tempDay = moment().subtract(7, 'days')
      this.startDate = tempDay.isoWeekday(1).format('YYYYMMDD')
      this.endDate = tempDay.isoWeekday(7).format('YYYYMMDD')

      this.showPanel('')
      this.getTasks()
    },
    gotoThisWeek() {
      this.title = 'This Week'
      this.startDate = moment()
        .isoWeekday(1)
        .format('YYYYMMDD')
      this.endDate = moment()
        .isoWeekday(7)
        .format('YYYYMMDD')

      this.showPanel('')
      this.getTasks()
    },
    gotoAll() {
      this.title = 'So Far'
      this.startDate = moment('20161128').format('YYYYMMDD')
      this.endDate = moment().format('YYYYMMDD')
      this.showPanel('')
      this.getTasks()
    },
    showPanel(panelId) {
      this.$store.commit('changePanel', panelId)
    },
    // ////////////////////////////////////////////////////////////
    //
    // NETWORK
    //
    // ////////////////////////////////////////////////////////////
    getTasks() {
      this.isLoading = true
      this.days = []
      this.tasks = []

      if (!navigator.onLine) {
        return
      }
      axios
        .get(
          'https://api.zoreet.com/reports/' +
            this.startDate +
            '/' +
            this.endDate,
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
                .replace(/<div class="\s*[a-z]*\s*">\s*<\/div>/g, '') // empty divs
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

          this.isLoading = false
          this.error = ''
        })
        .catch(error => {
          let message = error.response.data.error.message

          this.error = message
        })
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
  position: fixed;
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
  opacity: 0.6;
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

@media (min-width: 1024px) {
  /* iPad and up */
  .header {
    align-items: flex-end;
  }
  .header__add-task {
    line-height: 14px;
  }
}
</style>
