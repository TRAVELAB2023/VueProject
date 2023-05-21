<template>
  <div class="container align-items-start">
    <div class="main">
      <h2>여행 후기</h2>

      <div style="height: 20px"></div>
      <div  variant="outline-primary" style="height: 450px;">

        <tiptap :event="postArticle" />
      </div>


    </div>

  </div>
</template>

<script>
import Tiptap from '@/components/MyTiptab'
import {postImage, postArticle} from "@/api/board";

export default {
  data() {
    return {
      postArticle
    };
  },
  props:[postArticle],
  components:{
    Tiptap
  },

  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      console.log('image');
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      // var formData = new FormData();
      // formData.append("image", file);

      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //     .then(result => {
      //       const url = result.data.url; // Get url from response
      //       Editor.insertEmbed(cursorLocation, "image", url);
      //       resetUploader();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });



      postImage(file,(result => {
        const url = result.data.url; // Get url from response
        console.log(url)
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      }),
          (err => {
            console.log(err);
          }))
    }
  }
};
</script>