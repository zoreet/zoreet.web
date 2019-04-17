<template>
  <a href="#" class="button" :class="{selected: selected}" @click.prevent="action">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'Button',
  props: {
    selected: Boolean,
  },
  data() {
    return {}
  },

  mounted() {},
  methods: {
    action() {
      this.$emit('action')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  background-color: var(--back);
  border-radius: 6px;
  border: 1px solid;
  box-sizing: border-box;
  color: inherit;
  display: inline-block;
  font-size: 14px;
  margin: 2px 0;
  padding: 8px 12px 9px;
  text-align: center;
  text-decoration: none;
}
.button + .button {
  margin-left: 10px;
}
.selected {
  background-color: var(--accent);
  color: var(--text);
  border-color: transparent;
}

.darkMode .button:not(.selected) {
  border-color: var(--text--secondary);
}
.darkMode .selected {
  color: var(--back);
}
</style>
