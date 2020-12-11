import { Faq, CreateFaq } from "../../models/Faq";
import { getField, updateField, createHelpers } from "vuex-map-fields";
import { ERROR, SUCCESS } from "../mutation-types";
import { ALL, CREATE, DELETE, ONE, UPDATE } from "../action-types";
import RepositoryFactory from "@/repository/RepositoryFactory";
import router from "../../router";

const FaqRepository = RepositoryFactory.get("faq");
const state = () => ({
  error: false,
  success: false,
  faq: new Faq(),
  data: [],
  flag: false,
  isBusy: true
});
const actions = {
  // eslint-disable-next-line no-unused-vars
  async [ALL]({ commit }) {
    commit("setIsBusy", true);
    const response = await FaqRepository.getAll();
    if (response.status === true) {
      commit("fetchData", response.data);
    } else {
      commit(ERROR, response.message);
    }
    commit("setIsBusy", false);
  },
  async [ONE]({ commit }, id) {
    commit("setIsBusy", true);
    const response = await FaqRepository.getOne(id);
    if (response.status === true) {
      commit("SETFAQ", response.data);
    } else {
      commit(ERROR, response.message);
    }
    commit("setIsBusy", false);
  },
  async [CREATE]({ commit, state }) {
    let faqData = CreateFaq({
      faq: state.faq
    });
    let response = await FaqRepository.create(faqData);
    if (response.status === true) {
      commit(SUCCESS, "Create faq successfully");
      await router.push("/faq");
    } else {
      commit(ERROR, response.message);
    }
  },
  async [UPDATE]({ commit, state }) {
    let response = await FaqRepository.update(state.faq);
    if (response.status === true) {
      commit(SUCCESS, "Update faq successfully");
      await router.push("/faq");
    } else {
      commit(ERROR, response.message);
    }
  },
  async [DELETE]({ commit }, id) {
    let response = await FaqRepository.delete(id);
    if (response.status === true) {
      commit(SUCCESS, "Delete user successfully");
    } else {
      commit(SUCCESS, "Delete user failed");
    }
  }
};

const mutations = {
  updateField,
  updateFaq(state, payload) {
    state.data[payload.index][payload.item] = payload.value ? 1 : 0;
  },
  fetchData(state, data) {
    state.data = data;
  },
  SETFAQ(state, data) {
    state.faq = data;
  },
  setIsBusy(state, status) {
    state.isBusy = status;
  },
  RESETFAQ(state) {
    state.faq = new Faq();
  },
  [ERROR](state, error) {
    // eslint-disable-next-line no-param-reassign
    state.error = error;
    // eslint-disable-next-line no-param-reassign
    state.success = false;

    setTimeout(() => {
      state.error = false;
    }, 1200);
  },
  [SUCCESS](state, error) {
    // eslint-disable-next-line no-param-reassign
    state.error = false;
    // eslint-disable-next-line no-param-reassign
    state.success = error;

    setTimeout(() => {
      state.success = false;
    }, 2000);
  }
};

const getters = {
  getField
};
export const { mapFields: mapFaqField } = createHelpers({
  getterType: `faq/getField`,
  mutationType: `faq/updateField`
});
export const { mapMultiRowFields: mapMultiFaqField } = createHelpers({
  getterType: `faq/getField`,
  mutationType: `faq/updateField`
});
export const faq = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
};
