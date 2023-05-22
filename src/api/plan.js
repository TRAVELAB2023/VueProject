import { apiInstance } from "./http.js";
const plan = apiInstance();

function postPlan(param, success, fail) {
  plan.post("/plan", JSON.stringify(param)).then(success).catch(fail);
}

export { postPlan };
