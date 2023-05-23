import { apiInstance } from "./http.js";
const plan = apiInstance();
plan.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
function postPlan(param, success, fail) {
  plan.post("/plan", JSON.stringify(param)).then(success).catch(fail);
}
function getPlanList(param, success, fail) {
  plan.get("/plan", { params: param }).then(success).catch(fail);
}
function getPlan(param, success, fail) {
  plan.get(`/plan/${param.planid}`).then(success).catch(fail);
}
function deletePlan(param, success, fail) {
  plan.delete(`/plan/${param.planid}`).then(success).catch(fail);
}

export { postPlan, getPlanList, getPlan, deletePlan };
