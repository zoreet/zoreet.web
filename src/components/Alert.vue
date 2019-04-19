<template>
  <div class="alert" :class="{error: type=='error', info: type=='info'}" @click.prevent="action">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    action: Function,
    type: String,
  },
  components: {},
  data() {
    return {}
  },

  mounted() {},
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  position: fixed;
  z-index: 999;
  padding: 12px 16px;
  background: var(--back);
  font-size: 13px;
  width: 100%;
  font-size: 13px;
}
p {
  margin: 2px 0 0;
}
.info {
  text-align: center;
}
.error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}
</style>
