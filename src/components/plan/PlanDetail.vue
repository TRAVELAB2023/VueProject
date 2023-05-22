<template>
  <div>
    <h2>계획 상세 조회</h2>
    <carousel :per-page="1">
      <slide
        v-for="(attraction, index) in attractionList"
        :key="index"
        :data-index="attraction.contentId"
        @slideclick="handleSlideClick"
      >
        <img v-if="attraction.firstImage != ''" :src="attraction.firstImage" />
        <img v-else src="@/assets/noimg.png" />
      </slide>
    </carousel>
    <div class="d-flex justify-content-end">
      <b-button @click="copyPlan">복제하기</b-button>
      <b-button variant="danger" @click="removePlan">삭제하기</b-button>
      <b-button variant="success">공유하기</b-button>
    </div>
    <plan-detail-attraction-modal
      :type="`read`"
      :pre-attraction="attraction"
      @resetModal="resetModalShow"
      :pre-show="show"
    ></plan-detail-attraction-modal>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getAttraction } from "@/api/attraction";
import PlanDetailAttractionModal from "@/components/plan/item/PlanDetailAttractionModal";
import { getPlan, deletePlan } from "@/api/plan";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "PlanDetail",
  components: {
    Carousel,
    Slide,
    PlanDetailAttractionModal,
  },
  data() {
    return {
      attractionList: [],
      show: false, // 모달 창 show 여부
      attraction: {},
    };
  },
  created() {
    const param = {
      planid: this.$route.params.planid,
    };
    getPlan(
      param,
      ({ data }) => {
        this.attractionList = data;
      },
      (error) => {
        alert(error.response.data);
      }
    );
  },
  methods: {
    ...mapMutations(["initAttractionList"]),
    copyPlan() {
      this.initAttractionList(this.attractionList);
      this.$router.push({ name: "AppCreatePlan" });
    },
    removePlan() {
      const param = {
        planid: this.$route.params.planid,
      };
      deletePlan(
        param,
        () => {
          alert("성공적으로 삭제했습니다.");
          this.$router.push({ name: "PlanList" });
        },
        (error) => {
          alert(error.response.data);
        }
      );
    },
    handleSlideClick(dataset) {
      this.showModal(dataset.index);
    },
    showModal(contentId) {
      const param = {
        contentId: contentId,
      };
      getAttraction(
        param,
        ({ data }) => {
          this.attraction = data;
        },
        (error) => {
          alert(error.response.data);
        }
      );
      this.show = true;
    },
    resetModalShow(state) {
      this.show = state;
    },
  },
};
</script>

<style></style>
