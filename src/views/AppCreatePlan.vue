<template>
  <div>
    <div class="container">
      <div class="main">
        <h2>여행지 검색</h2>
        <div class="d-flex justify-content-center">
          <div class="d-flex justify-content-center">
            <b-form-select id="areaCode" class="form-select">
              <option value="0" selected>검색할 지역 선택</option>
            </b-form-select>
            <b-form-select>
              <option value="0" selected>검색할 시군구 선택</option>
            </b-form-select>
            <select id="contentId" class="form-select">
              <option value="0" selected>관광지 유형</option>
              <option value="12">관광지</option>
              <option value="14">문화시설</option>
              <option value="15">축제공연행사</option>
              <option value="25">여행코스</option>
              <option value="28">레포츠</option>
              <option value="32">숙박</option>
              <option value="38">쇼핑</option>
              <option value="39">음식점</option>
            </select>
            <input type="text" id="search-keyword" />
            <button id="searchBtn" class="btn-primary" style="width: 200px">검색</button>
          </div>
        </div>

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

<style scoped>
select {
  margin-right: 10px;
}
</style>
