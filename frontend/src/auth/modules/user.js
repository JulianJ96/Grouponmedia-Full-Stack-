import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import apiCall from "../../utils/api";
import { AUTH_LOGOUT } from "../actions/auth";
import { reactive, toRefs } from "vue";

const state = reactive({
  status: "",
  profile: {}
});

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    apiCall({ url: "user/me" })
      .then(resp => {
        commit(USER_SUCCESS, resp);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [USER_REQUEST](state) {
    state.status = "loading";
  },
  [USER_SUCCESS](state, resp) {
    state.status = "success";
    state.profile = resp;
  },
  [USER_ERROR](state) {
    state.status = "error";
  },
  [AUTH_LOGOUT](state) {
    state.profile = {};
  }
};

export default {
  state: toRefs(state),
  getters,
  actions,
  mutations
};
