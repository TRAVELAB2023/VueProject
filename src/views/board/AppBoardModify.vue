<template>
  <div class="container align-items-start">
    <div class="main">
      <h2>여행 후기</h2>

      <div style="height: 20px"></div>
      <div  variant="outline-primary" style="height: 450px;">
        <editor :id="boardId" :get="getBoard" :event="putArticle" :list-link="linkList" />
      </div>
    </div>

  </div>
</template>

<script>
import Editor from '@/components/ModifyEditor.vue'
import {getBoard, putArticle} from "@/api/board";
import BoardList from "@/components/board/BoardList.vue";

export default {
  computed: {
    BoardList() {
      return BoardList
    }
  },
  data() {
    return {
      article:{},
      boardId:'',
      linkList:"/board/list",
      putArticle,
      getBoard
    };
  },
   created() {
    this.boardId = this.$route.params.boardId;
  },
  components:{
    Editor
  },
};
</script>