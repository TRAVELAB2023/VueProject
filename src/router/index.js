import Vue from "vue";
import VueRouter from "vue-router";
import UserLogin from "@/components/user/UserLogin";
import UserJoin from "@/components/user/UserJoin";
import UserFindPassword from "@/components/user/UserFindPassword";
import AppBoard from "@/views/board/AppBoard.vue";
import store from "@/store";
import UserInfo from "@/components/user/UserInfo.vue";
import UserCheckAuth from "@/components/user/UserCheckAuth.vue";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
    const checkUserInfo = store.getters["memberStore/checkUserInfo"];
    const checkToken = store.getters["memberStore/checkToken"];
    let token = sessionStorage.getItem("auth-token");
    console.log(store.getters);
    console.log("로그인 처리 전", checkUserInfo, token);

    if (checkUserInfo != null && token) {
        console.log("토큰 유효성 체크하러 가자!!!!");
        await store.dispatch("memberStore/getUserInfo", token);
    }
    if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        // next({ name: "login" });
        if (from.name != "UserLogin") {
            router.push({name: "UserLogin"});
        }
    } else {
        console.log("로그인 했다!!!!!!!!!!!!!.");
        next();
    }
};
const noticeAuth =(to, from, next) => {
    console.log("check!!!!!!!!!!")
    if(store.getters["memberStore/checkUserInfo"].role=='admin'){
        store.commit("changeNoticeWrite", true);
    }
    next();
}
const routes = [
    {
        path: "/",
        redirect: "/user/login",
    },
    {
        path: "/main",
        name: "AppMain",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "main" */ "@/views/AppMain.vue"),
    },
    {
        path: "/board",
        redirect: "/board/list",
        name: "AppBoard",
        component: AppBoard,
        beforeEnter: onlyAuthUser,
        children: [
            {
                path: "detail",
                name: "AppBoardDetail",
                props: true,
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/board/AppBoardDetail.vue"),
            },
            {
                path: "modify",
                name: "AppBoardModify",
                props: true,
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/board/AppBoardModify.vue"),
            },
            {
                path: "list",
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/board/AppBoardList.vue"),
            },
            {
                path: "write",
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/board/AppBoardWrite.vue"),
            },
        ],
    },
    {
        path: "/notice",
        name: "AppNotice",
        redirect: "/notice/list",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "board" */ "@/views/notice/AppNotice.vue"),
        children: [
            {
                path: "list",
                beforeEnter: noticeAuth,
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/notice/AppNoticeList.vue"),
            },
            {
                path: "write",
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/notice/AppNoticeWrite.vue"),
            },
            {
                path: "detail",
                name: "AppNoticeDetail",
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/notice/AppNoticeDetail.vue"),
            },
            {
                path: "modify",
                name: "AppNoticeModify",
                props: true,
                component: () =>
                    import(/* webpackChunkName: "AppBoard" */ "@/views/notice/AppNoticeModify.vue"),
            },
        ],
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
                beforeEnter: onlyAuthUser,
                component: () => import(/* webpackChunkName: "Plan" */ "@/components/plan/PlanList.vue"),
            },
            {
                path: "detail/:planid",
                name: "PlanDetail",
                beforeEnter: onlyAuthUser,
                component: () => import(/* webpackChunkName: "Plan" */ "@/components/plan/PlanDetail.vue"),
            },
            {
                path: "share/:key",
                name: "PlanShareDetail",
                component: () => import(/* webpackChunkName: "Plan" */ "@/components/plan/PlanShareDetail.vue"),
            },
        ],
    },
    {
        path: "/createplan",
        name: "AppCreatePlan",
        beforeEnter: onlyAuthUser,
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
            }, {
                path: "info",
                name: "UserInfo",
                component: UserInfo,
            },{
            path: "check/:key",
                name: "UserCheck",
                component: UserCheckAuth,

            }
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
