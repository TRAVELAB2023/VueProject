import { apiInstance, checkToken } from "./http.js";
const attraction = apiInstance();

async function getSido(success, fail) {
  checkToken();
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/sido`).then(success).catch(fail);
}
async function getGugun(param, success, fail) {
  checkToken();
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/gugun/${param.sido}`).then(success).catch(fail);
}
async function getAttractionList(param, success, fail) {
  checkToken();
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/attraction`, { params: param }).then(success).catch(fail);
}
async function getAttraction(param, success, fail) {
  checkToken();
  attraction.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  attraction.get(`/attraction/${param.contentId}`).then(success).catch(fail);
}
export { getSido, getGugun, getAttraction, getAttractionList };
