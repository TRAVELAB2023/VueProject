import {apiInstance} from "@/api/http";

const api = apiInstance();




function getBoardList(param,success,fail) {
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.get(`/board/list`, {params: param}
    ).then(success).catch(fail);
}

function getBoard(boardId,success,fail) {
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.get(`/board/${boardId}`
    ).then(success).catch(fail);
}
 function postComment(param,success,fail){
     api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
       api.post(`/board/comment`,JSON.stringify(param))
           .then(success).catch(fail)
}
function postImage(image,success,fail){
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.post('/upload', {
        file: image
    },{
        'headers': {
            'Content-Type': "multipart/form-data"
        }
    }).then(success).catch(fail);
}
function postArticle(param,success,fail){
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.post(`/board`,JSON.stringify(param))
        .then(success).catch(fail)
}

function deleteArticle(boardId,success,fail) {
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.delete(`/board/${boardId}`
    ).then(success).catch(fail);
}
function putArticle(param,success,fail){
    api.defaults.headers["auth-token"] = sessionStorage.getItem("auth-token");
    api.put(`/board`,JSON.stringify(param))
        .then(success).catch(fail)
}
export {getBoardList, getBoard, postComment, postImage, postArticle, deleteArticle,putArticle}
