<template>
  <div id="app" v-cloak :class="{ editingTask: editingTask }">
    <router-view></router-view>
    <navbar></navbar>
    <div class="installMessage" v-if="showInstallMessage">
      <img src="/img/icon.svg" width="60" class="icon" />
      <div class="title">
        <strong>Install this webapp on your iPhone</strong>
      </div>
      <div class="info">
        Tap
        <img class="share-icon" src="/img/share-ios.svg" width="20" /> and then
        <img class="add-icon" src="/img/add-to-homescreen.svg" width="22" />
        Add to Home Screen
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './components/Navbar'

export default {
  name: 'app',
  data() {
    return {
      isStandalone:
        'standalone' in window.navigator && window.navigator.standalone,
      showInstallMessage: false,
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
    this.$store.dispatch('checkLogin')
  },
  mounted() {
    document.addEventListener(
      'touchmove',
      function(e) {
        if (e.target == document.body) e.preventDefault()
      },
      { passive: false }
    )

    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }

    // Checks if should display install popup notification:
    if (isIos() && !this.isStandalone) {
      this.showInstallMessage = true
    }
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

@keyframes popDownThenGo {
  0% {
    bottom: 64px;
  }
  10%,
  90% {
    bottom: 16px;
    opacity: 1;
  }
  100% {
    bottom: -32px;
    pointer-events: none;
  }
}
.installMessage {
  align-items: top;
  animation: popDownThenGo 4s cubic-bezier(0.17, 0.89, 0.32, 1.49) forwards;
  animation-delay: 1s;
  background-color: var(--default--text--strong);
  border-radius: 16px;
  bottom: 16px;
  color: var(--default);
  display: grid;
  grid-column-gap: 12px;
  grid-template-areas: 'icon title' 'icon info';
  grid-template-columns: 60px 1fr;
  grid-template-rows: 20px 1fr;
  left: 2px;
  min-height: 0; /* NEW */
  min-width: 0; /* NEW; needed for Firefox */
  opacity: 0;
  padding: 8px;
  position: fixed;
  width: calc(100% - 4px);
  z-index: 999;
}
.installMessage:after {
  position: absolute;
  top: 100%;
  border: 16px solid transparent;
  border-top-color: var(--default--text--strong);
  border-bottom: 0 none;
  left: calc(50% - 16px);
  content: '';
  display: block;
}

.installMessage .icon {
  grid-area: icon;
}

.installMessage .title {
  grid-area: title;
  padding-top: 4px;
}
.installMessage .info {
  grid-area: info;
  padding-top: 6px;
}
.share-icon {
  margin: 0 3px -5px;
}
.add-icon {
  margin: 0 1px -5px 3px;
}
</style>
