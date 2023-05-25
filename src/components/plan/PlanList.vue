<template>

  <div data-sal="zoom-in" data-sal-delay="500" data-sal-easing="ease-out-back" class="container align-items-start">
    <div class="main">
      <div style="height: 10px;"></div>
      <h2>여행 계획 리스트</h2>
      <b-table
          selectable
          striped
          hover
          :items="planList"
          :fields="fields"
          @row-selected="onRowSelected"
      ></b-table>

      <b-pagination-nav
          align="center"
          v-model="currentPage"
          base-url="#"
          :number-of-pages="pageSize"
          @input="pageMove"
      ></b-pagination-nav>
    </div>

  </div>
</template>

<script>
import { getPlanList } from "@/api/plan";
import sal from 'sal.js'
export default {
  name: "PlanList",
  data() {
    return {
      size: 10,
      start: 0,
      currentPage: 0,
      pageSize: 1,
      sort: "planId,desc",
      fields: [
        {
          key: "planId",
          label: "플랜번호",
        },
        {
          key: "title",
          label: "제목",
        },
        {
          key: "register_time",
          label: "작성시간",
        },
      ],
      planList: [],
    };
  },
  methods: {
    onRowSelected(item) {
      this.$router.push({ name: "PlanDetail", params: { planid: item[0].planId } });
    },
    pageMove() {
      this.initPage();
    },
    initPage() {
      let param = {
        size: this.size,
        page: this.currentPage - 1,
        sort: this.sort,
      };
      getPlanList(
        param,
        ({ data }) => {
          this.pageSize = data.totalPage;
          this.planList = data.resultList;
          if (this.pageSize == 0) {
            this.pageSize = 1;
          }
        },
        (error) => {
          alert(error.response.data);
        }
      );
      sal();
    },
  },
  created() {
    this.initPage();
  },
};
</script>

<style></style>
