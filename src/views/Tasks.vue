<template>
  <div id="tasks" v-cloak :class="{editingTask: editingTask}">
    <alert id="refresh" type="info" :action="refresh" style="display: none">
      <strong>A new version is available.</strong>
      <p>Press here to get the latest changes</p>
    </alert>
    <alert v-if="errorMessage" type="error" :action="login">
      <strong>There was an error connecting to the server</strong>
      <p>Press here to log in again and fix the error</p>
    </alert>

    <div class="windows">
      <div
        v-for="day in days"
        :key="day.id"
        class="window"
        :class="{'window--past': day.id - currentDayId < 0, 'window--future': day.id - currentDayId > 0, 'window--current': day.id == currentDayId }"
      >
        <day id="editor" :dayId="day.id"></day>
      </div>
    </div>
    <panel id="calendar" title="Pick a date">
      <month :action="gotoDay" :date="currentDayId"></month>
      <div class="buttons">
        <btn @action="gotoToday" role="secondary">Today</btn>
      </div>
    </panel>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.js'
import alert from '@/components/Alert'
import auth0 from 'auth0-js'
import btn from '@/components/Button'
import day from '@/components/Day'
import moment from 'moment'
import month from '@/components/Month'
import navbar from '@/components/Navbar'
import panel from '@/components/Panel'
import Swipe from '@/modules/swipe' // keep this, I'm using it
// import Component from '@/components/Component.vue'

export default {
  name: 'app',
  data() {
    return {
      swipe: null,
      user: {},
      webAuth: null,
      isStandalone: localStorage.getItem('isStandalone'),
      loggedIn: false,
    }
  },
  components: {
    // Component,
    alert,
    btn,
    day,
    month,
    navbar,
    panel,
  },
  computed: {
    days() {
      return this.$store.state.days
    },
    currentDayId() {
      return this.$store.state.currentDay.format('YYYYMMDD')
    },
    activePanel() {
      return this.$store.state.activePanel
    },
    errorMessage() {
      return this.$store.state.errorMessage
    },
    editingTask() {
      return this.$store.state.editingTask
    },
  },
  mounted() {
    let that = this

    this.$store.commit('addDay', this.currentDayId)

    let yesterdayId = moment(this.currentDayId)
      .subtract(1, 'days')
      .format('YYYYMMDD')
    this.$store.commit('addDay', yesterdayId)
    let tomorrowId = moment(this.currentDayId)
      .add(1, 'days')
      .format('YYYYMMDD')
    this.$store.commit('addDay', tomorrowId)

    document
      .querySelector('.windows')
      .addEventListener('swipeLeft', function() {
        if (!that.activePanel) that.gotoNextDay()
      })
    document
      .querySelector('.windows')
      .addEventListener('swipeRight', function() {
        if (!that.activePanel) that.gotoPrevDay()
      })
  },
  methods: {
    // ////////////////////////////////////////////////////////////
    //
    // DAYS
    //
    // ////////////////////////////////////////////////////////////
    gotoPrevDay() {
      this.$store.dispatch('gotoDay', { step: -1 })
    },
    gotoNextDay() {
      this.$store.dispatch('gotoDay', { step: 1 })
    },
    gotoToday() {
      this.$store.dispatch('gotoDay', { today: true })
    },
    gotoDay(date) {
      this.$store.dispatch('gotoDay', { id: date })
    },

    // ////////////////////////////////////////////////////////////
    //
    // UI
    //
    // ////////////////////////////////////////////////////////////
    swipeHandler(direction, event) {
      if (event.target.type !== 'textarea') {
        if (direction == 'left') {
          this.gotoNextDay()
        } else if (direction == 'right') {
          this.gotoPrevDay()
        }
      }
    },
    refresh() {
      window.location.reload(true)
    },
    // ////////////////////////////////////////////////////////////
    //
    // USER
    //
    // ////////////////////////////////////////////////////////////
    login() {},
  },
}
</script>

<style>
.windows {
  flex: 1 0 auto;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
  left: 0px;
}

.window {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.4s;
}
.window--past {
  transform: translateX(calc(-100vw - 100px));
}
.window--future {
  transform: translateX(calc(100vw + 100px));
}

textarea {
  font-size: 16px;
  width: 100%;
}

.buttons {
  margin-top: 16px;
  display: flex;
}
.buttons .button {
  flex: 1 1 auto;
}
</style>
