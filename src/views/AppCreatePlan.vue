<template>
  <div>
    <div class="container">
      <div :class="{ pushed: isPush, pulled: !isPush, main: true }">
        <div class="d-flex justify-content-end">
          <b-button v-b-toggle.sidebar-right>여행지 등록 목록 열기</b-button>
        </div>
        <h2>여행지 검색</h2>

        <div class="select-area d-flex justify-content-around align-items-center">
          <b-form-select v-model="selectedSido" :options="sidoOptions">
            <template #first>
              <b-form-select-option :value="0" disabled>-- 지역 선택 --</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-select v-model="selectedGugun" :options="gugunOptions">
            <template #first>
              <b-form-select-option :value="0" disabled>-- 시군구 선택 --</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-select v-model="selectedContentType" :options="contentTypeOptions">
            <template #first>
              <b-form-select-option :value="0" disabled>-- 관광지 유형 --</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-input size="10" v-model="word" @keyup.enter="search"></b-form-input>
          <b-button class="searchBtn" variant="success" @click="search">검색</b-button>
        </div>

        <KakaoMap :attractions="attractionList"></KakaoMap>
      </div>
      <plan-list-side-bar @hidden="rollback" @shown="pushContent"></plan-list-side-bar>
    </div>
  </div>
</template>

<script>
import { getSido, getGugun, getAttractionList } from "@/api/attraction.js";
import PlanListSideBar from "@/components/plan/PlanListSideBar";
import KakaoMap from "@/components/TheKakaoMap";
export default {
  name: "AppCreatePlan",
  data() {
    return {
      word: "",
      selectedGugun: 0,
      selectedSido: 0,
      selectedContentType: 0,
      gugunOptions: [],
      sidoOptions: [],
      attractionList: [],
      contentTypeOptions: [
        { value: "0", text: "전체" },
        { value: "12", text: "관광지" },
        { value: "14", text: "문화시설" },
        { value: "15", text: "축제공연행사" },
        { value: "25", text: "여행코스" },
        { value: "28", text: "레포츠" },
        { value: "32", text: "숙박" },
        { value: "38", text: "쇼핑" },
        { value: "39", text: "음식점" },
      ],
      isPush: false,
    };
  },
  components: { KakaoMap, PlanListSideBar },
  methods: {
    rollback() {
      this.isPush = false;
    },
    pushContent() {
      this.isPush = true;
    },
    search() {
      this.attractionList = [];
      const params = {
        sidoCode: this.selectedSido,
        gugunCode: this.selectedGugun,
        contentTypeCode: this.selectedContentType,
        word: this.word,
      };
      getAttractionList(
        params,
        ({ data }) => {
          data.forEach((attraction) => {
            this.attractionList.push(attraction);
          });
        },
        (error) => {
          alert(error.response.data);
        }
      );
    },
    initGugun() {
      this.gugunOptions = [];
    },
  },
  watch: {
    selectedSido(newVal) {
      this.initGugun();
      if (newVal != 0) {
        getGugun(
          { sido: newVal },
          ({ data }) => {
            data.forEach((gugun) => {
              this.gugunOptions.push({ value: gugun.gugunCode, text: gugun.gugunName });
            });
          },
          (error) => {
            alert(error.response.data);
          }
        );
      }
    },
  },
  created() {
    getSido(
      ({ data }) => {
        data.forEach((sido) => {
          this.sidoOptions.push({ value: sido.sidoCode, text: sido.sidoName });
        });
      },
      (error) => {
        alert(error.response.data);
      }
    );
    this.initGugun();
  },
};
</script>

<style scoped>
.pulled {
  animation-name: pulled;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  /* animation: pulled 5s ease 0s 1 normal forwards; */
}

.pushed {
  animation-name: pushed;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  /* animation: pushed 5s ease 0s 1 normal forwards; */
}
@keyframes pulled {
  from {
    transform: translateX(-200px);
  }
  to {
    transform: translateX(0px);
  }
}
@keyframes pushed {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-200px);
  }
}
.select-area > * {
  margin-right: 20px;
  margin-bottom: 20px;
}
.searchBtn {
  width: 100px !important;
  flex: none;
}
</style>
