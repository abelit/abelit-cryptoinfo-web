import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import axios from "axios";
import VueAxios from "vue-axios";
import Cookies from "js-cookie";
import "./permissions";

const app = createApp(App);
app
  .use(Antd)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .provide("axios", app.config.globalProperties.axios)
  .mount("#app");
