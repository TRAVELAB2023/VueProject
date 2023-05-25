<template>
  <div>
    <div class="container">
      <div :class="{ pushed: isPush, pulled: !isPush, main: true }">
        <div class="d-flex justify-content-end">
          <b-button variant="danger" @click="initMap">지도 초기화</b-button>
          <b-button v-b-toggle.sidebar-right>여행지 등록 목록 열기</b-button>
        </div>
        <h2>여행지 검색</h2>

        <div class="select-area d-flex justify-content-around align-items-center">
          <b-form-select v-model="selectedSido" :options="sidoOptions">
            <template #first>
              <b-form-select-option :value="0">-- 지역 전체 선택 --</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-select v-model="selectedGugun" :options="gugunOptions">
            <template #first>
              <b-form-select-option :value="0">-- 시군구 전체 선택 --</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-select v-model="selectedContentType" :options="contentTypeOptions">
            <template #first>
              <b-form-select-option :value="0">-- 관광지 전체 선택 --</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-input size="10" v-model="word" @keyup.enter="search"></b-form-input>
          <b-button class="searchBtn" variant="success" @click="search">검색</b-button>
          <b-form-checkbox
            id="checkbox-1"
            v-model="memberLike"
            value="true"
            unchecked-value="false"
            v-b-popover.hover.top="'누르시면 좋아요한 관광지만 표시됩니다.'"
            title="좋아요한 관광지만 표시"
          >
          </b-form-checkbox>
        </div>

        <KakaoMap></KakaoMap>
        <b-overlay :show="show" rounded="sm">
          <b-card title="AI 추천 관광지" :aria-hidden="show ? 'true' : null">
            <b-card-text>{{ AItext }}</b-card-text>
          </b-card>
        </b-overlay>
      </div>
      <plan-list-side-bar @hidden="rollback" @shown="pushContent"></plan-list-side-bar>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "@/api/chat";
import { mapActions, mapMutations } from "vuex";
import { getSido, getGugun } from "@/api/attraction.js";
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
      memberLike: false,
      gugunOptions: [],
      sidoOptions: [],
      contentTypeOptions: [
        { value: "12", text: "관광지" },
        { value: "14", text: "문화시설" },
        { value: "15", text: "축제공연행사" },
        { value: "25", text: "여행코스" },
        { value: "28", text: "레포츠" },
        { value: "32", text: "숙박" },
        { value: "38", text: "쇼핑" },
        { value: "39", text: "음식점" },
      ],
      isPush: false, // sidebar 열릴 시 이벤트 처리
      show: false, // gpt 응답 overlay 여부
      AItext: "", // gpt 응답값
    };
  },
  components: { KakaoMap, PlanListSideBar },
  methods: {
    ...mapActions(["getMapAttractionList"]),
    ...mapMutations(["initMapAttractionList"]),
    rollback() {
      this.isPush = false;
    },
    pushContent() {
      this.isPush = true;
    },
    initMap() {
      if (!confirm("지도를 초기화하겠습니까?")) {
        return;
      }
      this.initMapAttractionList([]);
    },
    search() {
      const params = {
        sidoCode: this.selectedSido,
        gugunCode: this.selectedGugun,
        contentTypeCode: this.selectedContentType,
        word: this.word,
        memberLike: this.memberLike,
      };
      this.getMapAttractionList(params);

      this.searchChatGPT();
    },
    initGugun() {
      this.gugunOptions = [];
    },
    async searchChatGPT() {
      this.show = true;
      let sido = this.sidoOptions.find((sido) => {
        return this.selectedSido == sido.value;
      });
      let gugun = this.gugunOptions.find((gugun) => {
        return this.selectedGugun == gugun.value;
      });
      let contentType = this.contentTypeOptions.find((contentType) => {
        return this.selectedContentType == contentType.value;
      });
      const param = {
        sidoName: sido === undefined ? "한국의" : sido.text,
        gugunName: gugun === undefined ? "전체" : gugun.text,
        contentTypeName: contentType === undefined ? "관광지" : contentType.text,
      };
      await sendMessage(
        param,
        ({ data }) => {
          this.AItext = data;
        },
        () => {
          alert("서버와 연결이 원활하지 않습니다. 다시 요청해주세요");
        }
      );
      this.show = false;
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
