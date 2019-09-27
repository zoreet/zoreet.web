<template>
  <div
    v-if="visible"
    class="alert"
    :class="'alert--' + type"
  >
    <div class="message">
      <slot name="message"></slot>
    </div>
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
  background: var(--warning);
  color: var(--warning--text--strong);
  display: flex;
  font-size: 13px;
  font-size: 13px;
  justify-content: center;
  padding: 12px 16px;
  position: absolute;
  width: 100%;
  z-index: 999;
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
  margin-left: 32px;
  display: inline-block;
}
.action a {
  text-decoration: none;
}
</style>
