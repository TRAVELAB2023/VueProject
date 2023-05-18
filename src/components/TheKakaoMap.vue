<template>
  <div id="app">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      const key = process.env.VUE_APP_KAKAO_MAP_KEY;
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + key;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      new kakao.maps.Map(container, options);
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
