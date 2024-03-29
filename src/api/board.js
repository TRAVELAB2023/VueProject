import { apiInstance, checkToken } from "@/api/http";
const api = apiInstance();

async function getBoardList(param, success, fail) {
  await checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.get(`/board/list`, { params: param }).then(success).catch(fail);
}

async function getBoard(boardId, success, fail) {
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.get(`/board/${boardId}`).then(success).catch(fail);
}
async function postComment(param, success, fail) {
  await checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.post(`/board/comment`, JSON.stringify(param)).then(success).catch(fail);
}
async function postImage(image, success, fail) {
  await checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api
    .post(
      "/upload",
      {
        file: image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(success)
    .catch(fail);
}
async function postArticle(param, success, fail) {
  await checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.post(`/board`, JSON.stringify(param)).then(success).catch(fail);
}

async function deleteArticle(boardId, success, fail) {
  await checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.delete(`/board/${boardId}`).then(success).catch(fail);
}
async function putArticle(param, success, fail) {
  await checkToken();
  api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
  api.put(`/board`, JSON.stringify(param)).then(success).catch(fail);
}
export { getBoardList, getBoard, postComment, postImage, postArticle, deleteArticle, putArticle };
