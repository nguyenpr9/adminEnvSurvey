import { User, CreateUser } from "../../models/User";
import { getField, updateField, createHelpers } from "vuex-map-fields";
import { ERROR, SUCCESS } from "../mutation-types";
import { CREATE, DELETE } from "../action-types";
import RepositoryFactory from "@/repository/RepositoryFactory";
import router from "../../router";

const UserRepository = RepositoryFactory.get("user");
const AuthRepository = RepositoryFactory.get("auth");
const state = () => ({
  error: false,
  success: false,
  user: new User(),
  data: [],
  flag: false,
  selectedRows: [],
  isBusy: true
});
const actions = {
  // eslint-disable-next-line no-unused-vars
  async fetchUsers({ commit }, params) {
    commit("setIsBusy", true);
    const response = await UserRepository.getAll();
    if (response.status) {
      commit("fetchData", response.data);
    } else {
      commit(ERROR, response.message);
    }
    commit("setIsBusy", false);
  },
  async [CREATE]({ commit, state }) {
    let userData = CreateUser({
      user: state.user
    });
    let response = await AuthRepository.register(userData);
    if (response.status) {
      await router.push("/user");
    } else {
      commit(ERROR, response.message);
    }
  },
  async [DELETE]({ commit }, id) {
    let response = await UserRepository.delete(id);
    if (response.status) {
      commit(SUCCESS, response.message);
    } else {
      commit(ERROR, response.message);
    }
  },
  async changeStatusUsers({ commit, state }, params) {
    commit("setIsBusy", true);
    let index = state.data.findIndex(item => item.id === params.id);
    if (index >= 0) {
      commit("updateUsers", { index, item: "status", value: params.status });
    } else
      commit("updateUsers", { index, item: "status", value: !params.status });
    commit("setIsBusy", false);
  }
};

const mutations = {
  updateField,
  updateUsers(state, payload) {
    state.data[payload.index][payload.item] = payload.value ? 1 : 0;
  },
  fetchData(state, data) {
    state.data = data;
  },
  setIsBusy(state, status) {
    state.isBusy = status;
  },
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
  }
};

const getters = {
  getField
};
export const { mapFields: mapUserField } = createHelpers({
  getterType: `user/getField`,
  mutationType: `user/updateField`
});
export const { mapMultiRowFields: mapMultiUserField } = createHelpers({
  getterType: `user/getField`,
  mutationType: `user/updateField`
});
export const user = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
};
