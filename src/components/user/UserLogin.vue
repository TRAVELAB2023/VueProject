<template>
  <div class="box">
    <h2>로그인</h2>
    <b-card>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="email" label="이메일:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="이메일을 입력하세요"
            required
          ></b-form-input>
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

        <b-button type="submit" block variant="primary">로그인</b-button>
        <br />
        <router-link :to="{ name: 'UserFindPassword' }">비밀번호 찾기</router-link> |
        <router-link :to="{ name: 'UserJoin' }">회원가입</router-link>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style></style>
