<template>
  <div
    v-if="visible"
    class="alert"
    :class="'alert--' + type"
  >
    <slot name="message"></slot>
    <div class="action">
      <slot name="action">
        <a href="#" @click.prevent="dismiss">DISMISS</a>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      validator(type) {
        return type == 'error' || type == 'info'
      }
    }
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    dismiss() {
      this.visible = false
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  position: absolute;
  z-index: 999;
  padding: 12px 16px;
  background: var(--warning);
  color: var(--warning--text--strong);
  font-size: 13px;
  width: 100%;
  font-size: 13px;
}
.alert--info {
  text-align: center;
}
.alert--error {
  background-color: var(--destructive);
  color: var(--destructive--text--strong);
}
p {
  margin: 2px 0 0;
}
a {
  color: inherit;
  font-weight: bold;
}
.action {
  margin-left: 16px;
  display: inline-block;
}
.action a {
  text-decoration: none;
}
</style>
