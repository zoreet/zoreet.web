<template>
  <div class="navbar">
    <div class="container">
      <a href="/" class="navbar__logo"><strong>zoreet</strong>.com</a>
      <div class="navbar__actions">
        <a href="/login">log in</a>
        <a id="signup-navbar" class="btn ml-4 hidden lg:inline" href="/login"
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
}

.navbar__logo {
  @apply text-lg;
}
</style>
