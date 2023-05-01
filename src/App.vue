<template>
  <router-view />
</template>

<script setup>
// import projectService from "./services/project.service.js";
// alert(true);
// console.log(projectService.GetAllMasters());
</script>
<style lang="scss">
@font-face {
  font-family: Vazir;
  src: url("@/assets/fonts/Vazir.ttf");
  font-weight: normal;
}

@font-face {
  font-family: Vazir;
  src: url("@/assets/fonts/Vazir-Bold.ttf");
  font-weight: bold;
}

* {
  font-family: Vazir;
}
a {
  text-decoration: none;
  color: black;
}
.router-link-active,
.router-link-exact-active {
  color: #3110c4;
  & .q-item {
    background-color: rgb(147, 210, 247);
  }
}
</style>
