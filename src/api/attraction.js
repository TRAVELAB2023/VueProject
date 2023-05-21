import { apiInstance } from "./http.js";

const attraction = apiInstance();

function getSido(success, fail) {
  attraction.get(`/sido`).then(success).catch(fail);
}
function getGugun(param, success, fail) {
  attraction.get(`/gugun/${param.sido}`).then(success).catch(fail);
}
function getAttractionList(param, success, fail) {
  attraction.get(`/attraction`, { params: param }).then(success).catch(fail);
}
function getAttraction(param, success, fail) {
  attraction.get(`/attraction/${param.contentId}`).then(success).catch(fail);
}
export { getSido, getGugun, getAttraction, getAttractionList };
