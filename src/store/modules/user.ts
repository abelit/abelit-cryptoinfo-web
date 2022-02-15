import { login, register } from "@/api/user";
import { setToken } from "@/utils/auth";

const user = {
  state: {
    token: "",
  },
  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      state.token = token;
    },
  },
  actions: {
    // 登录
    login({ commit }: any, userInfo: { username: any; password: any }) {
      alert("hello action");
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
  },
};

export default user;
