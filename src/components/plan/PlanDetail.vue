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
        <img class="img" ref="" v-else src="@/assets/noimg.png" />
      </slide>
    </carousel>
    <div class="d-flex justify-content-end">
      <b-button @click="copyPlan">복제하기</b-button>
      <b-button variant="danger" @click="removePlan">삭제하기</b-button>
      <b-button variant="success" @click="showBottom = !showBottom">공유하기</b-button>
      <b-alert
        v-model="showBottom"
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000"
        variant="warning"
        dismissible
      >
        <div class="d-flex justify-content-center">
          <b-form-input id="type-date" type="date" v-model="haltDate"></b-form-input>
          <b-button class="shareBtn" variant="success" @click="createShareLink"
            >공유링크 생성</b-button
          >
        </div>
        <div class="d-flex"><span>공유 링크 : </span> <span v-text="shareLink"></span></div>
      </b-alert>
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
import { sharePlan } from "@/api/share-plan";
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
      showBottom: false, // 공유하기 창 show 여부
      haltDate: "", // 공유 종료 날짜
      shareLink: "", // 공유 링크
      attraction: {},
      baseLink: "http://localhost:8080/plan/share/",
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
        this.$router.push({ name: "PlanList" });
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
    createShareLink() {
      const param = {
        planId: this.$route.params.planid,
        haltDate: this.haltDate,
      };
      sharePlan(
        param,
        ({ data }) => {
          alert("링크가 생성되었습니다.");
          this.shareLink = this.baseLink + data;
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
.shareBtn {
  width: 200px !important;
  flex: none;
}
</style>
