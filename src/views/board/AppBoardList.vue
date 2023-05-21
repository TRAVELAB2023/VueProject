<template>
  <div class="container align-items-start">
    <div class="main">
      <h2>여행 후기</h2>
      <board-search-menu
          v-bind:link="link"
      ></board-search-menu>
      <BoardList
          v-bind:fields="fields" v-bind:board-list="BoardList"


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
import AppBoardWrite from "@/views/board/AppBoardWrite.vue";
import {getBoardList} from "@/api/board";

export default {
  name: "AppBoardList.vue",
  computed: {
    AppBoardWrite() {
      return AppBoardWrite
    }
  },
  components: {BoardSearchMenu, BoardList},
  created(){

    let param= {
          searchString:this.searchString,
          searchType: this.searchType,
          size: this.size,
          start: this.start
    }

    getBoardList(
        param,
        ({ data }) => {
          this.BoardList = data.boardListDtoList;
          this.pageSize=data.page;
        },
        (error) => {
          console.log(error);
        }
    );
  },

  data() {
    return {
      searchString: "",
      searchType: 0,
      size: 10,
      start: 0,
      currentPage: 1,
      pageSize:1,
      link:"/board/write",

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
        },{
          key: 'hit',
          label: '조회수',
        },
        {
          key: 'registerTime',
          label: '작성시간'
        },

      ],
      BoardList: []


    }},
  methods:{
    pageMove(){
      let param= {
        searchString:this.searchString,
        searchType: this.searchType,
        size: this.size,
        start: this.currentPage-1
      }
      getBoardList(
          param,
          ({ data }) => {
            this.BoardList = data.boardListDtoList;
            this.pageSize=data.page;
          },
          (error) => {
            console.log(error);
          }
      );
    }
  }
}
</script>

<style scoped>

</style>