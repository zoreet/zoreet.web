<template>
  <div class="navbar">
    <div class="container">
      <a href="/" class="navbar__logo"><strong>zoreet</strong>.com</a>
      <div class="navbar__actions">
        <a href="/login">log in</a>
        <a id="signup-navbar" class="btn ml-4" href="/login"
          >sign up - it's free</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.navbar {
  @apply py-3;
}
.navbar .container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.navbar a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.navbar__logo {
  @apply text-lg;
}
/*

.navbar a + a {
  margin-left: 16px;
}

.navbar .logo {
  color: var(--default);
  padding-left: 0;
  font-size: 1.125em;
}

.navbar__actions {
  flex: 1 0 auto;
  text-align: right;
}

@media only screen and (max-width: 414px) {
  /* iPhone Xr Portrait */
/* .navbar {
    padding: 10px 0;
    position: relative;
    z-index: 10;
  }

  .navbar a {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .navbar .logo {
    font-size: 1.2em;
  }
  #signup-navbar {
    display: none;
  }
} */
</style>
