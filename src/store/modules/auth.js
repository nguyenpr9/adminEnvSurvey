import { createHelpers, getField, updateField } from "vuex-map-fields";
import { ERROR, SUCCESS } from "../mutation-types";
import RepositoryFactory from "@/repository/RepositoryFactory";
import router from "../../router";
const AuthRepository = RepositoryFactory.get("auth");

const state = () => ({
  error: false,
  success: false,
  user: {},
  loggedIn: false
});
const actions = {
  async logout({ commit }) {
    commit("CLEAR_USER_DATA");
    if (router.currentRoute.path !== "/login") {
      await router.push("/login");
    }
  },
  async login({ commit }, params) {
    let response = await AuthRepository.login(params);
    if (response.status === true) {
      commit("SAVE_USER_INFO", response);
      await router.push("/");
    } else {
      commit(ERROR, response.message);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async register({ commit, dispatch }, params) {
    let response = await AuthRepository.register(params);
    if (response.status === true) {
      commit("SAVE_USER_INFO", response);
      await dispatch("login", {
        username: params.username,
        password: params.password
      });
    } else {
      commit(ERROR, response.message);
    }
  },
  checkAuth({ commit }) {
    if (localStorage.getItem("app_user")) {
      try {
        const user = JSON.parse(localStorage.getItem("app_user"));
        commit("UPDATE_LOGIN_STATUS", true);
        commit("SET_LOCAL_USER_INFO", user);
      } catch (err) {
        commit("UPDATE_LOGIN_STATUS", false);
      }
    } else {
      commit("UPDATE_LOGIN_STATUS", false);
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
  },
  SAVE_USER_INFO(state, payload) {
    state.user = payload.data;
    localStorage.setItem("app_user", JSON.stringify(payload.data));
    localStorage.setItem("app_token", payload.data.token);
  },
  SET_LOCAL_USER_INFO(state, payload) {
    state.user = payload;
  },
  UPDATE_LOGIN_STATUS(state, payload) {
    state.loggedIn = payload;
  },
  CLEAR_USER_DATA(state) {
    state.user = {};
    state.loggedIn = false;
    localStorage.removeItem("app_user");
    localStorage.removeItem("app_token");
  }
};

const getters = {
  getField,
  loggedIn: state => state.loggedIn,
  user: state => state.user
};
export const { mapFields: mapAuthField } = createHelpers({
  getterType: `auth/getField`,
  mutationType: `auth/updateField`
});
export const auth = {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
};
