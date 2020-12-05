import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "./libs/axios";
import vuetify from "./plugins/vuetify";
import BootstrapVue from "bootstrap-vue";
import "./assets/scss/app.scss";
import "../node_modules/nprogress/nprogress.css";
import "./vee-validate";
import { ValidationObserver, ValidationProvider } from "vee-validate";
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.prototype.$axios = Axios;
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    submitForm(fn) {
      let observer = this.$refs.obs;
      observer.validate().then(success => {
        if (!success) {
          const errors = Object.entries(observer.errors)
            .map(([key, value]) => ({ key, value }))
            .filter(error => error["value"].length);
          observer.refs[errors[0]["key"]].$el.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          return;
        }
        fn();
      });
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

