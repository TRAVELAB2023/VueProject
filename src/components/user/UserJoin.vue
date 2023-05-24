<template>
  <div class="box">
    <h2>로그인</h2>
    <b-card>
      <b-form-group id="email" label="이메일:" label-for="email">
        <b-input-group>
          <b-form-input
              id="email"
              type="email"
              v-model="email"
              placeholder="이메일을 입력하세요"
              required
          ></b-form-input>
          <b-input-group-append>

            <b-button v-if="isEmail==false" variant="danger
" @click="checkEmail">중복 확인
            </b-button>
            <!--            <b-button v-if="isEmail==true" variant="success" @click="checkEmail">힝</b-button>-->
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-form-group id="nickname" label="닉네임:" label-for="nickname">
        <b-input-group>
          <b-form-input
              id="nickname"
              type="text"
              v-model="nickname"
              placeholder="닉네임을 입력하세요"
              required
          ></b-form-input>
          <b-input-group-append>
            <b-button v-if="isNickname==false" variant="danger
" @click="checkNickName">중복 확인
            </b-button>
            <!--            <b-button v-if="isNickname==true" variant="info" @click="checkNickName">힝</b-button>-->
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group id="password" label="비밀번호:" label-for="password">
        <b-form-input
            id="password"
            type="password"
            v-model="password"
            placeholder="비밀번호를 입력하세요"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-checkbox
          id="checkbox-1"
          v-model="checked"
          name="checkbox-1"
          value="true"
          unchecked-value="false"
      >
        마케팅 동의
      </b-form-checkbox>

      <b-button @click="onSubmit" block variant="warning">회원가입</b-button>
    </b-card>
  </div>
</template>

<script>
import {duplicateCheckEmail, duplicateCheckNickname, join} from "@/api/member";

export default {
  name: "UserJoin",
  data() {
    return {
      email: "",
      nickname: "",
      password: "",
      checked: false,
      show: true,
      isEmail: false,
      isNickname: false,
    };
  },
  watch: {
    nickname: function () {
      this.isNickname = false;
    },
    email: function () {
      this.isEmail = false;
    },
  },
  methods: {
    async onSubmit() {
      if (!this.isEmail) {
        alert("이메일을 확인해주세요.")
      } else if (!this.isNickname) {
        alert("닉네임을 확인해주세요.")
      } else if (this.password == "") {
        alert("비밀번호를 확인해주세요.")
      }
      let param = {
        email: this.email,
        marketing: this.checked,
        nickname: this.nickname,
        password: this.password
      }
      await join(param, () => {
            alert('회원가입 완료');
            this.$router.push("/user/login");
          }, (e) => {
            console.log(e)
            alert('회원가입 실패')
          }
      );
    },
    checkNickName() {
      duplicateCheckNickname(this.nickname,
          ({data}) => {
            if (data == '중복') {
              alert('사용할 수 없는 닉네임입니다.')
            } else {
              alert('사용할 수 있는 닉네임입니다.')
              this.isNickname = true;
            }
          }, (e) => console.log(e)
      );

    },
    checkEmail() {
      duplicateCheckEmail(this.email,
          ({data}) => {
            if (data == '중복') {
              alert('사용할 수 없는 이메일입니다.')
            } else if (data == '잘못된 형식') {
              alert('잘못된 형식의 이메일입니다.')
            } else {
              alert('사용할 수 있는 이메일입니다.')
              this.isEmail = true;
            }
          }, (e) => console.log(e)
      );

    }
  },
};
</script>

<style></style>
