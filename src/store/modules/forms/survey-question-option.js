import { getField, updateField } from "vuex-map-fields";

import { ADD_ROW } from "../../mutation-types";
import { SurveyQuestionOption } from "../../../models/SurveyQuestionOption";

const mutations = {
  updateField,
  [ADD_ROW](state) {
    // To enable multi-row form handling
    // we make it possible to add new rows.
    state.rows.push(new SurveyQuestionOption());
  }
};

const getters = {
  getField
};

const state = () => ({
  rows: [new SurveyQuestionOption()]
});

export default {
  namespaced: true,
  mutations,
  getters,
  state
};
