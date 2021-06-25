<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
* {
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}
body {
  --default: #312e53;
  --default--strong: #232041;
  --default--text: #8480aa;
  --default--text--strong: #fff;
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
  --extra: #e1bee6;
  --extra--strong: #a57ed5;

  -webkit-font-smoothing: antialiased;
  background-color: var(--default--strong);
  color: var(--default--text);
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
}

a {
  color: var(--default--text--strong);
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
  color: var(--default--text--strong);
}

.button {
  background: transparent;
  border-radius: 0.33em;
  border: 1px solid;
  color: var(--accent);
  display: inline-block;
  padding: 0.5em 0.75em;
  text-decoration: none;
  transition: all 0.3s;
  font-size: inherit;
}
.button:hover,
.button--full {
  background-color: var(--accent);
  color: var(--default--strong);
}
.button--full:hover {
  filter: brightness(1.2);
}
.button:active,
.button--full:active {
  filter: brightness(0.7);
}

.button--secondary {
  color: var(--default--text--strong);
}
.button--secondary:hover {
  color: var(--default--strong);
  background-color: var(--default--text--strong);
}

.container {
  margin: 0 auto;
  max-width: 1100px;
}

.highlight {
  color: var(--accent);
}

@media only screen and (max-width: 414px) {
  /* iPhone Xr Portrait */
  .button {
    padding: 0.75em;
  }
}

@media only screen and (max-width: 1024px) {
  /* iPad Landscape */
  .container {
    padding: 0 24px;
  }
}
</style>
