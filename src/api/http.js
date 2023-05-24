import axios from "axios";
import store from "../store";
function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,

    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
async function checkToken() {
  await store.dispatch("memberStore/getUserInfo", sessionStorage.getItem("auth-token"));
}
export { apiInstance, checkToken };
