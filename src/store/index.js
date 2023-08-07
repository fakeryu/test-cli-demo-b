/*
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-07 14:34:06
 * @Description: vuex
 */
import { createStore } from "vuex";

export default createStore({
  state: {
    tagsList: [],
    collapse: false,
    appConfig: {},
  },
  mutations: {
    delTagsItem(state, data) {
      state.tagsList.splice(data.index, 1);
    },
    setTagsItem(state, data) {
      state.tagsList.push(data);
    },
    clearTags(state) {
      state.tagsList = [];
    },
    closeTagsOther(state, data) {
      state.tagsList = data;
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(state.tagsList[i + 1].path);
          } else if (i > 0) {
            data.$router.push(state.tagsList[i - 1].path);
          } else {
            data.$router.push("/");
          }
          state.tagsList.splice(i, 1);
          break;
        }
      }
    },
    // 侧边栏折叠
    handleCollapse(state, data) {
      state.collapse = data;
    },
    // 全局系统名称
    setAppConfig(state, data) {
      state.appConfig = data;
    },
  },
  actions: {},
  modules: {},
});
