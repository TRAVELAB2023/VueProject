import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    boardId: "0",
  },
  getters: {
    getBoardId(state){
      return state.boardId
    }
  },
  mutations: {
    changeBoardId(state, boardId){
      state.boardId=boardId;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState()
]

})
