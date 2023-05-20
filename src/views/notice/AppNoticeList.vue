<template>
  <div class="container align-items-start">
    <div class="main  ">
      <h2>공지사항</h2>
      <board-search-menu></board-search-menu>
      <BoardList v-bind:fields="fields" v-bind:board-list="BoardList"></BoardList>
      <b-pagination-nav
          align="center"
          v-model="currentPage"
          :number-of-pages="100"

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

export default {
  name: "AppNoticeList",
  components: {BoardSearchMenu, BoardList},

  data() {
    return {
      currentPage: 1,
      fields:[
        {
          key: 'id',
          label: '글번호',
        },
        {
          key: 'title',
          label: '제목',
        },
        {
          key: 'writer',
          label: '글쓴이',
        },{
          key: 'registertime',
          label: '작성시간'
        },

      ],
      BoardList: [
        {
          id: 1,
          title: "제목1",
          writer: "글쓴이1",
          registertime: "2023-05-19"
        },
        {
          id: 2,
          title: "제목2",
          writer: "글쓴이2",
          registertime: "2023-05-19"
        },
        {
          id: 3,
          title: "제목3",
          writer: "글쓴이3",
          registertime: "2023-05-19"
        }
      ],
      methods:{
        pageMove(){
          console.log(this.currentPage);
        }
      }

    }
  }


};
</script>

<style></style>
