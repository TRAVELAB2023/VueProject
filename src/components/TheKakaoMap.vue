<template>
  <div id="app">
    <div id="map"></div>
    <plan-detail-attraction-modal :type="`add`" :pre-attraction="attraction" @resetModal="resetModalShow" :pre-show="show"></plan-detail-attraction-modal>
  </div>
</template>

<script>
import { getAttraction } from "@/api/attraction";
import PlanDetailAttractionModal from "./plan/item/PlanDetailAttractionModal";
export default {
  name: "KakaoMap",
  props: {
    attractions: Array,
  },
  components: { PlanDetailAttractionModal },
  data() {
    return {
      map: "",
      clusterer: "",
      show: false, // 모달 창 show 여부
      attraction: {},
      attractionList: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      const key = process.env.VUE_APP_KAKAO_MAP_KEY;
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services,clusterer,drawing&appkey=" + key;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      let container = document.getElementById("map");
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.5599855058, 126.9752992762), //지도의 중심좌표.
        level: 10, //지도의 레벨(확대, 축소 정도)
      };

      this.map = new kakao.maps.Map(container, options);

      this.clusterer = new kakao.maps.MarkerClusterer({
        map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 7, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
      });
    },
    locateMap() {
      if (this.attractionList.length == 0) {
        alert("입력 결과가 없습니다.");
        return;
      }
      this.initMap();
      this.moveMap(this.attractionList[0]);
      var markers = this.attractionList.map((data) => {
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data.latitude, data.longitude),
          clickable: true,
        });
        kakao.maps.event.addListener(marker, "click", () => {
          this.showModal(data.contentId);
        });

        return marker;
      });
      this.clusterer.addMarkers(markers);
      kakao.maps.event.addListener(this.clusterer, "clusterclick", (cluster) => {
        // 현재 지도 레벨에서 1레벨 확대한 레벨
        let level = this.map.getLevel() - 1;
        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        this.map.setLevel(level, { anchor: cluster.getCenter() });
      });
    },
    moveMap(data) {
      let moveLatLon = new kakao.maps.LatLng(data.latitude, data.longitude);
      let level = 10;
      this.map.setCenter(moveLatLon);

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      this.map.setLevel(level, { anchor: this.map.getCenter() });
      // 지도 중심을 이동 시킵니다
    },
    showModal(contentId) {
      const param = {
        contentId: contentId,
      };
      getAttraction(
        param,
        ({ data }) => {
          console.log(data);
          this.attraction = data;
        },
        (error) => {
          alert(error);
        }
      );
      this.show = true;
    },
    resetModalShow(state) {
      this.show = state;
    },
  },
  watch: {
    attractions(newList) {
      if (newList.length != 0) {
        this.attractionList = [];
        newList.forEach((item) => {
          this.attractionList.push(item);
        });
      }
    },
    attractionList() {
      this.locateMap();
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  min-height: 500px;
}
</style>
