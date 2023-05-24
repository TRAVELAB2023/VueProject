import { apiInstance, checkToken } from "./http.js";
const plan = apiInstance();
async function postPlan(param, success, fail) {
  checkToken();
  plan.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  plan.post("/plan", JSON.stringify(param)).then(success).catch(fail);
}
async function getPlanList(param, success, fail) {
  checkToken();
  plan.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  plan.get("/plan", { params: param }).then(success).catch(fail);
}
async function getPlan(param, success, fail) {
  checkToken();
  plan.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  plan.get(`/plan/${param.planid}`).then(success).catch(fail);
}
async function deletePlan(param, success, fail) {
  checkToken();
  plan.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  plan.delete(`/plan/${param.planid}`).then(success).catch(fail);
}

export { postPlan, getPlanList, getPlan, deletePlan };
