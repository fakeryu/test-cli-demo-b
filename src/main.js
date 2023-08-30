/*
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 14:57:33
 * @Description: 请填写简介
 */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
// import installElementPlus from "./plugins/element";
import "./assets/css/icon.css";
import "amfe-flexible/index.js";
import router from "./router";
import ElementPlus from '../node_modules/element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(ElementPlus)

app.use(store).use(router).mount("#app");

export default app;
