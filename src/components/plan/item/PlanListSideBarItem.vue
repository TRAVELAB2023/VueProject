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
    addDragging(event) {
      event.target.classList.add("dragging");
    },
    endDragging(event) {
      const prevDiv = this.getDragPrevElement(event.clientY);
      event.target.classList.remove("dragging");
      this.$emit("re-sort", event.target, prevDiv);
    },
    getDragPrevElement(y) {
      const arr = [...document.querySelectorAll(".draggable:not(.dragging)")];
      return arr.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect(); //해당 엘리먼트에 top값, height값 담겨져 있는 메소드를 호출해 box변수에 할당
          const offset = y - box.top - box.height / 2; //수직 좌표 - top값 - height값 / 2의 연산을 통해서 offset변수에 할당
          if (offset < 0 && offset > closest.offset) {
            // (예외 처리) 0 이하 와, 음의 무한대 사이에 조건
            return { offset: offset, element: child }; // Element를 리턴
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    },
  },
};
</script>

<style scoped></style>
