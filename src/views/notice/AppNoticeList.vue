<template>
  <div class="container align-items-start">
    <div class="main">
      <h2>공지사항</h2>
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

      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
import BoardSearchMenu from "@/components/board/BoardSearchMenu.vue";
import BoardList from "@/components/board/BoardList.vue";
import store from "@/store";
import AppNoticeWrite from "@/views/notice/AppNoticeWrite.vue";
import {getNoticeList} from "@/api/notice";

export default {
  name: "AppNoticeList.vue",
  computed: {
    AppNoticeWrite() {
      return AppNoticeWrite
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
      linkItem:'AppNoticeDetail',
      searchString: "",
      searchType: 0,
      size: 10,
      start: 0,
      currentPage: 1,
      pageSize: 1,
      linkWrite: "/notice/write",

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
      getNoticeList(
          param,
          ({data}) => {
            console.log(data)
            this.BoardList = data.list;
            this.pageSize = data.page;
          },
          (error) => {
            console.log(error)
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

</style>