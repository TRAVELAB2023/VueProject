import {apiInstance} from "@/api/http";

const api = apiInstance();

function getBoardList(param,success,fail) {
    api.get(`/board/list`, {params: param}
    ).then(success).catch(fail);
}

function getBoard(boardId,success,fail) {
    api.get(`/board/${boardId}`
    ).then(success).catch(fail);
}
function postComment(param,success,fail){
       api.post(`/board/comment`,JSON.stringify(param))
           .then(success).catch(fail)
}
function postImage(image,success,fail){
    api.post('/image', {
        image: image
    }).then(success).catch(fail);
}
function postArticle(param,success,fail){
    api.post(`/board`,JSON.stringify(param))
        .then(success).catch(fail)
}
export {getBoardList, getBoard, postComment, postImage, postArticle}
