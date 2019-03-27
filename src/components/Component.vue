<template>
  <div :id="id" class="page">
    <div class="page__header">
      <div class="page__subtitle">{{ dateSubtitle }}</div>
      <h3 class="page__title">{{ dateTitle }}</h3>
    </div>
    <div class="page__content">
      Content goes here: {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Component',
  props: {
    msg: String,
    id: String
  },
  data() {
    return {
      dateTitle: 'dateTitle',
      dateSubtitle: 'dateSubtitle'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  background-color: var(--back);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.page__header {
  background-color: var(--accent);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  height: 107px;
  justify-content: center;
  margin-bottom: 0;
  padding: 0 16px;
  text-decoration: none;
}
.page__title {
  font-size: 32px;
  font-weight: 700;
  margin-top: 4px;
}
.page__subtitle {
  font-size: 13px;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
}
.page__content {
  background-color: var(--back);
  flex: 1 1 auto;
  justify-content: flex-start;
  overflow: scroll;
  padding: 0 16px;
}
</style>
