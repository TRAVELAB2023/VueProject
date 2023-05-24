import { apiInstance, checkToken } from "@/api/http";

const api = apiInstance();

async function getNoticeList(param, success, fail) {
  checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.get(`/notice/list`, { params: param }).then(success).catch(fail);
}

async function getNotice(noticeId, success, fail) {
  checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.get(`/notice/${noticeId}`).then(success).catch(fail);
}
async function postArticle(param, success, fail) {
  checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.post(`/notice`, JSON.stringify(param)).then(success).catch(fail);
}

async function deleteArticle(boardId, success, fail) {
  checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.delete(`/board/${boardId}`).then(success).catch(fail);
}
async function putArticle(param, success, fail) {
  checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.put(`/notice`, JSON.stringify(param)).then(success).catch(fail);
}
export { getNotice, getNoticeList, postArticle, deleteArticle, putArticle };
