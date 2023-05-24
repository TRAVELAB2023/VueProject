import { apiInstance, checkToken } from "./http.js";

const plan = apiInstance();

async function sharePlan(param, success, fail) {
  checkToken();
  plan.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  plan.post("/share/plan", JSON.stringify(param)).then(success).catch(fail);
}
async function getSharePlan(param, success, fail) {
  plan.get(`/share/plan/${param.key}`).then(success).catch(fail);
}
export { sharePlan, getSharePlan };
