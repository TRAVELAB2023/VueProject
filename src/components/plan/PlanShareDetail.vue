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
        <img class="img" v-if="attraction.firstImage != ''" :src="attraction.firstImage" />
        <img class="img" v-else src="@/assets/noimg.png" />
      </slide>
    </carousel>
    <div class="d-flex justify-content-end">
      <b-button @click="copyPlan">복제하기</b-button>
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
import { getSharePlan } from "@/api/share-plan";
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "PlanShareDetail",
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
      key: this.$route.params.key,
    };
    getSharePlan(
      param,
      ({ data }) => {
        this.attractionList = data;
      },
      (error) => {
        alert(error.response.data);
        this.$router.push({ name: "/main" });
      }
    );
  },
  methods: {
    ...mapMutations(["initAttractionList"]),
    copyPlan() {
      this.initAttractionList(this.attractionList);
      this.$router.push({ name: "AppCreatePlan" });
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
          this.show = true;
        },
        (error) => {
          alert(error.response.data);
        }
      );
    },
    resetModalShow(state) {
      this.show = state;
    },
  },
};
</script>

<style scoped>
.img {
  width: 50%;
  height: 100%;
}
</style>
