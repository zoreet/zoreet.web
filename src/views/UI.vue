<template>
  <div class="py-6 container">
    <h1 class="mb-12">UI Demo</h1>
    <section>
      <h1>Typography</h1>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <p>
        The way I see it, you're probably freest from the ages one to four.
        Around the age of five you're shipped away for your body to be stored.
      </p>
      <p>
        They promise <a href="#">education</a>, but really they give you tests
        and scores. And they predictin' prison population by who scoring the
        lowest.
      </p>
    </section>
    <section>
      <h1>UI Elements</h1>
      <button class="btn">Click me</button>
      <button class="btn btn--inverted">Click me</button>
      <button class="btn btn--primary">Click me</button>
      <input
        type="text"
        name="input"
        id="input"
        class="input-text"
        placeholder="Say something"
      />
    </section>
  </div>
</template>

<style>
section {
  @apply mb-12 border-t-2 pt-12 border-black-900;
}
/* --------------------------------------------- */
</style>
