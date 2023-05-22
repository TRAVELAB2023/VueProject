import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { getAttractionList } from "@/api/attraction";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardId: "0",
    myAttractionList: [], // sidebar에 관광지 리스트
    mapAttractionsList: [], // 맵에 띄우는 관광지 리스트
  },
  getters: {
    getBoardId(state) {
      return state.boardId;
    },
  },
  mutations: {
    changeBoardId(state, boardId) {
      state.boardId = boardId;
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
          this.commit("initMapAttractionList", []);
          alert(error.response.data);
        }
      );
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
