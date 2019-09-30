<template>
  <a
    href="#"
    class="button"
    :class="{ secondary: role == 'secondary' }"
    @click.prevent="action"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'Button',
  props: {
    role: String,
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
  background-color: var(--accent);
  border-radius: 6px;
  box-sizing: border-box;
  color: var(--accent--text--strong);
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin: 2px 0;
  padding: 8px 12px 9px;
  text-align: center;
  text-decoration: none;
}
.button + .button {
  margin-left: 10px;
}

.secondary {
  background-color: transparent;
  border: 1px solid var(--accent);
  color: var(--accent--strong);
}
</style>
