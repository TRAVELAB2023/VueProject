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
  methods: {
    onRowSelected(item) {
      this.$router.push({name:'AppBoardDetail', params: {boardId: item[0].boardId}});
    }
  }
}
</script>

<style scoped>

</style>