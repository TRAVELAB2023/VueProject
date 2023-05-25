<template>
  <div class="container align-items-start">
    <div class="main ">
      <div>

        <div style="width: 800px;">
          <h1>{{ article.title }}</h1>
          <div class="border">
            <b-row>
              <b-col>{{ article.writerNickname }}</b-col>
              <b-col>조회수: {{ article.hit }}</b-col>
              <b-col>작성일시: {{ article.registerTime }}</b-col>
            </b-row>
          </div>

        </div>

        <div style="width: 800px" class="quillEditor border p-5" v-html="article.content"></div>
        <div style="width: 800px" class="border p-4">
          <b-row>
            <b-col></b-col>
            <b-col></b-col>
            <b-row>
              <b-col>
                <b-button @click="moveList">목록</b-button>
              </b-col>

              <b-col v-if="isMyPost">
                <b-button @click="modify">수정</b-button>
              </b-col>
              <b-col v-if="isMyPost">
                <b-button @click="deleteArt">삭제</b-button>
              </b-col>
            </b-row>
          </b-row>
        </div>
        <br>
        <div style="width: 800px;" class="border p-4">
          <h2>댓글</h2>
          <div class="d-flex">
            <b-row class="align-items-center">
              <b-col></b-col>
              <b-col></b-col>
              <b-col><input style="width: 550px;" v-model="comment"></b-col>
              <b-col>
                <b-button @click="commentSubmit" style="width: 70px;">작성</b-button>
              </b-col>
            </b-row>
          </div>
          <br>


          <div></div>

          <div v-for="reply in article.commentBoardList" :key="reply.commentId" @click="replyreply(reply)">
            <div v-if="reply.replyDepth==false">
              <b-row class="border">
                <b-col>{{ reply.memberNickname }}</b-col>
                <b-col>{{ reply.content }}</b-col>
                <b-col>{{ reply.registerTime }}</b-col>
              </b-row>
            </div>
            <div v-else-if="reply.replyDepth==true">
              <b-row style="background-color: whitesmoke;  " class="border">
                <b-col>
                  <b-row>
                    <b-col></b-col>
                    <b-col>{{ reply.memberNickname }}</b-col>
                  </b-row>

                </b-col>
                <b-col>{{ reply.content }}</b-col>
                <b-col>{{ reply.registerTime }}</b-col>
              </b-row>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {deleteArticle, getBoard, postComment} from "@/api/board";


export default {
  name: "AppBoardDetail",

  created() {

    if (this.$route.params.boardId) {
      this.$store.commit('changeBoardId', this.$route.params.boardId)
    }
    this.boardId = this.$store.getters.getBoardId

    getBoard(this.boardId, ({data}) => {
          this.article = data;
          if (data.writerId == this.memberId) {
            this.isMyPost=true
          }
        },
        (error) => {
          console.log(error);
        });
  },
  data() {
    return {
      linkList: "/board/list",
      memberId: this.$store.getters["memberStore/checkUserInfo"].memberId,
      boardId: 0,
      article: {},
      comment: "",
      isMyPost: false,
    };
  },
  methods: {
    async deleteArt() {
      await deleteArticle(this.boardId,
          () => {
            this.$router.push(this.linkList)
          }
          , (error) => {
            if (error.response.status == 401) {
              alert('권한이 존재하지 않습니다.')
            }else{
              alert('글 삭제에 실패했습니다.')
            }
          }
      )
    },
    modify() {
      this.$router.push({name: "AppBoardModify", params: {boardId: this.boardId}})
    },
    moveList() {
      this.$router.push(this.linkList);
    },
    replyreply(item) {
      console.log(item)
    },
    async commentSubmit() {
      let param = {
        content: this.comment,
        memberId: this.memberId,
        boardId: this.boardId

      }
      await postComment(param, ({data}) => {
        this.$router.go(0);
        console.log(data)

      }, (error) => {
        console.log(error)

      })
    }

  }


}
</script>

<style >
.quillEditor img{
  width: 600px !important;
}
</style>