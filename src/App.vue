<template>
<div>
  <router-view></router-view>
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
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isStandalone:
        'standalone' in window.navigator && window.navigator.standalone,
      showInstallMessage: false,
    }
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
  methods: {
    refresh() {
      window.location.reload(true)
    },
  },
}
</script>

<style>
[v-cloak] {
  display: none !important;
}

@import url('./assets/base.css');

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
