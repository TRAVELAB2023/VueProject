import { apiInstance } from "./http.js";
const lover = apiInstance();

function hasLover(param, success, fail) {
  lover.get(`/member-like/${param.attractionid}`).then(success).catch(fail);
}
function clickLover(param, success, fail) {
  lover.post(`/member-like`, JSON.stringify(param)).then(success).catch(fail);
}
export { hasLover, clickLover };
