import { apiInstance, checkToken } from "./http.js";
const email = apiInstance();

async function sendEmail(param, success, fail) {
  checkToken();
  email.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  email.get(`/email/recovery/${param.email}`).then(success).catch(fail);
}

export { sendEmail };
