<template>
  <div>
    <p v-if="isLoading">đang loading</p>
    <p v-else>đã load xong</p>
    <div v-for="post in posts" :key="post.id">
      <p>{{ post.title }}</p>
      <button>{{ post.id }}</button>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { mapState } from "vuex";
export default {
  name: "Setting",
  data() {
    return {};
  },
  computed: {
    ...mapState(["isLoading", "posts"])
  },
  created: () => {
    store.dispatch("getPosts");
  },
  methods: {}
};
</script>

<style scoped></style>
