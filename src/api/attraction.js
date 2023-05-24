import { apiInstance } from "./http.js";

const attraction = apiInstance();
function getSido(success, fail) {
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/sido`).then(success).catch(fail);
}
function getGugun(param, success, fail) {
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/gugun/${param.sido}`).then(success).catch(fail);
}
function getAttractionList(param, success, fail) {
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/attraction`, { params: param }).then(success).catch(fail);
}
function getAttraction(param, success, fail) {
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/attraction/${param.contentId}`).then(success).catch(fail);
}
export { getSido, getGugun, getAttraction, getAttractionList };
