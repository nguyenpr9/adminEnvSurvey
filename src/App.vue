<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout || "div";
    }
  }
};
</script>
<style lang="scss">
@import "assets/base.scss";
</style>
