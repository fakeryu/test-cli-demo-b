import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: "首页",
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Welcome.vue"),
      },
      {
        path: "/404",
        name: "404",
        meta: {
          title: "找不到页面",
        },
        component: () =>
          import(/* webpackChunkName: "404" */ "../views/404.vue"),
      },
      {
        path: "/403",
        name: "403",
        meta: {
          title: "没有权限",
        },
        component: () =>
          import(/* webpackChunkName: "403" */ "../views/403.vue"),
      },
      // {
      //   path: "/orgManage",
      //   name: "orgManage",
      //   meta: {
      //     title: "组织管理",
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "orgManage" */ "../views/basicConfig/orgManage.vue"
      //     ),
      // }
      // {
      //   path: "/user",
      //   name: "user",
      //   meta: {
      //     title: "个人中心",
      //   },
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ "../views/User.vue"),
      // },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  ,
  {
    path: "/*",
    redirect: "/index",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-demo`;
  const token = sessionStorage.getItem("access_token");
  if (!token && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/403");
  } else {
    next();
  }
  //  next()
});

export default router;
