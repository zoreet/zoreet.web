<template>
  <div id="app" v-cloak v-touch:swipe="swipeHandler">
    <div class="window">
      <div>day: {{day.id}} {{ day.isToday}}</div>
      <!-- <Component msg="Yes" id="editor"></Component> -->
      <button @click.prevent="gotoPrevDay">Prev</button>
      <button @click.prevent="gotoToday">Today</button>
      <button @click.prevent="gotoNextDay">Next</button>
      <div>
        <button @click.prevent="editTask">Change to vlad</button>
      </div>

      <ul>
        <li v-for="task in tasks">{{task.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Component from './components/Component.vue'

export default {
  name: 'app',
  components: {
    // Component,
  },
  computed: {
    day() {
      return this.$store.getters.day
    },
    today() {
      return this.$store.state.today
    },
    tasks() {
      return this.$store.state.tasks
    },
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == 'changeDay') {
        this.loadTasks()
      } else if (mutation.type == 'changeTask') {
        this.saveTasks()
      }
    })
  },
  methods: {
    // Days
    gotoPrevDay() {
      this.$store.commit('changeDay', { step: -1 })
    },
    gotoNextDay() {
      this.$store.commit('changeDay', { step: 1 })
    },
    gotoToday() {
      this.$store.commit('changeDay', { today: true })
    },

    //Tasks
    editTask() {
      this.$store.commit('editTask', {
        task: this.$store.state.tasks[0],
        title: 'Vlad',
      })
    },
    loadTasks() {
      console.log('Loading tasks')
    },
    saveTasks() {
      console.log('Saving tasks')
    },

    //UI
    swipeHandler(direction) {
      if (direction == 'left') {
        this.gotoPrevDay()
      } else if (direction == 'right') {
        this.gotoNextDay()
      }
    },
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
[v-cloak] {
  display: none !important;
}

#app {
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  color: var(--front);
  display: flex;
  filter: saturate(0);
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: fixed;
  width: 100%;
}

.window {
  flex: 1 1 auto;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}
* {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
::selection {
  background: #2be4a4;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

/* Colour Palette */
html {
  --front: #202020;
  --back: #fff;
  --back--dark: #f2f2f2;
  --accent: #2be4a4;
  --accent--dark: #16ac78;
  --accent--text: #16ac78;
}
</style>
