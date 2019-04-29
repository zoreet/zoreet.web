<template>
  <div class="month">
    <div class="header">
      <div class="pagination" @click="prevMonth"></div>
      <div class="title">{{title}}</div>
      <div class="pagination" @click="nextMonth"></div>
    </div>
    <div class="days weekdays">
      <div class="day">M</div>
      <div class="day">T</div>
      <div class="day">W</div>
      <div class="day">T</div>
      <div class="day">F</div>
      <div class="day">S</div>
      <div class="day">S</div>
    </div>
    <div class="days">
      <div
        v-for="day in days"
        :key="day.id"
        class="day"
        :class="{
            active: ( day.date == currentDayId ),
            today: ( day.date == todayId )
          }"
      >
        <span class="day--label" @click="changeDate(day.date)" v-if="day.id > 0">{{day.id}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Month',
  props: {
    action: Function,
    date: String,
  },
  data() {
    return {
      days: [],
      visibleMonthId: null,
    }
  },
  computed: {
    currentDayId() {
      return parseInt(this.date) || moment().format('YYYYMMDD')
    },
    visibleMonth: {
      get() {
        return moment(this.visibleMonthId, 'YYYYMMDD')
      },
      set(newMonth) {
        this.visibleMonthId = newMonth.format('YYYYMMDD')
      },
    },
    todayId() {
      return moment().format('YYYYMMDD')
    },
    lastDay() {
      let day = this.visibleMonth.endOf('month').format('DD')

      day = parseInt(day)

      if (day) return day
      return null
    },
    title() {
      return this.visibleMonth.format('MMMM YYYY')
    },
  },
  created() {
    this.visibleMonthId = this.currentDayId
    this.generateData()
  },
  methods: {
    generateData() {
      let tempDate = this.visibleMonth
      let days = [...Array(this.lastDay).keys()]
      this.days = days.map(day => {
        return {
          id: day + 1,
          date: tempDate.set('date', day + 1).format('YYYYMMDD'),
        }
      })
      // hack so that I can align the first day so it coresponds to the right day of the week
      let i =
        moment(this.days[0].date)
          .startOf('month')
          .isoWeekday() - 1
      for (; i > 0; i--) {
        this.days.unshift({
          id: 0 - i,
          date: null,
        })
      }
    },
    changeDate(date) {
      this.action(date)
    },
    prevMonth() {
      this.visibleMonth = this.visibleMonth.subtract(1, 'months')
      this.generateData()
    },
    nextMonth() {
      this.visibleMonth = this.visibleMonth.add(1, 'months')
      this.generateData()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.month {
  background: var(--default--strong);
  border: 1px solid var(--default);
  border-radius: 10px;
  color: var(--default--text);
  padding: 8px 0;
}
.header {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  padding: 14px 0 20px;
  text-align: center;
}
.title {
  color: var(--default--text--strong);
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.pagination {
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  margin: 0 auto;
  position: relative;
  width: 24px;
}
.pagination:before {
  border-style: solid;
  border-width: 0 0 2px 2px;
  border-color: var(--default--text--strong);
  content: '';
  display: block;
  height: 10px;
  left: calc(50% - 4px);
  position: absolute;
  top: calc(50% - 6px);
  transform: rotate(45deg);
  width: 10px;
}
.pagination:last-of-type:before {
  transform: rotate(225deg) translateX(4px) translateY(-4px);
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.days.weekdays {
  border-bottom: 1px solid;
  opacity: 0.7;
}
.weekdays .day {
  font-size: 10px;
  height: 14px;
  line-height: 14px;
  text-transform: capitalize !important;
}
.day {
  align-items: center;
  display: flex;
  font-size: 14px;
  height: 38px;
  justify-content: center;
}
.day--label {
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 28px;
  line-height: 28px;
  text-align: center;
  width: 28px;
}
.day--label:hover {
  background-color: var(--default--dark);
}
.today .day--label {
  font-weight: bold;
  color: var(--accent);
}
.day.active .day--label {
  background-color: var(--default--text--strong);
  color: var(--default);
}
.today.active .day--label {
  background-color: var(--accent);
}
</style>
