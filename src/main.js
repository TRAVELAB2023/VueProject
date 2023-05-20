import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";


Vue.config.productionTip = false;

import "@/api/lib/vueBootstrap.js";

new Vue({
  router,
  store,
  Vue2Editor,
  render: (h) => h(App),
}).$mount("#app");
