<template>
  <div class="d-flex border" style="max-height: 300px; padding: 5% 0%; background-color: white">
    <div class="w-25 d-flex justify-content-center align-content-center">
      <img
        v-if="attraction.firstImage != ''"
        :src="attraction.firstImage"
        style="width: 100%; height: 100%"
        alt="관광지 사진"
      />
      <img v-else src="@/assets/noimg.png" style="width: 100%; height: 100%" alt="noImg" />
    </div>
    <div class="w-75">
      <h5><small class="text-muted">장소 : </small>{{ attraction.title }}</h5>
      <div class="text-center">
        <button class="btn btn-success" @click="selectLocation">위치 조회</button>
        <button class="btn btn-danger" @click="removeAttraction">삭제하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "PlanListSideBarItem",
  props: {
    attraction: Object,
  },
  methods: {
    ...mapMutations(["deleteAttraction"]),
    selectLocation() {
      console.log("select");
    },
    removeAttraction() {
      this.deleteAttraction(this.attraction);
    },
  },
};
</script>

<style scoped></style>
