<template>
  <div class="home">
    <Navbar class="navbar--home" />
    <Hero class="hero--home">
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
        <a href="/login" class="hero__cta button --full animate"
          >sign up - it's free</a
        >
        <p class="disclaimer animate">
          By signin up you agree that this site uses cookies to identify your
          account and for anonymous usage stats. It stores your to-dos
          <em>duh!</em> but only until you decide to remove them. That's it :)
        </p>
      </template>
      <template slot="picture">
        <source media="(max-width: 450px)" srcset="/img/sunsire-900.png" />
        <img src="/img/sunsire-1980.png" width="100%" class="hero__image" />
      </template>
    </Hero>
    <div class="container">
      <div id="how-it-works" class="animate">
        <h2 class="title2">how it works</h2>
        <div class="screenshots">
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
    </div>
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
/* Navbar */
.navbar--home {
  background-color: var(--extra);
}
.navbar--home a,
.navbar--home strong {
  color: var(--default);
}
/* Hero */
.word-container,
.word {
  display: inline-block;
}
.word-container {
  overflow: hidden;
  padding: 0 0.1em;
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
.hero--home {
  background-color: var(--extra);
}
.hero--home,
.hero--home h1,
.hero--home strong {
  color: var(--default);
}
.hero__lead {
  animation-delay: 2s;
  line-height: 1.5em;
  margin: 24px 0 18px;
  max-width: 60vw;
  margin: 16px auto 32px;
}

.disclaimer {
  animation-delay: 2.5s;
  margin: 24px auto 0;
  /* color: var(--default--text); */
  max-width: 40vw;
}

.hero__image {
  display: block;
  position: relative;
  width: 100vw;
  height: 33.33vw;
}

.hero__cta {
  border: 0 none;
  padding: 16px 32px;
  font-weight: 700;
  background-color: var(--extra--strong);
  color: var(--default--text--strong) !important;
  animation-delay: 2.3s;
}

#how-it-works {
  animation-delay: 2.7s;
  color: var(--default--text);
  padding-top: 64px;
}
.title2 {
  font-size: 48px;
  margin: 0;
  color: var(--default--text--strong);
}

.screenshots {
  display: flex;
  justify-content: space-between;
  padding: 24px 0 72px;
}
.day {
  flex-basis: 31%;
  flex-grow: 0;
  flex-shrink: 0;
}
.fake-app {
  background-color: var(--default);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.fake-app-header {
  line-height: 3em;
  color: var(--default--text--strong);
  font-weight: bold;
  padding: 0 1.125em;
}
.fake-app-header:after {
  background-color: var(--accent);
  background-image: linear-gradient(
    17deg,
    var(--warning) 0%,
    var(--accent) 50%,
    var(--extra--strong) 100%
  );
  content: "";
  display: block;
  height: 4px;
}
.fake-app-tasks {
  list-style: none inside;
  color: var(--default--text--strong);
  margin: 0;
  padding: 18px;
}
.fake-app-task {
  line-height: 24px;
  padding-left: 32px;
  position: relative;
}
.past .fake-app-task,
.fake-app-task.--done {
  color: var(--default--text);
}
.past .fake-app-task.--done {
  color: var(--default--text--strong);
}
.fake-app-task + .fake-app-task {
  margin-top: 8px;
}
.fake-app-task:before {
  border-radius: 4px;
  border: 1px solid #9b9b9b;
  content: "";
  display: block;
  height: 24px;
  left: 0;
  margin-right: 8px;
  position: absolute;
  top: 0;
  width: 24px;
}

.past .fake-app-task:before,
.fake-app-task.--done:before {
  border-color: #9b9b9b;
}
.fake-app-task.--done:after {
  position: absolute;
  left: 7px;
  top: 8px;
  width: 10px;
  height: 5px;
  border-left: 3px solid var(--accent);
  border-bottom: 3px solid var(--accent);
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
    text-align: center;
    font-weight: 700;
    padding: 16px 32px;
  }

  .hero__lead br {
    display: none;
  }

  .title2 {
    font-size: 2em;
  }

  .screenshots {
    display: block;
  }

  .day + .day {
    margin-top: 24px;
  }
}

@media only screen and (max-width: 375px) {
  /* iPhone 8 Portrait */
  .hero__title {
    font-size: 38px;
  }
}

@media only screen and (max-width: 320px) {
  /* iPhone 5 Portrait */
  .hero__title {
    font-size: 32px;
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
