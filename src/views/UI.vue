<template>
  <div class="ui-demo">
    <h1>UI Demo</h1>
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
        They promise education, but really they give you tests and scores. And
        they predictin' prison population by who scoring the lowest.
      </p>
    </section>
    <section>
      <h1>UI Elements</h1>
      <button class="btn">Click me</button>
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
.ui-demo {
  padding: 32px;
}

html,
body {
  @apply bg-dark-500 text-lilac-300;
}

h1,
h2,
h3 {
  @apply font-bold text-white-500;
}
h1 {
  @apply text-4xl mb-6;
}
h2 {
  @apply text-3xl mb-4;
}
h3 {
  @apply text-2xl mb-3;
}

p + p {
  @apply mt-2;
}

.btn,
.input-text {
  @apply px-3 py-2 rounded-md border-2 transition-all;
}

.btn:hover {
  @apply bg-lilac-900 border-white-500 text-white-500;
}
.btn--primary {
  @apply bg-lilac-500 text-white-500 border-lilac-500;
}
.btn--primary:hover {
  @apply bg-lilac-500 border-lilac-500;
  filter: saturate(1.5);
}
.input-text {
  @apply border-2 border-white-500 text-dark-500 outline-none;
}
.input-text:focus {
  @apply border-lilac-500;
}
</style>
