<template>
  <div id="login"></div>
</template>

<script>
import { auth } from "../store/modules/auth";
import store from "@/store";
if (!store.state.auth) store.registerModule(`auth`, auth);
export default {
  name: "Login",
  async created() {
    await store.dispatch("auth/logout");
  }
};
</script>
