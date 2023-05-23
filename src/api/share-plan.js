import { apiInstance } from "./http.js";
const plan = apiInstance();

function sharePlan(param, success, fail) {
  plan.post("/share/plan", JSON.stringify(param)).then(success).catch(fail);
}
function getSharePlan(param, success, fail) {
  plan.get(`/share/plan/${param.key}`).then(success).catch(fail);
}
export { sharePlan, getSharePlan };
