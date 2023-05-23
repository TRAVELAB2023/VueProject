import Vue from "vue";
import VueRouter from "vue-router";
import UserLogin from "@/components/user/UserLogin";
import UserJoin from "@/components/user/UserJoin";
import UserFindPassword from "@/components/user/UserFindPassword";

import PlanList from "@/components/plan/PlanList";
import PlanDetail from "@/components/plan/PlanDetail";
import PlanShareDetail from "@/components/plan/PlanShareDetail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",

    redirect: "/main",
  },
  {
    path: "/main",
    name: "AppMain",
    component: () => import(/* webpackChunkName: "main" */ "@/views/AppMain.vue"),
  },
  {
    path: "/board",
    name: "AppBoard",
    component: () => import(/* webpackChunkName: "board" */ "@/views/board/AppBoard.vue"),
  },
  {
    path: "/notice",
    name: "AppNotice",
    component: () => import(/* webpackChunkName: "board" */ "@/views/notice/AppNotice.vue"),
  },
  {
    path: "/plan",
    name: "AppPlan",
    redirect: "/plan/list",
    component: () => import(/* webpackChunkName: "Plan" */ "@/views/AppPlan.vue"),
    children: [
      {
        path: "list",
        name: "PlanList",
        component: PlanList,
      },
      {
        path: "detail/:planid",
        name: "PlanDetail",
        component: PlanDetail,
      },
      {
        path: "share/:key",
        name: "PlanShareDetail",
        component: PlanShareDetail,
      },
    ],
  },
  {
    path: "/createplan",
    name: "AppCreatePlan",
    component: () => import(/* webpackChunkName: "createPlan" */ "@/views/AppCreatePlan.vue"),
  },
  {
    path: "/user",
    name: "AppUser",
    redirect: "/user/login",
    component: () => import(/* webpackChunkName: "board" */ "@/views/AppUser.vue"),
    children: [
      {
        path: "login",
        name: "UserLogin",
        component: UserLogin,
      },
      {
        path: "join",
        name: "UserJoin",
        component: UserJoin,
      },
      {
        path: "findpw",
        name: "UserFindPassword",
        component: UserFindPassword,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
