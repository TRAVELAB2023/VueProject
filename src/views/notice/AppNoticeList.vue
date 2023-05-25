<template>
  <div data-sal="zoom-in" data-sal-delay="500" data-sal-easing="ease-out-back" class="container align-items-start">
    <div class="main">
      <div style="height: 10px;"></div>
      <h2>공지사항</h2>
      <board-search-menu
          v-bind:link="linkWrite" v-bind:flaglink="flaglink"

          @search="search"
      ></board-search-menu>
      <BoardList
          v-bind:fields="fields" v-bind:board-list="BoardList"
        v-bind:link="linkItem"
      ></BoardList>
      <b-pagination-nav
          base-url="#"
          align="center"
          v-model="currentPage"
          :number-of-pages="pageSize"
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
import sal from 'sal.js';
export default {
  name: "AppNoticeList.vue",
  computed: {
    AppNoticeWrite() {
      return AppNoticeWrite
    },

  },
  destroyed() {
    store.commit("changeNoticeWrite", false);
  },
  components: {BoardSearchMenu, BoardList},
  created() {
    this.init();

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

      flaglink: 'getNoticeWrite',

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
    async init() {
      let param = {
        searchString: this.searchString,
        searchType: this.searchType,
        size: this.size,
        start: this.start
      }
      await this.search(param);
      sal();
    },
    async search(param) {
      await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
      await getNoticeList(
          param,
          ({data}) => {
            console.log(data)
            this.BoardList = data.list;
              this.pageSize = data.page;
            if (this.pageSize == 0) {
              this.pageSize = 1;
            }

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