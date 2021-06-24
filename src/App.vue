<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/day">day</router-link> |
      <router-link to="/someday">someday</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/logout">logout</router-link> |
      <router-link to="/report">report</router-link> |
      <router-link to="/settings">settings</router-link>
    </div>
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
</style>
