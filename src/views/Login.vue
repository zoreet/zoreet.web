<template>
  <div class="login">
    <navbar />
    <hero>
      <template slot="title">An easier way to login?</template>
      <template slot="content">
        <p>
          Get a magic link sent to your email that will sign you in instantly
        </p>
        <input
          id="email"
          type="text"
          class="input"
          placeholder="your@email.com"
        />
        <button class="button --full">Send</button>
      </template>
    </hero>
  </div>
</template>

<script>
import Hero from "../components/Hero.vue";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Hero, Navbar },
  name: "Login",
};
</script>

<style>
.hero {
  font-size: 20px;
  padding-top: 128px;
  padding-bottom: 128px;
}
.hero .input {
  font-size: inherit;
}
</style>
