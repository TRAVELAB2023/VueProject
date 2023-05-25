<template>
  <div data-sal="zoom-in" data-sal-delay="500" data-sal-easing="ease-out-back" class="container align-items-start">
    <div class="main">
      <div style="height: 10px;"></div>
      <h2>여행 후기</h2>
      <board-search-menu
          v-bind:link="linkWrite" v-bind:flaglink="flaglink"
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
import sal from 'sal.js';
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
    this.init();
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
      flaglink:'getBoardWrite',

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
    async init(){
      let param = {
        searchString: this.searchString,
        searchType: this.searchType,
        size: this.size,
        start: this.start
      }

      await this.search(param);
      sal()
    },
    async search(param) {
      await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
      await getBoardList(
          param,
          ({data}) => {
            this.BoardList = data.boardListDtoList;
            this.pageSize = data.page;
            if (this.pageSize == 0) {
              this.pageSize = 1;
            }
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