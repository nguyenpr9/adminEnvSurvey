<template>
  <v-app>
    <div class="app-container app-theme-white">
      <slot></slot>
    </div>
  </v-app>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog } from "@fortawesome/free-solid-svg-icons";
library.add(faCog);

export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
