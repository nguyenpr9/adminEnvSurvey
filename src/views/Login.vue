<template>
  <div id="login">
    <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset>
    <section>
      <div class="col1">
        <h1>Vuegram</h1>
        <p>
          Welcome to the
          <a href="https://savvyapps.com/" target="_blank">Savvy Apps</a> sample
          social media web app powered by Vue.js and Firebase. Build this
          project by checking out The Definitive Guide to Getting Started with
          Vue.js
        </p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <p v-if="error" class="error-msg">{{ error }}</p>
          <div>
            <label for="username1">Tên đăng nhập</label>
            <input
              v-model.trim="loginForm.username"
              type="text"
              placeholder="0988877777"
              id="username1"
            />
          </div>
          <div>
            <label for="password1">Mật khẩu</label>
            <input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="Mật khẩu"
              id="password1"
            />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <p v-if="error" class="error-msg">{{ error }}</p>
          <div>
            <label for="name">Họ và tên</label>
            <input
              v-model.trim="registerForm.name"
              type="text"
              placeholder="Họ và tên"
              id="name"
            />
          </div>
          <div>
            <label for="username">Tên đăng nhập</label>
            <input
              v-model.trim="registerForm.username"
              type="text"
              placeholder="Tên đăng nhập"
              id="username"
            />
          </div>
          <div>
            <label for="password2">Mật khẩu</label>
            <input
              v-model.trim="registerForm.password"
              type="password"
              placeholder="Mật khẩu"
              id="password2"
            />
          </div>
          <div>
            <label for="email2">Email</label>
            <input
              v-model.trim="registerForm.email"
              type="text"
              placeholder="Email"
              id="email2"
            />
          </div>
          <button @click="register()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";
import { auth, mapAuthField } from "../store/modules/auth";
import store from "@/store";
if (!store.state.auth) store.registerModule(`auth`, auth);
export default {
  name: "Login",
  components: {
    PasswordReset
  },
  data() {
    return {
      showPasswordReset: false,
      showLoginForm: true,
      loginForm: {
        username: "",
        password: ""
      },
      registerForm: {
        name: "",
        username: "",
        password: "",
        email: ""
      }
    };
  },
  computed: {
    ...mapAuthField([`error`, `success`])
  },
  methods: {
    login() {
      store.dispatch("auth/login", {
        username: this.loginForm.username,
        password: this.loginForm.password
      });
    },
    register() {
      store.dispatch("auth/register", {
        name: this.registerForm.name,
        username: this.registerForm.username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        userRole: "Admin",
        status: 1
      });
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
      this.error = null;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
      this.error = null;
    }
  }
};
</script>
