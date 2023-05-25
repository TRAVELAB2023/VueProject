<template>
  <div>
    <input type="file" @change="uploadFunction" id="file" hidden>

    <div className="example">
      <div><input style="width: 100%;" placeholder="제목" v-model="title"></div>
      <quill-editor
          v-model="content"
          ref="myTextEditor"
          :disabled="false"
          :options="editorOption"
      />
      <!--      <div className="output ql-snow">-->
      <!--        <div v-html="content"></div>-->
      <!--      </div>-->
      <b-row style="float: right;">
        <b-col>
          <b-button variant="primary" @click="moveList">목록</b-button>
        </b-col>
        <b-col>
          <b-button variant="success" @click="submitPost">작성</b-button>
        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
import hljs from "highlight.js";
import {quillEditor} from 'vue-quill-editor'
// highlight.js style
import "highlight.js/styles/tomorrow.css";
// import theme style
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import {postImage} from "@/api/board";
// import {postImage} from "@/api/board";

export default {
  name: "quill-example-snow",
  title: "Theme: snow",
  components: {
    quillEditor,
  },

  props: [
    'event',
    'listLink'
  ],
  created() {

  },
  data() {
    return {
      memberId: this.$store.getters["memberStore/checkUserInfo"].memberId,
      title: '',
      editorOption: {
        placeholder: "place holder test",
        modules: {

          toolbar: {
            handlers: {
              'image': function () {
                document.getElementById('file').click()
              }
            },
            container: [
              ["bold", "italic", "underline", "strike"], // <strong>, <em>, <u>, <s>
              ["blockquote", "code-block"], // <blockquote>, <pre class="ql-syntax" spellcheck="false">
              [{header: 1}, {header: 2}], // <h1>, <h2>
              [{list: "ordered"}, {list: "bullet"}],
              [{script: "sub"}, {script: "super"}], // <sub>, <sup>
              [{indent: "-1"}, {indent: "+1"}], // class제어
              [{direction: "rtl"}], //class 제어
              [{size: ["small", false, "large", "huge"]}], //class 제어 - html로 되도록 확인
              [{header: [1, 2, 3, 4, 5, 6, false]}], // <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, normal
              [{font: []}], // 글꼴 class로 제어
              [{color: []}, {background: []}], //style="color: rgb(230, 0, 0);", style="background-color: rgb(230, 0, 0);"
              [{align: []}], // class
              // ["clean"],
              ["image"],
            ],
          },
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      content: ''
    };
  },
  methods: {
    moveList() {
      this.$router.push(this.listLink);
    },

    uploadFunction(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile)
      postImage(this.selectedFile, (r => {
        console.log(r)

        //this code to set your position cursor
        const range = this.$refs.myTextEditor.quill.getSelection()
//this code to set image on your server to quill editor
        this.$refs.myTextEditor.quill.insertEmbed(range.index, 'image', r.data)
      }), (e) => {
        console.log(e)
      });
      // postImage(this.selectedFile,({}))
    },
    updateUrl: function (image) {
      console.log(image)
      console.log('!!!!!!!');


      //
    },
    submitPost() {
      let param = {
        title: this.title,
        content: this.content,
        memberId: this.memberId,
      }

      this.event(param, () => this.$router.push(this.listLink), (e) => {
        console.log(e)
        this.$router.push(this.listLink)
      });


    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },
};
</script>
<style>
</style>