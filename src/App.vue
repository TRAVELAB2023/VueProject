<template>
  <div id="app">
    <header-nav-bar></header-nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderNavBar from "@/components/TheHeaderNavBar";
export default {
  name: "App",
  components: { HeaderNavBar },
};
</script>

<style>
.b-sidebar {
  min-width: 500px !important;
}
.container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.main {
  min-width: 90%;
}
.box {
  padding: 5%;
  border: solid rgb(3, 13, 17);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-list {
  width: 50%;
  justify-content: space-evenly;
}
nav .navbar-nav a.nav-link {
  font-weight: bold;
  color: #2c3e50 !important;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
