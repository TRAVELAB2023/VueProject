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
          <button id="createPlan" class="btn btn-success m-2" @click="submitPlan">등록</button>
          <button id="resetPlan" class="btn btn-danger m-2" @click="resetPlan">초기화</button>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { postPlan } from "@/api/plan";
import draggable from "vuedraggable";
import { mapState, mapMutations } from "vuex";
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
    ...mapMutations(["initAttractionList"]),
    change() {
      if (this.state) {
        this.$emit("shown");
      } else {
        this.$emit("hidden");
      }
    },
    resetPlan() {
      if (!confirm("초기화하시겠습니까?")) {
        return;
      }
      this.initAttractionList([]);
    },
    submitPlan() {
      if (!confirm("등록하시겠습니까? ")) {
        return;
      }
      let title = prompt("여행 제목을 입력해주세요");

      const param = {
        planName: title,
        contentIdList: this.myAttractionList.map((attraction) => attraction.contentId),
      };
      postPlan(
        param,
        () => {
          alert("성공적으로 등록되었습니다.");
          if (confirm("지금까지 짠 임시 계획을 삭제하시겠습니까?")) {
            this.$store.commit("initAttractionList", []);
          }
        },
        (error) => {
          alert(error.response.data);
        }
      );
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
