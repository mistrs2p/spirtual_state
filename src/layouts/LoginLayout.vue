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
              style="min-width: 250px; max-width: 400px"
            >
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">
                  {{ isLogin ? "ورود" : "ثبت نام" }}
                </h4>
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
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-px-sm q-pt-xl"
                >
                  <q-input
                    square
                    clearable
                    v-model="login.UserName"
                    type="text"
                    lazy-rules
                    label="نام کاربری (شماره موبایل)"
                  >
                    <!-- :maxlength="11" -->
                    <!-- @keyup="handleRegex"
                    :rules="[
                      (val) =>
                        /^09\d{9}$/.test(val) ||
                        'لطفا فرمت مناسب موبایل وارد نمایید',
                    ]" -->
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="login.Password"
                    :type="visibility ? 'text' : 'password'"
                    lazy-rules
                    label="کلمه عبور"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'کلمه عبور مورد نیاز است',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibility ? 'visibility_off' : 'visibility'"
                        @click="visibility = !visibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="repassword"
                    :type="reVisibility ? 'text' : 'password'"
                    lazy-rules
                    label="تکرار کلمه عبور"
                    :rules="[
                      (val) =>
                        val == login.Password || 'با کلمه عبور مطابقت ندارد',
                    ]"
                    v-if="!isLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="reVisibility ? 'visibility_off' : 'visibility'"
                        @click="reVisibility = !reVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                  <q-card-actions
                    class="q-px-lg q-gutter-y-md"
                    style="display: flex; justify-content: center"
                  >
                    <q-btn
                      unelevated
                      size="lg"
                      type="submit"
                      color="secondary"
                      class="full-width text-white"
                      :label="isLogin ? 'ورود' : 'ثبت نام'"
                    />
                    <!-- <q-btn
                      unelevated
                      size="md"
                      type="reset"
                      color="warning"
                      class="text-white"
                      label="پاک کردن فرم"
                    /> -->
                  </q-card-actions>
                </q-form>
              </q-card-section>

              <q-card-section v-if="!isRegister" class="text-center q-pa-sm">
                <p class="text-grey-6"></p>
                <q-btn @click="isLogin = !isLogin" flat>{{
                  isLogin ? "ثبت نام نکرده اید؟" : "ورود به پنل کاربری"
                }}</q-btn>
              </q-card-section>
            </q-card>
          </div>

          <q-inner-loading
            :showing="visibleLoader"
            label="لطفا منتظر بمانید..."
            label-class="text-teal"
            label-style="font-size: 1.1em"
          />
          <p class="bg-blue-5 text-center q-pa-xs">
            <a class="text-white" href="tel:+989372031851"
              >پشتیبانی: 09372031851</a
            >
            <small style="display: block">نسخه {{ $appVersion }}</small>
          </p>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import interfaces from "@/interfaces/interfaces";
import { ref, Ref } from "vue";
import { useUserStore } from "../stores/user";
import projectService from "../services/project.service";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
import { Notify } from "quasar";
import { handleNewVersion } from "@/helpers/newVersionSet";

const userStore = useUserStore();
const router = useRouter();
const isLogin = ref(true);
const repassword = ref(null);
const isRegister = ref(false);

const login: Ref<interfaces.UserLogin> = ref({
  UserName: "",
  Password: "",
});

const visibility = ref(false);
const reVisibility = ref(false);
const visibleLoader = ref(false);
const onSubmit = () => {
  visibleLoader.value = true;
  const loginModel: interfaces.UserLogin = {
    UserName: login.value.UserName,
    Password: isLogin.value
      ? CryptoJS.SHA256(
          CryptoJS.enc.Utf8.parse(login.value.Password)
        ).toString()
      : login.value.Password,
  };
  console.log(loginModel);
  if (isLogin.value) {
    handleNewVersion();
    projectService
      .Login(loginModel)
      .then(({ data }: { data: interfaces.LoginResponse }) => {
        console.log(data);
        userStore.user = data;
        Notify.create({
          message: "ورود موفقیت آمیز",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "positive",
        });
        visibleLoader.value = false;

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
        visibleLoader.value = false;
      });
  } else {
    projectService
      .UserRegister(loginModel)
      .then(({ data }: { data: interfaces.RegisterResponse }) => {
        userStore.user = data;
        Notify.create({
          message: "ثبت نام موفقیت آمیز",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "positive",
        });
        handleNewVersion();

        visibleLoader.value = false;

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
        visibleLoader.value = false;
      });
  }
};

const onReset = () => {
  login.value.UserName = "";
  login.value.Password = "";
  repassword.value = null;
};

const handleRegex = (event) => {
  if (login.value.UserName == "" && login.value.UserName == null) return;
  // const keyPressed = String.fromCharCode(event.keyCode);
  const keyPressed = event.key;
  if (/\D/.test(keyPressed)) {
    console.log("str");
    if (login.value.UserName.length < 11) {
      login.value.UserName = login.value.UserName.slice(0, -1);
    }
  }
};
</script>
@/helpers/newVersionSet.jts
