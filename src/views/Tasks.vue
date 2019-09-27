<template>
  <Layout v-cloak :class="{editingTask: editingTask}">
    <template #main>
      <div id="tasks" :style="scrollPosition">
        <Day
          v-for="day in days"
          :key="day.id"
          :dayId="day.id"
        />
      </div>
    </template>

    <template #sheets>
      <panel id="calendar" title="Pick a date">
        <month :action="gotoDay" :date="currentDayId"></month>
        <div class="buttons">
          <btn @action="gotoToday" role="secondary">Today</btn>
        </div>
      </panel>
    </template>

    <template #overlays>
      <Alert v-if="errorMessage" type="error">
        <template #message>
          There was an error accessing your account.
        </template>
        <template #action>
          <a href="#" @click.prevent="login">LOG IN</a>
        </template>
      </Alert>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import Alert from '@/components/Alert'
import btn from '@/components/Button'
import Day from '@/components/Day'
import moment from 'moment'
import month from '@/components/Month'
import panel from '@/components/Panel'
import { mapActions } from 'vuex'
import Swipe from '@/modules/swipe' // keep this, I'm using it

export default {
  name: 'Tasks',
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
    Alert,
    btn,
    Day,
    Layout,
    month,
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
    scrollPosition() {
      let i = 0;
      for(i=0; i<this.days.length; i++) {
        if( this.days[i] && this.days[i].id == this.currentDayId ) {

        }
      }
      if( i ) {
        return 'transform: translateX(' + ( ( 1 - i ) * 100 ) + '%)'
      }

      return ''
    }
  },
  created() {
    this.$store.commit('addDay', this.currentDayId)

    let yesterdayId = moment(this.currentDayId)
      .subtract(1, 'days')
      .format('YYYYMMDD')
    this.$store.commit('addDay', yesterdayId)
    let tomorrowId = moment(this.currentDayId)
      .add(1, 'days')
      .format('YYYYMMDD')
    this.$store.commit('addDay', tomorrowId)
  },
  mounted() {
    let that = this

    document
      .querySelector('#tasks')
      .addEventListener('swipeLeft', function() {
        if (!that.activePanel) that.gotoNextDay()
      })
    document
      .querySelector('#tasks')
      .addEventListener('swipeRight', function() {
        if (!that.activePanel) that.gotoPrevDay()
      })
  },
  methods: {
    ...mapActions([
      'login'
    ]),
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
  },
}
</script>

<style>
#tasks {
  display: flex;
  height: 100%;
  position: absolute;
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
