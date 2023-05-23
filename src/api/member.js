import { apiInstance } from "./http.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  await api.get(`/auth/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/auth/refresh`, user).then(success).catch(fail);
}

async function logout(email, success, fail) {
  await api.post(`/member/logout/${email}`).then(success).catch(fail);
}

async function duplicateCheckEmail(email, success, fail) {
  await api.get(`auth/check-duplicate-email/${email}`).then(success).catch(fail);
}

async function duplicateCheckNickname(nickname, success, fail) {
  await api.get(`auth/check-duplicate-nickname/${nickname}`).then(success).catch(fail);
}
async function join(param, success, fail) {
  await api.post(`auth/register/`,JSON.stringify(param)).then(success).catch(fail);
}
export { login, findById, tokenRegeneration, logout, duplicateCheckEmail, duplicateCheckNickname, join};
