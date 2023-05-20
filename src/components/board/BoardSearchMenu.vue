<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex justify-content-center">
      <b-form-select id="areaCode" class="form-select" value="0">
        <option value="0" selected>전체</option>
        <option value="1" selected>제목</option>
        <option value="2" selected>내용</option>
        <option value="3" selected>제목&내용</option>
        <option value="4" selected>글쓴이</option>
      </b-form-select>

      <input type="text" id="search-keyword" />
      <button id="searchBtn" class="btn-primary" style="width: 200px">검색</button>
      <button @click="movePage" id="createBtn" class="btn-dark" style="width: 200px">글쓰기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardSearchMenu",
  props:[
      "link"
  ],
  methods:{
    movePage(){
      console.log(this.link);
      this.$router.push(this.link);
    }
  }
}
</script>

<style scoped>

</style>