<template>
  <div class="navbar">
    <a href="#" class="link" @click.prevent="showPannel('calendar')">Calendar</a>
    <a href="#" class="link" @click.prevent="gotoToday()">Today</a>
    <a href="#" class="link" @click.prevent="showPannel('settings')">Settings</a>
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
    showPannel(pannelId) {
      this.$store.commit('changePanel', pannelId)
    },
    gotoToday() {
      this.$store.dispatch('gotoDay', { today: true })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  display: flex;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--back--dark);
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 999;
}

.link {
  box-sizing: content-box;
  padding: 20px 16px;
  line-height: 20px;
  text-decoration: none;
  color: var(--accent--text);
  font-size: 16px;
  display: block;
}
</style>
