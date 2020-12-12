import Vue from "vue";
import Vuex from "vuex";
import RepositoryFactory from "@/repository/RepositoryFactory";
const StatisticRepository = RepositoryFactory.get("statistic");
Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state: {
    refCount: 0,
    isLoading: false,
    statisticSurveyUserCount: [],
    statisticDashboard: []
  },
  actions: {
    async statisticSurveyUserCount({ commit }) {
      let response = await StatisticRepository.surveyUserCount();
      if (response.status === true) {
        commit("setStatisticSurveyUserCount", response.data);
      }
    },
    async statisticDashboard({ commit }) {
      let response = await StatisticRepository.dashboard();
      if (response.status === true) {
        commit("setStatisticDashboard", response.data);
      }
    }
  },
  getters: {},
  mutations: {
    setStatisticDashboard(state, params) {
      state.statisticDashboard = params;
    },
    setStatisticSurveyUserCount(state, params) {
      state.statisticSurveyUserCount = params;
    },
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
  modules: {}
});
