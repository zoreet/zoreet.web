<template>
  <div id="settings">
    <div class="header">
      <h3 class="title">Settings</h3>
    </div>
    <div class="content">
      <div>
        <h4>Logged in as</h4>
        <div id="user--email">{{ user.email }}</div>
        <btn @action="logout">Log out</btn>
      </div>
      <div class="version">
        You're using version
        <strong>v3.1.3</strong> of zoreet.com
        <a href="#" @click.prevent="refresh">force update</a>
      </div>
    </div>
  </div>
</template>

<script>
import btn from '@/components/Button'

export default {
  name: 'Settings',
  components: {
    btn,
  },
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    refresh() {
      window.location.reload(true)
    },
  },
}
</script>

<style scoped>
#settings {
  background-color: var(--default--strong);
  min-height: 100%;
}
.header {
  box-sizing: content-box;
  flex: 0 0 auto;
  justify-content: center;
  margin-bottom: 0;
  padding-top: 32px;
  padding: 32px 16px 0;
  text-decoration: none;
}
.header:after {
  background-color: var(--acent);
  background-image: linear-gradient(
    17deg,
    var(--warning) 0%,
    var(--accent) 50%,
    var(--extra--light) 100%
  );
  content: '';
  display: block;
  height: 4px;
  margin-top: 10px;
}
.title {
  color: var(--default--text--strong);
  font-size: 32px;
  font-weight: 700;
}
.subtitle {
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--default--text);
}
.content {
  flex: 1 1 auto;
  justify-content: flex-start;
  overflow: scroll;
  padding: 14px 16px 60px;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
#settings h4 {
  margin-bottom: 8px;
}
#settings .content > div {
  margin-bottom: 32px;
}
#user--email {
  margin-bottom: 12px;
}

.version {
  font-size: 12px;
}
h4 {
  color: var(--default--text--strong);
}

a {
  text-decoration: underline;
  color: var(--default--text);
}
</style>