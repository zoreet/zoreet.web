<template>
  <div id="app" :class="classes">
      <div class="main">
        <slot name="main"></slot>
      </div>
      <Navbar />
      <div class="sheets">
        <slot name="sheets">Sheets</slot>
      </div>
      <div class="overlays">
        <slot name="overlays">Sheets</slot>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Layout',
  components: {
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

<style>
html {
  /* Colour Palette */
  --default: #312e53;
  --default--strong: #232041;
  --default--text: #8480aa;
  --default--text--strong: #ffffff;
  --accent: #82e5cc;
  --accent--strong: #73d8be;
  --accent--text: #389981;
  --accent--text--strong: #114a3b;
  --warning: #fec660;
  --warning--strong: #feaa58;
  --warning--text: #ce6a00;
  --warning--text--strong: #623100;
  --destructive: #f27778;
  --destructive--strong: #ef686a;
  --destructive--text: #c23a3d;
  --destructive--text--strong: #69080a;
  --extra--light: #a57ed5;
  --extra--dark: #a57ed5;
}

body {
  -webkit-font-smoothing: antialiased;
  background-color: var(--default);
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
}

::selection {
  background: var(--accent--strong) !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

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

.layout * {
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
  background-color: var(--default--strong);
  grid-area: main;
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