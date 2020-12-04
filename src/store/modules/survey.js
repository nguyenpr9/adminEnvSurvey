import { Survey, CreateSurvey } from "../../models/Survey";
import { SurveyQuestion } from "../../models/SurveyQuestion";
import { getField, updateField, createHelpers } from "vuex-map-fields";
import { ERROR, SUCCESS } from "../mutation-types";
import { ALL, CREATE, UPDATE, ONE } from "../action-types";
import RepositoryFactory from "@/repository/RepositoryFactory";
import surveyQs from "./forms/survey-question";
import router from "../../router";

const SurveyRepository = RepositoryFactory.get("survey");
const state = () => ({
  error: false,
  success: false,
  survey: new Survey(),
  data: []
});
const actions = {
  async [ONE]({ commit }, id) {
    commit("setIsBusy", true);
    const response = await SurveyRepository.getOne(id);
    if (response.status) {
      commit("SETSURVEY", response.data);
    } else {
      commit(ERROR, response.message);
    }
    commit("setIsBusy", false);
  },
  async [ALL]({ commit }) {
    commit("setIsBusy", true);
    const response = await SurveyRepository.getAll();
    if (response.status) {
      commit("fetchData", response.data);
    } else {
      commit(ERROR, response.message);
    }
    commit("setIsBusy", false);
  },
  async [CREATE]({ commit, state }) {
    commit("setUserIdSurvey");
    let surveyData = CreateSurvey(
      {
        survey: state.survey
      },
      { surveyQs: state.surveyQs.rows }
    );
    console.log(surveyData);
    let response = await SurveyRepository.create(surveyData);
    if (response.status === true) {
      await router.push("/survey");
    } else {
      commit(ERROR, response.message);
    }
  },
  async [UPDATE]({ commit, state }) {
    let response = await SurveyRepository.update(state.survey);
    if (response.status) {
      await router.push("/survey");
    } else {
      commit(ERROR, response.message);
    }
  }
};

const mutations = {
  updateField,
  [ERROR](state, error) {
    // eslint-disable-next-line no-param-reassign
    state.error = error;
    // eslint-disable-next-line no-param-reassign
    state.success = false;
  },
  [SUCCESS](state) {
    // eslint-disable-next-line no-param-reassign
    state.error = false;
    // eslint-disable-next-line no-param-reassign
    state.success = true;
  },
  setIsBusy(state, status) {
    state.isBusy = status;
  },
  fetchData(state, data) {
    state.data = data;
  },
  setUserIdSurvey(state) {
    state.survey.userId = JSON.parse(localStorage.getItem("app_user")).userId;
  },
  SETSURVEY(state, data) {
    state.survey = data;
    state.surveyQs.rows = [];
    data.questions.forEach(v => {
      state.surveyQs.rows.push(v);
    });
  },
  RESETSURVEY(state) {
    state.survey = new Survey();
    state.surveyQs.rows = [new SurveyQuestion()];
  }
};

const modules = {
  surveyQs
};
export const { mapFields: mapSurveyField } = createHelpers({
  getterType: `survey/getField`,
  mutationType: `survey/updateField`
});

export const { mapMultiRowFields: mapSurveyQsMultiRowFields } = createHelpers({
  getterType: `survey/surveyQs/getField`,
  mutationType: `survey/surveyQs/updateField`
});
export const { mapMultiRowFields: mapSurveyQsOpMultiRowFields } = createHelpers({
  getterType: `survey/surveyQsOp/getField`,
  mutationType: `survey/surveyQsOp/updateField`
});

const getters = {
  getField
};
export const survey = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
  modules
};
