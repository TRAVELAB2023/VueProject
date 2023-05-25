<template>
  <div id="app">
    <div id="map"></div>
    <plan-detail-attraction-modal
      :type="`add`"
      :pre-attraction="attraction"
      @resetModal="resetModalShow"
      :pre-show="show"
    ></plan-detail-attraction-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getAttraction } from "@/api/attraction";
import PlanDetailAttractionModal from "./plan/item/PlanDetailAttractionModal";
export default {
  name: "KakaoMap",
  props: {
    isCalculate: Boolean,
  },
  components: { PlanDetailAttractionModal },
  data() {
    return {
      map: null,
      markers: [],
      clusterer: null,
      show: false, // 모달 창 show 여부
      attraction: {},
      polyLine: null,
      distanceOverlay: null,
    };
  },
  computed: {
    ...mapState(["mapAttractionsList", "myAttractionList"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      const key = process.env.VUE_APP_KAKAO_MAP_KEY;
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services,clusterer,drawing&appkey=" +
        key;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap(deep = 10) {
      if (this.map == null) {
        let container = document.getElementById("map");
        let options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(37.5599855058, 126.9752992762), //지도의 중심좌표.
          level: deep, //지도의 레벨(확대, 축소 정도)
        };

        this.map = new kakao.maps.Map(container, options);
      } else {
        this.moveMap({
          latitude: 37.5599855058,
          longitude: 126.9752992762,
        });
        this.map.setLevel(deep);
      }

      this.removeMarkers();

      if (this.clusterer == null) {
        this.clusterer = new kakao.maps.MarkerClusterer({
          map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 7, // 클러스터 할 최소 지도 레벨
          disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        });
      } else {
        this.clusterer.clear();
      }
    },
    locateMap() {
      this.deleteDisplayOverlay();
      this.deletePolyLine();
      this.initMap();
      if (this.mapAttractionsList.length == 0) {
        return;
      }
      this.moveMap(this.mapAttractionsList[0]);
      this.markers = this.mapAttractionsList.map((data) => {
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data.latitude, data.longitude),
          clickable: true,
        });
        kakao.maps.event.addListener(marker, "click", () => {
          this.showModal(data.contentId);
        });

        return marker;
      });
      this.clusterer.addMarkers(this.markers);
      kakao.maps.event.addListener(this.clusterer, "clusterclick", (cluster) => {
        // 현재 지도 레벨에서 1레벨 확대한 레벨
        let level = this.map.getLevel() - 1;
        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        this.map.setLevel(level, { anchor: cluster.getCenter() });
      });
    },
    moveMap(data, level = 10) {
      let moveLatLon = new kakao.maps.LatLng(data.latitude, data.longitude);
      // let level = 10;
      this.map.setCenter(moveLatLon);

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      this.map.setLevel(level, { anchor: this.map.getCenter() });
      // 지도 중심을 이동 시킵니다
    },
    removeMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
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
    deleteDisplayOverlay() {
      if (this.distanceOverlay != null) {
        this.distanceOverlay.setMap(null);
        this.distanceOverlay = null;
      }
    },
    deletePolyLine() {
      if (this.polyLine != null) {
        this.polyLine.setMap(null);
        this.polyLine = null;
      }
    },
    calculate() {
      if (this.myAttractionList.length == 0) {
        alert("먼저 여행지를 추가해주세요");
        return;
      }
      this.deleteDisplayOverlay();
      this.deletePolyLine();
      this.initMap(5);
      // 초기화

      let linePath = this.myAttractionList.map((data) => {
        return new kakao.maps.LatLng(data.latitude, data.longitude);
      });
      this.moveMap(this.myAttractionList[0], 5);
      this.polyLine = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#FFAE00", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });
      this.polyLine.setMap(this.map);
      let distance = Math.round(this.polyLine.getLength()); // 선의 총 거리를 계산합니다
      let content = this.getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다
      this.showDistance(content, linePath[0]);
    },
    showDistance(content, position) {
      if (this.distanceOverlay) {
        // 커스텀오버레이가 생성된 상태이면

        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        this.distanceOverlay.setPosition(position);
        this.distanceOverlay.setContent(content);
      } else {
        // 커스텀 오버레이가 생성되지 않은 상태이면

        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        this.distanceOverlay = new kakao.maps.CustomOverlay({
          map: this.map, // 커스텀오버레이를 표시할 지도입니다
          content: content, // 커스텀오버레이에 표시할 내용입니다
          position: position, // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 100,
        });
      }
    },
    getTimeHTML(distance) {
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      let walkkTime = (distance / 67) | 0;
      let walkHour = "",
        walkMin = "";

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
      }
      walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

      // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
      let bycicleTime = (distance / 227) | 0;
      let bycicleHour = "",
        bycicleMin = "";

      // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
      if (bycicleTime > 60) {
        bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + "</span>시간 ";
      }
      bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

      // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      let content = '<ul class="dotOverlay distanceInfo">';
      content += "    <li>";
      content +=
        '        <span class="label">총거리</span><span class="number">' + distance + "</span>m";
      content += "    </li>";
      content += "    <li>";
      content += '        <span class="label">도보</span>' + walkHour + walkMin;
      content += "    </li>";
      content += "    <li>";
      content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
      content += "    </li>";
      content += "</ul>";

      return content;
    },
  },
  watch: {
    mapAttractionsList() {
      this.locateMap();
    },
    isCalculate(newVal) {
      if (newVal) {
        this.calculate();
        this.$emit("endCalculate");
      }
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  min-height: 500px;
}
.dot {
  overflow: hidden;
  float: left;
  width: 12px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png");
}
.dotOverlay {
  position: relative;
  bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  font-size: 12px;
  padding: 5px;
  background: #fff;
}
.dotOverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.number {
  font-weight: bold;
  color: #ee6152;
}
.dotOverlay:after {
  content: "";
  position: absolute;
  margin-left: -6px;
  left: 50%;
  bottom: -8px;
  width: 11px;
  height: 8px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png");
}
.distanceInfo {
  position: relative;
  top: 5px;
  left: 5px;
  list-style: none;
  margin: 0;
}
.distanceInfo .label {
  display: inline-block;
  width: 50px;
}
.distanceInfo:after {
  content: none;
}
</style>
