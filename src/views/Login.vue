<template>
  <div>
    <form @submit="login" v-if="showLogin">
      <h1>An easier way to login?</h1>
      <p>Get a magic link sent to your email that will sign you in instantly</p>
      <input type="text" v-model="email" id="email" />
      <button @click.prevent="login">Email Magic Link</button>
    </form>
    <div v-else-if="showEmailSent">
      <h1>Check your email</h1>
      <p>
        I sent an email to you at {{ this.email }} with a link that will
        magically sign you in
      </p>
    </div>
    <div v-else>
      <h1>I couldn't sign you in</h1>
      <p>There was an error, please try again.</p>
      <button @click.prevent="refresh">Login</button>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

const screens = {
  login: "login",
  emailSent: "email-sent",
  confirm: "confirm",
};

export default {
  name: "Login",
  data() {
    return {
      email: "",
      activeScreen: screens.login,
    };
  },
  computed: {
    showLogin() {
      return this.activeScreen === screens.login;
    },
    showEmailSent() {
      return this.activeScreen === screens.emailSent;
    },
    showErrorScreen() {
      return this.activeScreen === screens.error;
    },
  },
  mounted() {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        this.activeScreen = screens.confirm;
      } else {
        this.signInWithEmail(email);
      }
    }
  },
  methods: {
    login() {
      if (this.validateEmail(this.email)) {
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
            this.activeScreen = screens.emailSent;
          })
          .catch((error) => {
            alert(`Error signing in (${error})`);
          });
      }
    },
    signInWithEmail(email) {
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          alert("you are logged in");
          console.log("login", result.user);
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          alert("not logged in");
          console.log("login error", error);
        });
    },
    refresh() {
      window.location.href = window.location.origin + window.location.pathname;
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
</script>
