import { createStore } from "vuex";
import user from "@/store/modules/user";
import getters from "@/store/getters";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
  getters: getters,
});
