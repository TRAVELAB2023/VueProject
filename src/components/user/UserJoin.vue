<template>
  <div class="box">
    <h2>로그인</h2>
    <b-card>
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="email" label="이메일:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="이메일을 입력하세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="nickname" label="닉네임:" label-for="nickname">
          <b-input-group>
            <b-form-input
              id="nickname"
              type="text"
              v-model="form.nickname"
              placeholder="닉네임을 입력하세요"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="info" @click="checkNickName">중복 확인</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group id="password" label="비밀번호:" label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="비밀번호를 입력하세요"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox
          id="checkbox-1"
          v-model="form.checked"
          name="checkbox-1"
          value="true"
          unchecked-value="false"
        >
          마케팅 동의
        </b-form-checkbox>

        <b-button type="submit" block variant="primary">회원가입</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "UserJoin",
  data() {
    return {
      form: {
        email: "",
        nickname: "",
        password: "",
        checked: false,
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    checkNickName() {
      alert(this.form.nickname);
    },
  },
};
</script>

<style></style>
