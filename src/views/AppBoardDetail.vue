<template>
  <div class="container align-items-start">
    <div class="main ">
      <div>

        <div style="width: 800px;">
          <h1>{{ title }}</h1>
          <div class="border">
            <b-row>
              <b-col>{{ writer }}</b-col>
              <b-col>조회수: {{ hit }}</b-col>
              <b-col>작성일시: {{ registerTime }}</b-col>
            </b-row>
          </div>

        </div>

        <div style="width: 800px" class="border p-5" v-html="content"></div>
        <div style="width: 800px" class="border p-4">
          <b-row>
            <b-col></b-col>
            <b-col></b-col>
            <b-row>
              <b-col>
                <b-button>목록</b-button>
              </b-col>
              <b-col>
                <b-button>수정</b-button>
              </b-col>
              <b-col>
                <b-button>삭제</b-button>
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
              <b-col ><input style="width: 550px;" ></b-col>
              <b-col >
                <b-button style="width: 70px;">작성</b-button>
              </b-col>
            </b-row>
          </div>
          <br>


          <div></div>

          <div v-for="reply in replies" :key="reply.commentId">
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

    </div>
  </div>
</template>

<script>
export default {
  name: "AppBoardDetail",
  data() {
    return {
      currentPage: 1,
      title: "글 제목입니다.  ",
      content: "<div>글입니다</div>" +
          "<img src='https://edu.ssafy.com/asset/images/logo.png'>",
      writer: "김싸피",
      hit: 1,
      registerTime: "2023-05-19",

      replies: [
        {
          commentId: 1,
          memberNickname: "김싸피",
          content: "노잼이에요",
          replyDepth: false,
          registerTime: "2023-05-19 02:41"
        },
        {
          commentId: 2,
          memberNickname: "박싸피",
          content: "너도",
          replyDepth: true,
          registerTime: "2023-05-19 02:45"
        },
      ],
    };
  }
}
</script>

<style scoped>

</style>