/*
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-04 16:56:36
 * @Description: 请填写简介
 */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import installElementPlus from "./plugins/element";
import "./assets/css/icon.css";
import "amfe-flexible/index.js";
import router from "./router";

const app = createApp(App);

installElementPlus(app);

app.use(store).use(router).mount("#app");

export default app;
