<template>
  <b-table striped hover :items="boardList" :fields="fields"></b-table>
</template>

<script>
export default {
  name: "BoardList.vue",
  props: [
    "boardList",
    "fields"
  ]
}
</script>

<style scoped>

</style>