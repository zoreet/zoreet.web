<template>
  <div id="app" :class="classes">
    <div class="main">
      <slot name="main"></slot>
    </div>
    <Navbar />
    <div class="sheets">
      <slot name="sheets"></slot>
    </div>
    <div class="overlays">
      <!-- Putting display none here, because I show it from serviceWorker.js and that doesn't have access to vue -->
      <!-- TODO: make it appear through vue -->
      <!-- TODO: I don't like that this is in here. can we abstract it in another way?  -->
      <Alert type="info" style="display: none">
        <template #message>
          A new version is available.
        </template>
        <template #action>
          <a href="#" @click.prevent="refresh">REFRESH</a>
        </template>
      </Alert>
      <slot name="overlays"></slot>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Alert from '@/components/Alert'

export default {
  name: 'Layout',
  components: {
    Alert,
    Navbar
  },
  computed: {
    classes() {
      let classes= 'layout'
      // here i'll have to see if we're in editing mode and add 'layout--editing'
      return classes
    }
  },
}
</script>

<style scoped>
.layout {
  color: var(--default--text);
  display: grid;
  grid-template-areas: "main" "navbar";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.layout--editing {
  grid-template-rows: 100% 60px;
}

.layout >>> * {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}





.sheets {
  position: absolute;
  background-color: var(--default);
  top: 100%;
  left: 0;
  right: 0;
}

.overlays {
  grid-area: main;
  position: absolute;
  height: 0;
  width: 100%;
}
.overlays:empty {
  display: none;
}

.main {
  /* background-color: var(--default--strong); */
  background-color: #000;
  grid-area: main;
  position: relative;
}




@media (min-width: 1281px) {
  .layout {
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: "navbar main" "sheets main";
  }

  .navbar { grid-area: navbar; }
  .sheets { grid-area: navbar; }

}
</style>