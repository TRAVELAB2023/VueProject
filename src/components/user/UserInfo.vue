<template>
  <div class="box">
    <h2>회원 정보</h2>

    <b-card style="padding: 10px; align-items: center">
      <b-col style="text-align: start">이메일: {{ userInfo.email }}</b-col>
      <b-col style="text-align: start">닉네임: {{ userInfo.nickname }}</b-col>
      <b-button variant="warning" v-b-modal.modal-1>비밀번호 변경
        <b-modal id="modal-1" title="비밀번호변경">

          <b-row v-if="!isCheckedPassword" style="align-content: end; padding: 10px;">
            <b-input
                style="width: 80%;
                  margin: 5px;
                    "
                id="email"
                type="password"
                v-model="inputPassword"
                placeholder="비밀번호 확인"
                required
            ></b-input>
            <b-button style="width: 15%;margin: 5px" variant="danger" @click="checkPassword">확인
            </b-button>
          </b-row>
          <b-row v-if="isCheckedPassword" style="align-content: end; padding: 10px;">
            <b-input
                style="width: 80%;
                  margin: 5px;
                    "
                id="email"
                type="password"
                v-model="newPassword"
                placeholder="변결할 비밀번호"
                required
            ></b-input>
            <b-input

                style="width: 80%;
                  margin: 5px;
                    "
                id="email"
                type="password"
                v-model="newCheckPassword"
                placeholder="비밀번호 확인"
                required
            ></b-input>
            <b-button style="width: 15%;margin: 5px" variant="danger" @click="modifyPassword">변경
            </b-button>
          </b-row>

        </b-modal>
      </b-button>
    </b-card>
  </div>
</template>

<script>

import {passwordCheck, passwordModify} from "@/api/member";
// import {checkToken} from "@/api/http";

export default {
  name: "UserJoin",
  data() {
    return {
      inputPassword: '',
      isCheckedPassword: false,
      userInfo: {},
      newPassword: '',
      newCheckPassword: '',


    };
  },
  created() {

    this.userInfo = this.$store.getters["memberStore/checkUserInfo"]
  },
  watch: {},
  methods: {
    modifyPassword() {
      if (this.newPassword != this.newCheckPassword) {
        alert("입력한 비밀번호를 확인해주세요")
      } else {
        let param = {
          curPassword: this.inputPassword,
          newPassword: this.newPassword
        }
        passwordModify(
            param, () =>{
              alert('비밀번호 변경 성공');
              this.$router.go(0)
            }
            , () => {
              alert('비밀번호 변경에 실패했습니다.')
              this.$router.go(0);
            }
        );
      }
    },

    checkPassword() {
      passwordCheck(this.inputPassword,
          () => {
            this.isCheckedPassword = true;
          }
          , (e) => {
            alert(e.response.data);
          }
      );

    },

  },
};
</script>

<style></style>
