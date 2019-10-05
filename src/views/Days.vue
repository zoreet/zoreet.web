<template>
  <!-- <Layout v-cloak :class="{editingTask: editingTask}">
    <template #main>
      <div id="days">
        <Day />
      </div>
    </template>

    <template #sheets>
      <panel id="calendar" title="Pick a date" v-if="showCalendar">
        <month :action="gotoDay" :date="currentDay"></month>
        <div class="buttons">
          <btn @action="gotoToday" role="secondary">Today</btn>
        </div>
      </panel>
    </template>

    <template #overlays>
      <Alert v-if="errorMessage" type="error">
        <template #message>There was an error accessing your account.</template>
        <template #action>
          <a href="#" @click.prevent="login">LOG IN</a>
        </template>
      </Alert>
    </template>
  </Layout>-->
  <div id="app">
    <div>activePanel: {{ activePanel }}</div>
    <div>currentDay: {{ currentDay }}</div>
    <div>editingTask: {{ editingTask }}</div>
    <div>errorMessage: {{ errorMessage }}</div>
    <div>tasks: {{ tasks }}</div>
    <div>today: {{ today }}</div>
    <div>token: {{ token }}</div>
    <div>user: {{ user }}</div>
  </div>
</template>

<script>
import Layout from '@/components/Layout'
import Day from '@/components/Day'
import Alert from '@/components/Alert'
import btn from '@/components/Button'
import month from '@/components/Month'
import panel from '@/components/Panel'
import { mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import Swipe from '@/modules/swipe' // keep this, I'm using it
import { mapState } from 'vuex'

export default {
  name: 'Days',
  data() {
    return {
      swipe: null,
      // user: {},
      // webAuth: null,
      isStandalone: localStorage.getItem('isStandalone'),
      loggedIn: false,
    }
  },
  components: {
    Alert,
    btn,
    Day,
    Layout,
    month,
    panel,
  },
  computed: {
    // ...mapState(['activePanel', 'currentDay', 'editingTask', 'errorMessage']),
    ...mapState([
      'currentDay',
      'editingTask',
      'errorMessage',
      'tasks',
      'today',
      'token',
      'user',
    ]),
    showCalendar() {
      return this.activePanel === 'calendar'
    },
    activePanel() {
      return this.$store.state.activePanel
    },
  },
  created() {
    // this.$store.commit('addDay', this.currentDay)
    // let yesterdayId = moment(this.currentDay)
    //   .subtract(1, 'days')
    //   .format('YYYYMMDD')
    // this.$store.commit('addDay', yesterdayId)
    // let tomorrowId = moment(this.currentDay)
    //   .add(1, 'days')
    //   .format('YYYYMMDD')
    // this.$store.commit('addDay', tomorrowId)
  },
  mounted() {
    let that = this
    setTimeout(function() {
      that.$store.commit('changePanel', 'xxx')
    }, 2000)
    // let that = this
    // document.querySelector('#days').addEventListener('swipeLeft', function() {
    //   if (!that.activePanel) that.gotoNextDay()
    // })
    // document.querySelector('#days').addEventListener('swipeRight', function() {
    //   if (!that.activePanel) that.gotoPrevDay()
    // })
  },
  methods: {
    ...mapActions(['login', 'gotoDay']),
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
  },
}
</script>

<style>
#days {
  display: flex;
  height: 100%;
  /* position: absolute; */
  /* transform: scale(0.5); */
  width: 100%;
}

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
  position: absolute;
  top: 0;
  width: 100%;
  transition: transform 0.4s;
}
.window--past {
  transform: translateX(calc(-100% - 100px));
}
.window--future {
  transform: translateX(calc(100% + 100px));
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
