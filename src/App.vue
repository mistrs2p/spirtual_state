<template>
  <router-view />
</template>

<script setup>
import axios from "axios";
const httpConfig = axios.create({
  baseURL: "127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
httpConfig.get("/").then((res) => console.log(res));
console.log(process.env);

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
.vpd-container {
  .vpd-day,
  .vpd-day-effect,
  .vpd-day-text {
    cursor: pointer !important;
    opacity: 1 !important;
  }
}
</style>
