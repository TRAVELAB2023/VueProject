<template>
  <div class="container align-items-start">
    <div class="main">
      <h2>공지사항 작성</h2>
      <input style="width: 100%;" placeholder="제목">
      <div style="height: 20px"></div>
      <div style="height: 450px;">
        <vue-editor
            :editor-toolbar="customToolbar"
            style="height: 400px;"
            id="editor"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
            v-model="htmlForEditor"
        >
        </vue-editor>
      </div>

      <b-row style="float: right;">
        <b-col>
          <b-button>목록</b-button>
        </b-col>
        <b-col>
          <b-button>작성</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor";
import axios from "axios";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      htmlForEditor: "",
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["image"],
      ]
    };
  },

  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
          .then(result => {
            const url = result.data.url; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
};
</script>