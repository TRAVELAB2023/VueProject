<template>
  <div class="box">
    <h2>비밀번호 찾기</h2>
    <b-card>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="email" label="이메일:" label-for="email">
          <b-form-input id="email" v-model="form.email" type="email" placeholder="이메일을 입력하세요" required></b-form-input>
        </b-form-group>

        <b-button type="submit" block variant="primary">이메일 변경 요청</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { sendEmail } from "@/api/email.js";
export default {
  name: "UserFindPassword",
  data() {
    return {
      form: {
        email: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const param = {
        email: this.form.email,
      };
      sendEmail(
        param,
        () => {
          alert("성공적으로 전송되었습니다.");
        },
        () => {
          alert("서버에 문제가 발생했습니다.");
        }
      );
      alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style></style>
