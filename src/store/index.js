import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { getAttractionList } from "@/api/attraction";
import memberStore from "@/store/module/memberStore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardId: "0",
    noticeId: "0",
    myAttractionList: [], // sidebar에 관광지 리스트
    mapAttractionsList: [], // 맵에 띄우는 관광지 리스트
    boardWrite: true,
    noticeWrite: false,
  },
  getters: {
    getBoardId(state) {
      return state.boardId;
    },
    getNoticeId(state) {
      return state.noticeId
    },
    getBoardWrite(state) {
      return state.boardWrite
    },
    getNoticeWrite(state) {
      return state.noticeWrite
    },
  },
  mutations: {
    changeNoticeWrite(state, flag) {
      state.noticeWrite=flag;
    },
    changeBoardId(state, boardId) {
      state.boardId = boardId;
    },
    changeNoticeId(state, noticeId) {
      state.noticeId=noticeId;
    },
    pushAttraction(state, attraction) {
      state.myAttractionList.push({
        addr1: attraction.addr1,
        contentId: attraction.contentId,
        firstImage: attraction.firstImage,
        latitude: attraction.latitude,
        longitude: attraction.longitude,
        overview: attraction.overview,
        title: attraction.title,
      });
    },
    deleteAttraction(state, targetAttraction) {
      let index = state.myAttractionList.findIndex((attraction) => {
        return attraction.contentId === targetAttraction.contentId;
      });
      state.myAttractionList.splice(index, 1);
    },
    initAttractionList(state, attractionList) {
      console.log(attractionList);
      state.myAttractionList = attractionList;
    },
    initMapAttractionList(state, attractionList) {
      state.mapAttractionsList = attractionList;
    },
    pushMapAttractionList(state, attraction) {
      state.mapAttractionsList.push(attraction);
    },
  },
  actions: {
    getMapAttractionList(context, params) {
      getAttractionList(
        params,
        ({ data }) => {
          this.commit("initMapAttractionList", data);
        },
        (error) => {
          console.log(error)
          this.commit("initMapAttractionList", []);
          alert(error.response.data);
        }
      );
    },
  },
  modules: {
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
