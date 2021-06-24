<template>
  <div class="home">
    <div class="hero">
      <div class="header">
        <div class="container">
          <a href="/" class="logo"><strong>zoreet</strong>.com</a>
          <div class="header-actions">
            <a id="login-header" href="/login">log in</a>
            <a
              id="signup-header"
              class="header-action button js-login"
              href="/login"
              >sign up - it's free</a
            >
          </div>
        </div>
      </div>
      <div class="hero-content">
        <div class="container">
          <h1>
            <div class="word-container">
              <div class="word" style="animation-delay: 0.5s">every</div>
            </div>
            <div class="word-container">
              <div class="word" style="animation-delay: 0.7s">day</div>
            </div>
            <div class="word-container">
              <div class="word" style="animation-delay: 0.9s">a</div>
            </div>
            <div class="word-container">
              <div class="word" style="animation-delay: 1.1s">new</div>
            </div>
            <div class="word-container">
              <div class="word" style="animation-delay: 1.3s">start</div>
            </div>
          </h1>
          <p class="hero-lead animate">
            <strong>zoreet is a to-do app</strong> that helps you focus on what
            you can achieve right now.<br />plan ahead, let go of unfinished
            tasks and celebrate your achievements.
          </p>
          <a id="signup" href="/login" class="button --full animate js-login"
            >sign up - it's free</a
          >
          <a
            id="login"
            href="/login"
            class="button --secondary animate js-login"
            >log in</a
          >
          <p class="disclaimer animate">
            after you sign up or log in, this site uses cookies to identify who
            you are. we store your to-dos <em>duh!</em> but only until you
            decide to remove them. we also use google analytics for anonymous
            stats. that's it :)
          </p>
        </div>
      </div>
      <picture>
        <source media="(max-width: 450px)" srcset="/img/sunsire-900.png" />
        <img src="/img/sunsire-1980.png" width="100%" class="hero-image" />
      </picture>
    </div>
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

export default {
  name: "Home",
};
</script>

<style>
.button {
  padding: 0.33em 0.75em 0.4em;
  border-radius: 0.33em;
  border: 1px solid;
  color: var(--accent);
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
}
.button:hover,
.button.--full {
  background-color: var(--accent);
  color: var(--default--strong);
}
.button.--full:hover {
  filter: brightness(1.2);
}
.button:active,
.button.--full:active {
  filter: brightness(0.7);
}

.button.--secondary {
  color: var(--default--text--strong);
}
.button.--secondary:hover {
  color: var(--default--strong);
  background-color: var(--default--text--strong);
}

.container {
  margin: 0 auto;
  max-width: 1100px;
}

.highlight {
  color: var(--accent);
}

@keyframes hero-misc {
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate {
  animation: hero-misc 0.3s forwards;
  transform: translateY(60px);
  opacity: 0;
}

.hero {
  background-color: #e1bee6;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  text-align: center;
}
.header {
  background-color: var(--extra);
  padding: 12px 0;
  flex: 0 0 auto;
}
.header .container {
  align-items: center;
  display: flex;
}
.header a {
  text-decoration: none;
  padding: 8px 12px;
  display: inline-block;
  color: var(--default--strong);
}

.header .logo {
  color: var(--default);
  padding-left: 0;
  font-size: 1.125em;
}
.logo strong {
  color: var(--default--strong);
}

.header-actions {
  flex: 1 0 auto;
  text-align: right;
}

.hero-content {
  flex: 1 1 auto;
  margin: 0 auto;
  max-width: 80vw;
  padding-top: 32px;
  position: relative;
  width: 100%;
  z-index: 100;
}

.hero,
.hero h1,
.hero strong {
  color: var(--default);
}
h1 {
  display: block;
  font-size: 72px;
  font-weight: 900;
  line-height: 1.2em;
  margin: 0;
}
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

.hero-lead {
  animation-delay: 2s;
  line-height: 1.5em;
  margin: 24px 0 18px;
  max-width: 60vw;
  margin: 16px auto 32px;
}

.disclaimer {
  animation-delay: 2.5s;
  margin: 24px auto 0;
  /* font-size: 14px; */
  color: var(--default--text);
  max-width: 40vw;
}

.hero-image {
  display: block;
  position: relative;
  width: 100vw;
  height: 33.33vw;
}

#signup {
  border: 0 none;
  padding: 16px 32px;
  font-weight: 700;
  background-color: var(--extra--strong);
  color: var(--default--text--strong) !important;
}
#signup,
#login {
  animation-delay: 2.3s;
}
#login {
  display: none;
}

#how-it-works {
  /* animation-delay: 2.7s; */
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
  .container {
    padding: 0 24px;
  }
  .button {
    padding: 0.75em;
  }
  .animate {
    transform: translateY(-30px);
  }
  .word {
    transform: translateY(-100%);
  }

  .header {
    padding: 10px 0;
    position: relative;
    z-index: 10;
  }
  .header .logo {
    font-size: 1.2em;
  }

  .hero-lead {
    max-width: auto;
  }

  #signup-header {
    display: none;
  }
  #login-header {
    padding-left: 0;
    padding-right: 0;
  }

  .hero-content {
    width: 100%;
    font-size: inherit;
  }

  h1 {
    font-size: 42px;
  }

  #signup,
  #login {
    display: block;
    text-align: center;
    font-weight: 700;
  }
  #login {
    margin-top: 12px;
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
  h1 {
    font-size: 38px;
  }
}

@media only screen and (max-width: 320px) {
  /* iPhone 5 Portrait */
  h1 {
    font-size: 32px;
  }
}

@media only screen and (max-width: 1024px) {
  /* iPad Landscape */
  .container {
    padding: 0 32px;
  }
  .hero-lead,
  .disclaimer {
    max-width: 100%;
  }

  .hero-lead br {
    display: none;
  }
}
</style>
