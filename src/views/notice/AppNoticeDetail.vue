<template>
  <div data-sal="slide-up" data-sal-delay="500" data-sal-easing="ease-out-back" class="container align-items-start">
    <div class="main ">
      <div>
        <div style="height: 10px;"></div>
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
                <b-button variant="primary" @click="moveList">목록</b-button>
              </b-col>


              <b-col v-if="flag">
                <b-button variant="warning" @click="modify">수정</b-button>
              </b-col>
              <b-col v-if="flag">
                <b-button variant="danger" @click="deleteArt">삭제</b-button>
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
import sal from 'sal.js';

export default {
  name: "AppNoticeDetail",
  destroyed() {
    store.commit("changeNoticeWrite", false);
  },
  created() {
  this.init();
  },

  data() {
    return {
      linkList: "/notice/list",
      memberId: this.$store.getters["memberStore/checkUserInfo"].memberId,
      boardId: 0,
      article: {},
      flag: false,
    };
  },
  methods: {
    async init(){
      this.flag = this.$store.getters['getNoticeWrite'];
      if (this.$route.params.boardId) {
        this.$store.commit('changeNoticeId', this.$route.params.boardId)
      }
      this.boardId = this.$store.getters.getNoticeId

      await getNotice(this.boardId, ({data}) => {
            this.article = data;
          },
          (error) => {
            console.log(error);
          });
      sal()
    },
    async deleteArt() {
      await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
      deleteArticle(this.boardId,
          () => {
            this.$router.push(this.linkList)
          }

          , () => {
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