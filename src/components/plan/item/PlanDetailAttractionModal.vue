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
            <b-button variant="primary" id="addTravel" @click="push">여행지 추가하기</b-button>
          </div>
          <div v-if="isLogin">
            <img class="lovers" v-if="isLover" @click="clickLover" src="@/assets/lovers-fill.png" />
            <img class="lovers" v-else src="@/assets/lovers-empty.png" @click="clickLover" />
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
import { hasLover, clickLover } from "@/api/lovers";
import { mapMutations,mapState } from "vuex";
import store from "@/store";
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
      isLover: false,
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
  computed:{
    ...mapState("memberStore",["isLogin"])
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
    async clickLover() {
      if (!this.isLogin) {
        return
      }
      await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
      const param = {
        attractionId: this.attraction.contentId,
      };
      clickLover(
        param,
        ({ data }) => {
          if (data == "1") {
            this.isLover = true;
          } else {
            this.isLover = false;
          }
        },
        () => {
          alert("서버와 연결이 원활하지 않습니다.,");
        }
      );
    },
   async checkLover() {
     if (!this.isLogin) {
       return
     }
      await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
      const param = {
        attractionid: this.attraction.contentId,
      };
      hasLover(
        param,
        ({ data }) => {
          if (data == true) {
            this.isLover = true;
          } else {
            this.isLover = false;
          }
        },
        (e) => {
          console.log(e)
          // alert("서버와 연결이 원활하지 않습니다.,");
        }
      );
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
        this.checkLover();
      }
    },
  },
};
</script>

<style scoped>
.lovers {
  width: 20px;
  height: 20px;
}
</style>
