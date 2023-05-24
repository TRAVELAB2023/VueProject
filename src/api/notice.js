import {apiInstance} from "@/api/http";

const api = apiInstance();




function getNoticeList(param,success,fail) {
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.get(`/notice/list`, {params: param}
    ).then(success).catch(fail);
}

function getNotice(noticeId,success,fail) {
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.get(`/notice/${noticeId}`
    ).then(success).catch(fail);
}
function postArticle(param,success,fail){
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.post(`/notice`,JSON.stringify(param))
        .then(success).catch(fail)
}

function deleteArticle(boardId,success,fail) {
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.delete(`/board/${boardId}`
    ).then(success).catch(fail);
}
function putArticle(param,success,fail){
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.put(`/notice`,JSON.stringify(param))
        .then(success).catch(fail)
}
export {getNotice,getNoticeList, postArticle, deleteArticle,putArticle}
