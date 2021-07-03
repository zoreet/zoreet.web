<template>
  <div class="hero">
    <div class="container">
      <h1 class="hero__title">
        <slot name="title" />
      </h1>
      <div class="hero__content">
        <slot name="content" />
      </div>
    </div>
    <picture class="hero__picture">
      <slot name="picture" />
    </picture>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style>
.hero {
  overflow: hidden;
  position: relative;
  text-align: center;
}
.hero .container {
  position: relative;
  z-index: 100;
}

.hero__title {
  @apply font-black text-7xl mt-6;
  line-height: 1.2em;
}
</style>
