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
  text-align: center;
}
.hero {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  text-align: center;
}
.hero .container {
  flex: 1 1 auto;
  margin: 0 auto;
  /* max-width: 80vw; */
  position: relative;
  width: 100%;
  z-index: 100;
}

.hero__title,
.hero strong {
  color: var(--default--text--strong);
}
.hero__title {
  display: block;
  font-size: 72px;
  font-weight: 900;
  line-height: 1.2em;
  margin: 32px 0 0;
}

@media only screen and (max-width: 414px) {
  /* iPhone Xr Portrait */
  .hero .container {
    max-width: 88vw;
  }
  .hero-lead {
    max-width: auto;
  }

  .hero__title {
    font-size: 42px;
  }

  .hero-content {
    width: 100%;
    font-size: inherit;
  }
}
</style>
