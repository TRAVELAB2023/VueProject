import { apiInstance } from "./http.js";
const email = apiInstance();
email.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");

function sendEmail(param, success, fail) {
  email.get(`/email/recovery/${param.email}`).then(success).catch(fail);
}

export { sendEmail };
