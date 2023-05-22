import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardId: "0",
    myAttractionList: [],
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
    async deleteAttraction(state, targetAttraction) {
      console.log(state.myAttractionList);
      let index = state.myAttractionList.findIndex((attraction) => {
        return attraction.contentId === targetAttraction.contentId;
      });
      state.myAttractionList.splice(index, 1);
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
