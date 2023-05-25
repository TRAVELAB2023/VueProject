import { apiInstance, checkToken } from "./http.js";
const chatBot = apiInstance();

async function sendMessage(param, success, fail) {
  await checkToken();
  chatBot.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  await chatBot.get(`/chat`, { params: param }).then(success).catch(fail);
}

export { sendMessage };
