<template>
  <div :id="id" class="panel" :class="{ active: active }">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <div class="close" @click.prevent="closePanel">Close</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Panel',
  props: {
    id: String,
    title: String,
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['activePanel']),
    active() {
      return this.activePanel == this.id
    },
  },
  methods: {
    closePanel() {
      this.$store.commit('changePanel', '')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  color: var(--default--text);
  background-color: var(--default);
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 100%;
  transition: top 0.3s, left 0.3s;
  width: 100%;
  z-index: 100;
}
.panel.active {
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.2);
  top: 95px;
  margin-top: constant(safe-area-inset-top);
  margin-top: env(safe-area-inset-top);
  z-index: 999;
}

.header {
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  margin-bottom: 0;
  padding: 24px 16px 48px;
  text-decoration: none;
}
.title {
  color: var(--default--text--strong);
  font-size: 32px;
  font-weight: 700;
}
h4 {
  color: var(--default--text--strong);
}
.close {
  cursor: pointer;
}
.content {
  padding: 0 16px;
}

a {
  text-decoration: underline;
  color: var(--default--text);
}

@media (min-width: 1024px) {
  /* iPad and up */
  .panel {
    height: 100vw;
    left: 100%;
    width: 320px;
    bottom: auto;
    top: 0;
  }
  .panel.active {
    left: calc(100% - 320px);
    top: 0;
  }
}
</style>
