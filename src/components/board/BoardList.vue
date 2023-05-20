<template>
  <b-table selectable striped hover :items="boardList" :fields="fields"  @row-selected="onRowSelected"></b-table>
</template>

<script>
export default {
  name: "BoardList.vue",
  props: [
    "boardList",
    "fields",

  ],
  methods:{
    onRowSelected(item){
      console.log(item);
      // this.$router.push("")
    }
  }
}
</script>

<style scoped>

</style>