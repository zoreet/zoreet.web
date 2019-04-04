<template>
  <a href="#" class="button" @click.prevent="action">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'Button',
  props: {},
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
  border: 1px solid;
  border-radius: 6px;
  box-sizing: border-box;
  color: inherit;
  display: inline-block;
  font-size: 14px;
  padding: 8px 12px 9px;
  margin: 2px 0;
  text-align: center;
  text-decoration: none;
}
.button + .button {
  margin-left: 10px;
}
.darkMode .button {
  border-color: #757575;
}
</style>
