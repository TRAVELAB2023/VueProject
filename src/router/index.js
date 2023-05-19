import Vue from "vue";
import VueRouter from "vue-router";
import UserLogin from "@/components/user/UserLogin";
import UserJoin from "@/components/user/UserJoin";
import UserFindPassword from "@/components/user/UserFindPassword";
import AppBoard from "@/views/AppBoard.vue";
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
    redirect: "/board/list",
    name: "AppBoard",
    component: AppBoard,
    children: [
      {
        path: "detail",
        component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/AppBoardDetail.vue"),
      },
      {
        path: "list",
        component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/AppBoardList.vue"),
      }
    ]
  },
  {
    path: "/notice",
    name: "AppNotice",
    component: () => import(/* webpackChunkName: "board" */ "@/views/AppNotice.vue"),
      children: [
      ]
  },
  {
    path: "/plan",
    name: "AppPlan",
    component: () => import(/* webpackChunkName: "Plan" */ "@/views/AppPlan.vue"),
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
