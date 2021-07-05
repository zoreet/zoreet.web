<template>
  <div class="login">
    <navbar />
    <div v-if="showLoginScreen">
      <hero>
        <template slot="title">An easier way to login?</template>
        <template slot="content">
          <p class="mb-12">
            Get a magic link sent to your email that will sign you in instantly
          </p>
          <form @submit="login">
            <input
              id="email"
              v-model="email"
              type="email"
              class="input-text w-96 mr-1"
              placeholder="your@email.com"
              autofocus
            />
            <button class="btn btn--primary" @click="login">Send</button>
            <div v-if="showInvalidMailMessage">
              <p
                class="
                  mt-4
                  text-base text-white-500
                  bg-destroy-600
                  border border-destroy-500
                  inline-block
                  px-4
                  py-2
                  rounded-md
                "
              >
                The email address you provided is not valid.
              </p>
            </div>
          </form>
        </template>
      </hero>
    </div>
    <div v-else>
      <hero>
        <template slot="title">Check your inbox</template>
        <template slot="content">
          <p class="mb-12">
            We sent a magic link to <strong>{{ email }}</strong
            >. Click it and it will sign you in instantly.
          </p>
        </template>
      </hero>
    </div>
  </div>
</template>

<script>
import Hero from "../components/Hero.vue";
import Navbar from "../components/Navbar.vue";
import firebase from "firebase/app";

const screens = {
  login: "login",
  sent: "sent",
};

export default {
  components: { Hero, Navbar },
  name: "Login",
  data() {
    return {
      email: "",
      formIsValid: true,
      activeScreen: screens.login,
    };
  },
  computed: {
    showLoginScreen() {
      return this.activeScreen === screens.login;
    },
    showInvalidMailMessage() {
      return !this.emailIsValid && !this.formIsValid;
    },
    emailIsValid() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.email).toLowerCase());
    },
  },
  methods: {
    login(event) {
      event.preventDefault();
      this.formIsValid = true;
      if (!this.email || !this.emailIsValid) {
        this.formIsValid = false;
        return;
      }

      var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: window.location.href,
        // This must be true.
        handleCodeInApp: true,
      };

      firebase
        .auth()
        .sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", this.email);
          this.activeScreen = screens.sent;
        })
        .catch((error) => {
          alert(`Error signing in (${error})`);
        });
    },
  },
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
