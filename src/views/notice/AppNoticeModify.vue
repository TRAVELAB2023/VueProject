<template>
  <div>
    <div class="main">
      <h2>여행 후기</h2>

      <div style="height: 20px"></div>
      <div  variant="outline-primary" style="height: 450px;">
        <input type="file" @change="uploadFunction" id="file" hidden>

        <div className="example">
          <div><input style="width: 100%;" placeholder="제목" v-model="article.title"></div>
          <quill-editor
              v-model="article.content"
              ref="myTextEditor"
              :disabled="false"
              :options="editorOption"
          />
          <!--      <div className="output ql-snow">-->
          <!--        <div v-html="content"></div>-->
          <!--      </div>-->
          <b-row style="float: right;">
            <b-col>
              <b-button @click="moveList">목록</b-button>
            </b-col>
            <b-col>
              <b-button @click="submitPost">수정</b-button>
            </b-col>
          </b-row>
        </div>
      </div>
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
import {getNotice, putArticle} from "@/api/notice";
// import {postImage} from "@/api/board";

export default {
  components: {
    quillEditor,
  },

  created() {
    getNotice(this.id,({data})=>
        this.article=data,(error)=>
        console.log(error)
    )
  },
  data() {
    return {
      id: this.$route.params.boardId,
      article:{},
      editorOption: {
        placeholder: "글을 작성하세요",
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
    };
  },
  methods: {
    moveList() {
      this.$router.push('/notice/list');
    },

    uploadFunction(e) {
      this.selectedFile = e.target.files[0];
      postImage(this.selectedFile, (r => {

        //this code to set your position cursor
        const range = this.$refs.myTextEditor.quill.getSelection()
//this code to set image on your server to quill editor
        this.$refs.myTextEditor.quill.insertEmbed(range.index, 'image', r.data)
      }), (e) => {
        console.log(e)
      });
      // postImage(this.selectedFile,({}))
    },
    submitPost() {
      let param = {
        id: this.id,
        title: this.article.title,
        content: this.article.content,
      }


      putArticle(param, ({data}) =>{
        console.log(data)
        this.$router.push('/notice/list')
      } , (e) => console.log(e));


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