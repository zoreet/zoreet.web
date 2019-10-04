<template>
  <div>
    <router-view />
    <InstallMessage v-if="showInstallMessage" />
  </div>
</template>

<script>
import InstallMessage from '@/components/InstallMessage.vue'
export default {
  name: 'app',
  components: {
    InstallMessage,
  },
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
</style>
