<template>
  <div id="app" v-cloak :class="{editingTask: editingTask}">
    <router-view></router-view>
    <navbar></navbar>
  </div>
</template>

<script>
import auth0 from 'auth0-js'
import moment from 'moment'
import navbar from './components/Navbar'

export default {
  name: 'app',
  data() {
    return {
      isStandalone: localStorage.getItem('isStandalone'),
    }
  },
  components: {
    // Component,
    navbar,
  },
  computed: {
    editingTask() {
      return this.$store.state.editingTask
    },
  },
  beforeMount() {
    if (window.location.search) localStorage.setItem('isStandalone', true)

    this.$store.dispatch('checkLogin')
  },
  mounted() {
    let that = this

    document.addEventListener(
      'touchmove',
      function(e) {
        if (e.target == document.body) e.preventDefault()
      },
      { passive: false }
    )
  },
  methods: {},
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: var(--accent);
}
[v-cloak] {
  display: none !important;
}

#app {
  -webkit-font-smoothing: antialiased;
  background-color: rgb(128, 128, 128);
  color: var(--text);
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
}

body * {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
::selection {
  background: #5ceea7;
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
#app {
  --default: #312e53;
  --default--strong: #232041;
  --default--text: #8480aa;
  --default--text--strong: #ffffff;
  --accent: #82e5cc;
  --accent--strong: #73d8be;
  --accent--text: #389981;
  --accent--text--strong: #114a3b;
  --warning: #fec660;
  --warning--strong: #feaa58;
  --warning--text: #ce6a00;
  --warning--text--strong: #623100;
  --destructive: #f27778;
  --destructive--strong: #ef686a;
  --destructive--text: #c23a3d;
  --destructive--text--strong: #69080a;
  --extra--light: #a57ed5;
  --extra--dark: #a57ed5;

  color: var(--default--text);
  background-color: #000;
}
</style>
