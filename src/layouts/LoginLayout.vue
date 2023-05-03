<template>
  <q-layout view="lHh Lpr fff">
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
        style="background: linear-gradient(#8274c5, #5a4a9f)"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="min-width: 250px; max-width: 400px; height: 540px"
            >
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
              </q-card-section>
              <q-card-section>
                <!-- <q-fab
                  color="primary"
                  @click="switchTypeForm"
                  icon="add"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%)"
                >
                  <q-tooltip> Регистрация нового пользователя </q-tooltip>
                </q-fab> -->
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    square
                    clearable
                    v-model="userName"
                    type="email"
                    lazy-rules
                    label="نام کاربری"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    v-if="register"
                    square
                    clearable
                    v-model="userName"
                    lazy-rules
                    type="username"
                    label="Пользователь"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="password"
                    :type="passwordFieldType"
                    lazy-rules
                    label="کلمه عبور"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                  <q-input
                    v-if="register"
                    square
                    clearable
                    v-model="repassword"
                    :type="passwordFieldType"
                    lazy-rules
                    label="کلمه عبور"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="onSubmit"
                  class="full-width text-white"
                  :label="btnLabel"
                />
              </q-card-actions>
              <q-card-section v-if="!register" class="text-center q-pa-sm">
                <p class="text-grey-6">ثبت نام نکرده اید؟</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import projectService from "../services/project.service.js";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
import { Notify } from "quasar";

const userStore = useUserStore();
const router = useRouter();

const title = ref("ورود");
const userName = ref("");
const password = ref("");
const repassword = ref("");
const register = ref(false);
const passwordFieldType = ref("password");
const btnLabel = ref("ورود");
const visibility = ref(false);
const visibilityIcon = ref("visibility");

const onSubmit = () => {
  const loginModel = {
    UserName: userName.value,
    Password: CryptoJS.SHA256(
      CryptoJS.enc.Utf8.parse(password.value)
    ).toString(),
    // SeqKey: seqKey,
  };
  console.log(loginModel);
  try {
    projectService
      .Login(loginModel)
      .then((res) => {
        console.log(res);
        userStore.user = res.data;
        console.log(userStore.user);
        Notify.create({
          message: "ورود موفقیت آمیز",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "positive",
        });
        router.push({ name: "home" });
      })
      .catch((err) => {
        console.log(err);
        Notify.create({
          message: err.response.data.Message,
          position: "top",
          timeout: 500,
          progress: true,
          color: "negative",
        });
        // isLoading.value = false;
      });
  } catch (e) {
    console.log(e);
  }
};
const switchTypeForm = () => {
  // register.value = !register.value;
  // title.value = register.value ? "ثبت نام" : "ورود";
  // btnLabel.value = register.value ? "ثبت نام" : "ورود";
};
const switchVisibility = () => {
  visibility.value = !visibility.value;
  passwordFieldType.value = visibility.value ? "text" : "password";
  visibilityIcon.value = visibility.value ? "visibility_off" : "visibility";
};
</script>
