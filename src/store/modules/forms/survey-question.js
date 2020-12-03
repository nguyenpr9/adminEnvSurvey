import { getField, updateField } from "vuex-map-fields";

import {
  ADD_CHILD_ROW,
  ADD_ROW,
  REMOVE_CHILD_ROW,
  REMOVE_ROW
} from "../../mutation-types";
import { SurveyQuestion } from "../../../models/SurveyQuestion";
import { SurveyQuestionOption } from "../../../models/SurveyQuestionOption";

const mutations = {
  updateField,
  updateOptions(state, data) {
    state.rows[data.qIndex].options[data.oIndex][data.title] = data.value;
  },
  [ADD_ROW](state) {
    state.rows.push(new SurveyQuestion());
  },
  [ADD_CHILD_ROW](state, index) {
    state.rows[index].options.push(new SurveyQuestionOption());
  },
  [REMOVE_ROW](state, index) {
    state.rows.splice(index, 1);
  },
  [REMOVE_CHILD_ROW](state, i) {
    let length = state.rows[i.index].options.length;
    if (length > 1) {
      state.rows[i.index].options.splice(i.index1, 1);
    }
  }
};

const getters = {
  getField
};

const state = () => ({
  rows: [new SurveyQuestion()]
});

export default {
  namespaced: true,
  mutations,
  getters,
  state
};
