<template>
  <div :id="id" class="panel" :class="{active: active}">
    <div class="header">
      <h3 class="title">{{title}}</h3>
      <div class="close" @click.prevent="closePanel">Close</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
    active() {
      return this.$store.state.activePanel == this.id
    },
  },

  mounted() {},
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
  background-color: var(--back);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 100%;
  transition: top 0.3s;
  width: 100%;
  z-index: 100;
}
.panel.active {
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.2);
  top: 20px;
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
  font-size: 32px;
  font-weight: 700;
}
.close {
  cursor: pointer;
}
.content {
  padding: 0 16px;
}
</style>
