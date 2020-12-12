<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>EnvSurvey</h1>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <v-alert type="error" v-if="error">{{ error }}</v-alert>
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
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <v-alert type="error" v-if="error">{{ error }}</v-alert>
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
import { auth, mapAuthField } from "../store/modules/auth";
import store from "@/store";
import moment from "moment";
if (!store.state.auth) store.registerModule(`auth`, auth);
export default {
  name: "Login",
  data() {
    return {
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
        dateOfJoining: moment().format("YYYY-MM-DD"),
        userRole: "Admin",
        status: 1
      });
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
      this.error = null;
    }
  }
};
</script>
