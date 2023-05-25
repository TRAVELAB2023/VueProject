<template>
  <div class="container align-items-start">
    <div class="main">
      <h2>공지사항</h2>

      <div style="height: 20px"></div>
      <div variant="outline-primary" style="height: 450px;">

        <tiptap :event="postArticle" :list-link="linkList"/>
      </div>


    </div>

  </div>
</template>

<script>
import Tiptap from '@/components/MyTiptab'
import {postArticle} from "@/api/notice";
import BoardList from "@/components/board/BoardList.vue";

export default {
  computed: {
    BoardList() {
      return BoardList
    }
  },
  data() {
    return {

      linkList: "/notice/list",
      postArticle
    };
  },
  props: [postArticle],
  components: {
    Tiptap
  },

  methods: {}
};
</script>