<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex justify-content-center">
      <b-form-select v-model="searchType" class="form-select" >
        <option value=0 >전체</option>
        <option value=1 >제목</option>
        <option value=2 >내용</option>
        <option value=3 >제목&내용</option>
        <option value=4 >글쓴이</option>
      </b-form-select>


      <input v-if="searchType!=0" type="text" id="search-keyword" v-model="searchString"/>
      <button @click="search" id="searchBtn" class="btn-warning" style="color: white; width: 200px">검색</button>
      <button v-if="flag" @click="movePage" id="createBtn" class="btn-info" style="width: 200px">글쓰기</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "BoardSearchMenu",
  props:[
      "link","flaglink"
  ],
  data(){
    return{
      searchString:'',
      searchType:0,
      flag: false,

    }
  },
  created() {

    console.log(this.$store.getters[this.flaglink])
    this.flag= this.$store.getters[this.flaglink];
  },
  methods:{
    movePage(){
      this.$router.push(this.link);
    },
    search() {
      let param={
        searchString:this.searchString,
        searchType:this.searchType,
        start:0,
        size:10
      }
      this.$emit('search',param);
    }
  }
}
</script>

<style scoped>

</style>