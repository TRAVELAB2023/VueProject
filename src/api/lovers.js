import { apiInstance, checkToken } from "./http.js";
const lover = apiInstance();

async function hasLover(param, success, fail) {
  await checkToken();
  lover.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  lover.get(`/member-like/${param.attractionid}`).then(success).catch(fail);
}
async function clickLover(param, success, fail) {
  await checkToken();
  lover.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  lover.post(`/member-like`, JSON.stringify(param)).then(success).catch(fail);
}
export { hasLover, clickLover };
