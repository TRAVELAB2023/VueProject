<template>
  <div class="container align-items-start">
    <div class="main">
      <div style="height: 10px;"></div>
      <h2>여행 후기</h2>
      <board-search-menu
          v-bind:link="linkWrite"
          @search="search"
      ></board-search-menu>
      <BoardList
          v-bind:fields="fields" v-bind:board-list="BoardList"
          v-bind:link="linkItem"


      ></BoardList>
      <b-pagination-nav
          align="center"
          v-model="currentPage"
          :number-of-pages="pageSize"

          base-url="#"
          first-number
          last-number
          @input="pageMove"
          class="customPagination"
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
import BoardSearchMenu from "@/components/board/BoardSearchMenu.vue";
import BoardList from "@/components/board/BoardList.vue";
import AppBoardWrite from "@/views/board/AppBoardWrite.vue";
import {getBoardList} from "@/api/board";
import store from "@/store";
import AppBoardDetail from "@/views/board/AppBoardDetail.vue";

export default {
  name: "AppBoardList.vue",
  computed: {
    AppBoardDetail() {
      return AppBoardDetail
    },
    AppBoardWrite() {
      return AppBoardWrite
    },

  },
  components: {BoardSearchMenu, BoardList},
  created() {

    let param = {
      searchString: this.searchString,
      searchType: this.searchType,
      size: this.size,
      start: this.start
    }

    this.search(param);

  },

  data() {
    return {
      linkItem: 'AppBoardDetail',
      searchString: "",
      searchType: 0,
      size: 10,
      start: 0,
      currentPage: 1,
      pageSize: 1,
      linkWrite: "/board/write",

      fields: [
        {
          key: 'boardId',
          label: '글번호',
        },
        {
          key: 'title',
          label: '제목',
        },
        {
          key: 'writerNickname',
          label: '글쓴이',
        }, {
          key: 'hit',
          label: '조회수',
        },
        {
          key: 'registerTime',
          label: '작성시간'
        },

      ],
      BoardList: []


    }
  },

  methods: {
    async search(param) {
      await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
      getBoardList(
          param,
          ({data}) => {
            this.BoardList = data.boardListDtoList;
            this.pageSize = data.page;
          },
          async (error) => {
            console.log(error.response.status)




          }
      );
    },
    pageMove() {
      let param = {
        searchString: this.searchString,
        searchType: this.searchType,
        size: this.size,
        start: this.currentPage - 1
      }
      this.search(param);
    }
  }
}
</script>

<style scoped>
.customPagination > li > a {
  color: red;
}

.customPagination > li.active > a,
.customPagination > li > a:hover
{
  color: white;
  background-color: green!important;
}
</style>