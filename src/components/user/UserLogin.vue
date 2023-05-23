<template>
  <div class="box">
    <h2>로그인</h2>
    <b-card>
      <b-form  v-if="show">
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

        <b-button @click="onSubmit" block variant="primary">로그인</b-button>
        <br />
        <router-link :to="{ name: 'UserFindPassword' }">비밀번호 찾기</router-link> |
        <router-link :to="{ name: 'UserJoin' }">회원가입</router-link>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
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
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async onSubmit() {
      await this.userConfirm(this.form);

      let token = sessionStorage.getItem("auth-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push('/');
      }
    },
  },
};
</script>

<style></style>
