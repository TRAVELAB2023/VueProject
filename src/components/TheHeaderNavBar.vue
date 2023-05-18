<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">로고</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="nav-list">
        <b-nav-item :to="{ name: 'AppNotice' }">공지사항</b-nav-item>
        <b-nav-item :to="{ name: 'AppCreatePlan' }">계획 짜기 </b-nav-item>
        <b-nav-item :to="{ name: 'AppBoard' }">후기</b-nav-item>
        <b-nav-item :to="{ name: 'AppPlan' }">나의 계획</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>계정</em>
          </template>
          <b-dropdown-item :to="{ name: 'UserLogin' }">로그인</b-dropdown-item>
          <b-dropdown-item href="#">내 정보</b-dropdown-item>
          <b-dropdown-item href="#">로그아웃</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "HeaderNavBar",
};
</script>

<style></style>
