import axios from "axios";
import API, { DYNAMIC_URLS } from "../api/index";
import context from "../main";

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access_token");
    const accountId = sessionStorage.getItem("accountId");
    accessToken && (config.headers["TOKEN"] = accessToken);
    accountId && (config.headers["operatorAccountId"] = accountId);
    if (API[config.url]) {
      config.url = API[config.url];
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      switch (response.data.opCode) {
        case "001":
        case "002":
          if (event.body.msg.includes("token")) {
            context.config.globalProperties.$message({
              message: "会话过期,请重新登录",
              grouping: true,
              type: "error",
            });
            localStorage.clear();
            context.config.globalProperties.push("/login");
          }
          break;
        case "003":
          context.config.globalProperties.$message({
            message: `${response.data.opMsg},请联系管理员`,
            grouping: true,
            type: "error",
          });
          break;
        case "00001": // 登录凭证不能为空
        case "00002": // 登录凭证已失效,请重新登录
          context.config.globalProperties.$message({
            message: `${response.data.msg}`,
            grouping: true,
            type: "error",
          });
          localStorage.clear();
          context.config.globalProperties.push("/login");
          break;
        case "00003": // 用户无权限,请联系管理员
          setTimeout(() => {
            context.config.globalProperties.$message({
              message: `${response.data.msg}`,
              grouping: true,
              type: "error",
            });
          }, 0);
          break;
      }
    }
  },
  (error) => {
    if (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error" ||
      error.message.includes("timeout")
    ) {
      // context.config.globalProperties.$message({
      //   message: `网络超时`,
      //   grouping: true,
      //   type: "error",
      // });
      return Promise.reject(error);
    }
    switch (error.status) {
      case 404:
        context.config.globalProperties.push("/404");
        break;
      case 403:
        context.config.globalProperties.push("/403");
        break;
      case 500:
        context.config.globalProperties.$message({
          message: `服务器内部错误`,
          grouping: true,
          type: "error",
        });
        break;
    }
  }
);

export const getDynamicUrl = (url, dynamicPart) => {
  return DYNAMIC_URLS(url, dynamicPart);
};

export default service;
