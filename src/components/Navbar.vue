<template>
  <div class="navbar">
    <router-link class="link" to="/">Tasks</router-link>
    <router-link class="link" to="/report">Reports</router-link>
    <router-link class="link" to="/settings">Settings</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {},
  components: {},
  data() {
    return {}
  },

  mounted() {},
  methods: {
    gotoToday() {
      this.$store.dispatch('gotoDay', { today: true })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  background: var(--default);
  display: flex;
  justify-content: space-between;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.editingTask .navbar {
  display: none;
}

.link {
  box-sizing: content-box;
  padding: 20px 16px;
  line-height: 20px;
  text-decoration: none;
  color: var(--default--text--strong);
  font-size: 16px;
  display: block;
}
.router-link-exact-active {
  color: var(--accent);
}
</style>
