<template>
  <div class="container align-items-start">
    <div class="main ">
      <div>

        <div style="width: 800px;">
          <h1>{{ title }}</h1>
          <div class="border">
            <b-row>
              <b-col>{{ writer }}</b-col>
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
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "AppNoticeDetail",
  data() {
    return {
      currentPage: 1,
      title: "글 제목입니다.  ",
      content: "<div>글입니다</div>" +
          "<img src='https://edu.ssafy.com/asset/images/logo.png'>",
      writer: "김싸피",
      registerTime: "2023-05-19",


    };
  }
}
</script>

<style scoped>

</style>