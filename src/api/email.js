import { apiInstance } from "./http.js";
const email = apiInstance();

function sendEmail(param, success, fail) {
  email.get(`/email/recovery/${param.email}`).then(success).catch(fail);
}

export { sendEmail };
