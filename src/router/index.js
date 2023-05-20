import Vue from "vue";
import VueRouter from "vue-router";
import UserLogin from "@/components/user/UserLogin";
import UserJoin from "@/components/user/UserJoin";
import UserFindPassword from "@/components/user/UserFindPassword";
import AppBoard from "@/views/board/AppBoard.vue";
import AppBoardWrite from "@/views/board/AppBoardWrite.vue";
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
        component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/board/AppBoardDetail.vue"),
      },
      {
        path: "list",
        name: AppBoardWrite,
        component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/board/AppBoardList.vue"),
      },
      {
        path: "write",
        component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/board/AppBoardWrite.vue"),
      },
    ]
  },
  {
    path: "/notice",
    name: "AppNotice",
    redirect: "/notice/list",
    component: () => import(/* webpackChunkName: "board" */ "@/views/notice/AppNotice.vue"),
      children: [
        {
          path: "list",
          component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/notice/AppNoticeList.vue"),
        },
        {
          path: "write",
          component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/notice/AppNoticeWrite.vue"),
        },{
          path: "detail",
          component: () => import(/* webpackChunkName: "AppBoard" */ "@/views/notice/AppNoticeDetail.vue"),
        },
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
