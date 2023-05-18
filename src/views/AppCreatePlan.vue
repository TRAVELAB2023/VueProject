<template>
  <div>
    <div class="container">
      <div class="main">
        <KakaoMap></KakaoMap>
        <plan-list-side-bar></plan-list-side-bar>
      </div>
    </div>
  </div>
</template>

<script>
import PlanListSideBar from "@/components/plan/item/PlanListSideBar";
import KakaoMap from "@/components/TheKakaoMap";
export default {
  name: "AppCreatePlan",
  components: { KakaoMap, PlanListSideBar },
};
</script>

<style></style>
