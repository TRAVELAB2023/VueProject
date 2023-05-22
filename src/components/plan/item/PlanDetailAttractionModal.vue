<template>
  <b-modal
    v-model="show"
    id="attraction-modal"
    @hidden="resetModal"
    centered
    title="관광지 세부 정보"
  >
    <div class="modal-body">
      <div class="card mb-3">
        <img
          id="travel-img"
          v-if="attraction.firstImage != ''"
          :src="attraction.firstImage"
          class="card-img-top"
          alt="관광지 사진"
        />
        <img id="travel-img" v-else src="@/assets/noimg.png" class="card-img-top" alt="noImg" />
        <div class="card-body">
          <h5 id="travel-title" class="card-title">여행지 장소 : {{ attraction.title }}</h5>
          <small class="text-muted">주소 : {{ attraction.addr1 }}</small>
          <p id="travel-addr" class="card-text"></p>
          <small class="text-muted">설명 : {{ attraction.overview }}</small>
          <p id="travel-overview" class="card-text"></p>
          <div class="text-end" v-if="curType == 'add'">
            <button class="btn btn-success" id="addTravel" @click="push">여행지 추가하기</button>
          </div>
        </div>
      </div>
    </div>
    <template #modal-footer="{ cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="md" variant="danger" @click="cancel()"> 닫기 </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "PlanDetailAttractionModal",
  props: {
    type: String,
    preShow: Boolean,
    preAttraction: Object,
  },
  data() {
    return {
      curType: "",
      show: false,
      attraction: {
        addr1: "", // 주소
        contentId: "", // ID
        firstImage: "", //이미지
        latitude: "", // 위도
        longitude: "", // 경도
        overview: "", // 상세 설명
        title: "", // 제목
      },
    };
  },
  methods: {
    ...mapMutations(["pushAttraction"]),
    resetModal() {
      this.$emit("resetModal", false);
    },
    push() {
      this.pushAttraction(this.attraction);
      this.show = false;
      this.resetModal();
    },
  },
  created() {
    this.curType = this.type;
  },
  watch: {
    preShow(newVal) {
      if (newVal) {
        this.show = newVal;
      }
    },
    preAttraction(newVal) {
      if (newVal.title != "" && newVal.title.trim() != "") {
        this.attraction.addr1 = newVal.addr1;
        this.attraction.contentId = newVal.contentId;
        this.attraction.firstImage = newVal.firstImage;
        this.attraction.latitude = newVal.latitude;
        this.attraction.longitude = newVal.longitude;
        this.attraction.overview = newVal.overview;
        this.attraction.title = newVal.title;
      }
    },
  },
};
</script>

<style></style>
