<template>
  <b-navbar toggleable="lg" type="dark" variant="warning">
    <b-navbar-brand @click="moveMain"><img style="width: 100px" src="@/assets/logo.png"></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="nav-list">
        <b-nav-item :to="{ name: 'AppNotice' }">공지사항</b-nav-item>
        <b-nav-item :to="{ name: 'AppCreatePlan' }">계획 짜기</b-nav-item>
        <b-nav-item :to="{ name: 'AppBoard' }">후기</b-nav-item>
        <b-nav-item :to="{ name: 'AppPlan' }">나의 계획</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em v-if="user">{{ userInfo.nickname }}</em>
          </template>
          <template v-if="user">
            <b-dropdown-item @click="info">내 정보</b-dropdown-item>
            <b-dropdown-item @click="logout" href="#">로그아웃</b-dropdown-item>
          </template>
          <template v-else>
            <b-dropdown-item :to="{ name: 'UserLogin' }">로그인</b-dropdown-item>
          </template>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import store from "@/store";
import {mapState} from "vuex";

export default {
  data() {
    return {
      user: {},

    }
  },

  name: "HeaderNavBar",
  computed: {
    ...mapState("memberStore", ["userInfo"]),
  },
  methods: {
    moveMain() {
      this.$router.push("/main")
    },
    async logout() {
      await store.dispatch("memberStore/userLogout", this.user.email);
      this.$router.push("/user/login");
      this.user=null
    },
    info() {
      this.$router.push("/user/info")

    }
  },
  watch: {
    userInfo(newVal) {
      this.user = newVal;
    },
  },

}

</script>

<style></style>
