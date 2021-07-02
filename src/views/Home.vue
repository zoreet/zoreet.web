<template>
  <div class="home">
    <Navbar class="bg-hero-500 text-black-500" />
    <Hero class="bg-hero-500 text-black-500">
      <template slot="title">
        <span class="word-container">
          <span class="word" style="animation-delay: 0.5s">every</span>
        </span>
        <span class="word-container">
          <span class="word" style="animation-delay: 0.7s">day</span>
        </span>
        <span class="word-container">
          <span class="word" style="animation-delay: 0.9s">a</span>
        </span>
        <span class="word-container">
          <span class="word" style="animation-delay: 1.1s">new</span>
        </span>
        <span class="word-container">
          <span class="word" style="animation-delay: 1.3s">start</span>
        </span>
      </template>
      <template slot="content">
        <p class="hero__lead animate">
          <strong>zoreet is a to-do app</strong> that helps you focus on what
          you can achieve right now. <br />
          Plan ahead, let go of unfinished tasks and celebrate your
          achievements.
        </p>
        <a href="/login" class="hero__cta btn btn--primary --large animate"
          >sign up - it's free</a
        >
        <p class="disclaimer animate">
          by signin up you agree that this site uses cookies to identify your
          account and for anonymous usage stats. It stores your to-dos
          <em>duh!</em> but only until you decide to remove them. That's it :)
        </p>
      </template>
      <template slot="picture">
        <source media="(max-width: 450px)" srcset="/img/sunsire-900.png" />
        <img src="/img/sunsire-1980.png" width="100%" class="hero__image" />
      </template>
    </Hero>
    <section class="container">
      <div id="how-it-works" class="animate">
        <h2 class="text-5xl mb-4">how it works</h2>
        <div class="lg:flex justify-between mt-6 mb-18">
          <div class="day">
            <div class="fake-app past">
              <div class="fake-app-header">yesterday</div>
              <ul class="fake-app-tasks">
                <li class="fake-app-task --done">research vacation spots</li>
                <li class="fake-app-task --done">check who's comming</li>
                <li class="fake-app-task">decide on a destination</li>
              </ul>
            </div>
            <div class="explain">
              when you look back at past days zoreet focuses on celebrating what
              you've acomplished
            </div>
          </div>
          <div class="day">
            <div class="fake-app">
              <div class="fake-app-header present">today</div>
              <ul class="fake-app-tasks">
                <li class="fake-app-task">decide on a destination</li>
                <li class="fake-app-task">check prices for flights</li>
                <li class="fake-app-task --done">decide on a date</li>
              </ul>
            </div>
            <div class="explain">
              today it's time to focus on getting things done
            </div>
          </div>
          <div class="day">
            <div class="fake-app">
              <div class="fake-app-header">tomorrow</div>
              <ul class="fake-app-tasks">
                <li class="fake-app-task">book the flight</li>
                <li class="fake-app-task">decide: hotel or airbnb?</li>
                <li class="fake-app-task">start up an itinerary</li>
              </ul>
            </div>
            <div class="explain">
              you can also plan ahead tasks you know you'll need to do on a
              certain day
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Hero,
    Navbar,
  },
};
</script>

<style>
.home {
  @apply bg-black-700;
}
/* Hero */
.word-container,
.word {
  display: inline-block;
}
.word-container {
  overflow: hidden;
}

@keyframes word {
  100% {
    transform: translateY(0);
  }
}
.word {
  animation: word 0.3s forwards;
  transform: translateY(100%);
}

@keyframes fade-in--slide-from-bottom {
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate {
  animation: fade-in--slide-from-bottom 0.3s forwards;
  transform: translateY(60px);
  opacity: 0;
}
.hero__lead {
  @apply mt-4 mb-8;
  animation-delay: 2s;
}

.disclaimer {
  @apply mt-6 mx-auto;
  animation-delay: 2.5s;
  max-width: 40vw;
}

.hero__image {
  display: block;
  position: relative;
  width: 100vw;
  height: 33.33vw;
}

.hero__cta {
  animation-delay: 2.3s;
  display: inline-block;
}

.hero:after {
  /* cover the bottom of the image with a fade from transparent to the bg color */
  @apply bg-gradient-to-t from-black-700;
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 50px;
}

#how-it-works {
  @apply text-white-500 pt-16;
  animation-delay: 2.7s;
}

.day {
  flex-basis: 31%;
  flex-grow: 0;
  flex-shrink: 0;
}
.fake-app {
  @apply bg-black-500 rounded-lg;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.fake-app-header {
  @apply px-4;
  line-height: 3em;
  font-weight: bold;
}
.fake-app-header:after {
  @apply bg-gradient-to-r from-accent-500 via-construct-500 to-action-500 h-1;
  content: "";
  display: block;
}
.fake-app-tasks {
  @apply p-4;
  list-style: none inside;
  margin: 0;
}
.fake-app-task {
  @apply pl-8 leading-6;
  position: relative;
}
.past .fake-app-task,
.fake-app-task.--done {
  @apply text-black-400;
}
.past .fake-app-task.--done {
  color: inherit;
}
.fake-app-task + .fake-app-task {
  @apply mt-2;
}
.fake-app-task:before,
.past .fake-app-task.--done:before {
  @apply rounded-md border border-action-50 w-6 h-6 mr-2;
  content: "";
  display: block;
  left: 0;
  position: absolute;
  top: 0;
}

.past .fake-app-task:before,
.fake-app-task.--done:before {
  @apply border-black-400;
}
.fake-app-task.--done:after {
  @apply border-construct-500;
  border-width: 3px;
  position: absolute;
  left: 7px;
  top: 8px;
  width: 10px;
  height: 5px;
  border-top-color: transparent;
  border-right-color: transparent;
  content: "";
  display: block;
  transform: rotate(-45deg);
}

.explain {
  padding: 10px 18px;
  line-height: 1.5em;
}

@media only screen and (max-width: 414px) {
  /* iPhone Xr Portrait */
  .button {
    padding: 0.75em;
  }

  .hero__cta {
    display: block;
    @apply text-lg;
  }

  .hero__lead br {
    display: none;
  }

  .title2 {
    font-size: 2em;
  }

  .day + .day {
    margin-top: 24px;
  }
}

@media only screen and (max-width: 375px) {
  /* iPhone 8 Portrait */
  .hero__title {
    @apply text-5xl;
  }
}

@media only screen and (max-width: 320px) {
  /* iPhone 5 Portrait */
  .hero__title {
    @apply text-4xl;
  }
}
@media only screen and (max-width: 1024px) {
  /* iPad Landscape */
  .hero__lead,
  .disclaimer {
    max-width: 100%;
  }
}
</style>
