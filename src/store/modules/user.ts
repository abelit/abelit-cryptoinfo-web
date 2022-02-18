import { login, register, logout, getUserInfo } from "@/api/user";
import { setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: "",
    userInfo: localStorage.getItem("userInfo") || "",
  },
  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      state.token = token;
    },
    SET_USERINFO: (state: any, userInfo: any) => {
      state.userInfo = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", state.userInfo);
    },
  },
  actions: {
    // 登录
    login({ commit }: any, userInfo: { username: any; password: any }) {
      // alert("hello action");
      const { username, password } = userInfo;
      return new Promise<void>((resolve, reject) => {
        login({ username: username.trim(), password: password.trim() })
          .then((response: any) => {
            const { data } = response;
            console.log(response);
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    register(
      { commit }: any,
      userInfo: { username: string; password: string; email: string }
    ) {
      const { username, password, email } = userInfo;
      return new Promise<void>((resolve, reject) => {
        register({
          username: username.trim(),
          password: password.trim(),
          email: email.trim(),
        })
          .then((response: { data: any }) => {
            const { data } = response;
            // commit("SET_TOKEN", data.token);
            // setToken(data.token);
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    // 登出
    logout({ commit }: any) {
      return new Promise<void>((resolve, reject) => {
        logout()
          .then((response: any) => {
            commit("SET_TOKEN", "");
            commit("SET_USERINFO", "");
            removeToken();
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    getUserInfo({ commit }: any) {
      return new Promise<void>((resolve, reject) => {
        getUserInfo()
          .then((response: any) => {
            const { data } = response;
            // console.log(data);
            // console.log(typeof data);
            commit("SET_USERINFO", data);
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
