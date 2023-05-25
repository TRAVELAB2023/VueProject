<template>
  <div></div>
</template>

<script>
import { checkEmail } from "@/api/email";
export default {
  name: "UserCheckAuth",
  created() {
    const param = {
      key: this.$route.params.key,
    };

    checkEmail(
      param,
      () => {
        alert("성공적으로 변경되었습니다.");
        this.$router.push({ name: "UserLogin" });
      },
      (error) => {
        alert(error.response.data);
        this.$router.push({ name: "AppMain" });
      }
    );
  },
};
</script>

<style></style>
