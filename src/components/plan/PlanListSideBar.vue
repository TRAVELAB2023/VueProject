<template>
  <div>
    <b-sidebar id="sidebar-right" title="여행 계획 등록" v-model="state" right shadow>
      <div
        class="m-2 border"
        style="height: 90%; border: 1px solid lightgray; background-color: white"
      >
        <div class="d-flex align-content-center justify-content-center w-100 p-2 travel-list-whole">
          <div class="travel-list-header">여행지 선택 목록</div>
        </div>
        <div id="travel-list">
          <draggable :list="myAttractionList">
            <transition-group>
              <plan-list-side-bar-item
                v-for="(attraction, index) in myAttractionList"
                :key="index"
                :attraction="attraction"
              ></plan-list-side-bar-item>
            </transition-group>
          </draggable>
        </div>

        <div class="p-2 d-flex justify-content-end" style="background-color: white; height: 10%">
          <button id="createPlan" class="btn btn-success m-2">등록</button>
          <button id="resetPlan" class="btn btn-danger m-2">초기화</button>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";
import PlanListSideBarItem from "@/components/plan/item/PlanListSideBarItem";
export default {
  name: "PlanListSideBar",
  data() {
    return {
      state: "",
    };
  },
  components: {
    draggable,
    PlanListSideBarItem,
  },
  computed: {
    ...mapState(["myAttractionList"]),
  },
  methods: {
    resort(moveTarget, target) {
      document.getElementById("travel-list").insertBefore(moveTarget, target);
    },
    change() {
      if (this.state) {
        this.$emit("shown");
      } else {
        this.$emit("hidden");
      }
    },
  },
  created() {
    this.change();
  },
  updated() {
    this.change();
  },
};
</script>

<style scoped>
.travel-list-whole {
  border: 1px solid lightgray;
}
.travel-list-header {
  text-align: center;
  font-weight: 500;
  line-height: 30px;
}
#travel-list {
  overflow: auto;
  height: 90%;
}
</style>
