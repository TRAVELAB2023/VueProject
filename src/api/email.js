import { apiInstance } from "./http.js";
const email = apiInstance();

async function sendEmail(param, success, fail) {
  email.post(`/email/recovery`, JSON.stringify(param)).then(success).catch(fail);
}

async function checkEmail(param, success, fail) {
  email.get(`/email/check/${param.key}`).then(success).catch(fail);
}

export { sendEmail, checkEmail };
