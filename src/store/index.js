import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    refCount: 0,
    isLoading: false
  },
  getters: {},
  mutations: {
    loading(state, isLoading) {
      if (isLoading) {
        state.refCount++;
        state.isLoading = true;
      } else if (state.refCount > 0) {
        state.refCount--;
        state.isLoading = state.refCount > 0;
      }
    }
  },
  actions: {},
  modules: {}
});
