import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "./libs/axios";
import vuetify from "./plugins/vuetify";
import BootstrapVue from "bootstrap-vue";
import "./assets/scss/app.scss";
import "../node_modules/nprogress/nprogress.css";
Vue.prototype.$axios = Axios;
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
