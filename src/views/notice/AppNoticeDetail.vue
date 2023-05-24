<template>
  <div class="container align-items-start">
    <div class="main ">
      <div>

        <div style="width: 800px;">
          <h1>{{ article.title }}</h1>
          <div class="border">
            <b-row>
              <b-col>작성일시: {{ article.registerTime }}</b-col>
            </b-row>
          </div>

        </div>

        <div style="width: 800px" class="border p-5" v-html="article.content"></div>
        <div style="width: 800px" class="border p-4">
          <b-row>
            <b-col></b-col>
            <b-col></b-col>
            <b-row>
              <b-col>
                <b-button @click="moveList">목록</b-button>
              </b-col>
              <b-col>
                <b-button @click="modify">수정</b-button>
              </b-col>
              <b-col>
                <b-button @click="deleteArt">삭제</b-button>
              </b-col>
            </b-row>
          </b-row>
        </div>
        <br>

      </div>

    </div>
  </div>
</template>

<script>
import {deleteArticle, getNotice} from "@/api/notice";
import store from "@/store";


export default {
  name: "AppNoticeDetail",

  created() {
    console.log(this.$store.getters["memberStore/checkUserInfo"]);

    if (this.$route.params.boardId) {
      this.$store.commit('changeNoticeId', this.$route.params.boardId)
    }
    this.boardId = this.$store.getters.getNoticeId

    getNotice(this.boardId, ({data}) => {
          this.article = data;
        },
        (error) => {
          console.log(error);
        });
  },
  data() {
    return {
      linkList: "/notice/list",
      memberId: this.$store.getters["memberStore/checkUserInfo"].memberId,
      boardId: 0,
      article: {},
    };
  },
  methods: {
    async deleteArt(){
      await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
      deleteArticle(this.boardId,
          ()=>{
            this.$router.push(this.linkList)
          }

          ,()=>{
            alert('글 삭제 실패')
          }
      )
    },
    modify() {
      this.$router.push({name: "AppNoticeModify", params: {boardId: this.boardId}})
    },
    moveList() {
      this.$router.push(this.linkList);
    },

  }


}
</script>

<style scoped>

</style>