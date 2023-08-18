import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "../views/Home.vue";
import FirstPageVue from "../views/FirstPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home",
        name: "FirstPage",
        meta: {
          title: "首页",
          keepAlive: false,
        },
        component: FirstPageVue,
      },
      {
        path: "/404",
        name: "404",
        meta: {
          title: "找不到页面",
        },
        component: () => import("../views/404.vue"),
      },
      {
        path: "/403",
        name: "403",
        meta: {
          title: "没有权限",
        },
        component: () => import("../views/403.vue"),
      },
      {
        path: "/robot/message",
        name: "RobotMessage",
        meta: {
          title: "机器人信息",
          keepAlive: true,
        },
        component: () => import("../views/robot/RobotMessage.vue"),
      },
      {
        path: "/robot/record",
        name: "RobotRecord",
        meta: {
          title: "手术记录",
          keepAlive: true,
        },
        component: () => import("../views/robot/RobotRecord.vue"),
      },
      {
        path: "/robot/task",
        name: "RobotTask",
        meta: {
          title: "机器人任务",
          keepAlive: true,
        },
        component: () => import("../views/robot/RobotTask.vue"),
      },
      {
        path: "/basic/org-manage",
        name: "OrgManage",
        meta: {
          title: "机构管理",
          keepAlive: true,
        },
        component: () => import("../views/basic/OrgManage.vue"),
      },
      {
        path: "/basic/hos-manage",
        name: "HosManage",
        meta: {
          title: "医院管理",
          keepAlive: true,
        },
        component: () => import("../views/basic/HosManage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("../views/Login.vue"),
  },
  ,
  {
    path: "/:catchAll(.*)", // 不识别的path自动匹配home
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 机器人管理系统`;
  // const token = sessionStorage.getItem("access_token");
  // if (!token && to.path !== "/login") {
  //   next("/login");
  // } else if (to.meta.permission) {
  //   // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
  //   role === "admin" ? next() : next("/403");
  // } else {
  //   next();
  // }
  next();
});

export default router;
