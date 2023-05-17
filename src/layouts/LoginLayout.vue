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
                    v-model="userName"
                    type="text"
                    lazy-rules
                    label="نام کاربری"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'نام کاربری مورد نیاز است',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="password"
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
                      (val) => val == password || 'با کلمه عبور مطابقت ندارد',
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

              <q-card-section v-if="!register" class="text-center q-pa-sm">
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
const isLogin = ref(true);
const userName = ref();
const password = ref();
const repassword = ref();
const register = ref(false);
const passwordFieldType = ref("password");
const visibility = ref(false);
const reVisibility = ref(false);
const visibilityIcon = ref("visibility");
const visibleLoader = ref(false);
const onSubmit = () => {
  visibleLoader.value = true;
  let myApi = null;
  const loginModel = {
    UserName: userName.value,
    Password: CryptoJS.SHA256(
      CryptoJS.enc.Utf8.parse(password.value)
    ).toString(),
    // SeqKey: seqKey,
  };
  isLogin.value
    ? (myApi = projectService.Login(loginModel))
    : (myApi = projectService.UserRegister(loginModel));
  console.log(loginModel);
  try {
    myApi
      .then((res) => {
        console.log(res);
        userStore.user = res.data;
        console.log(userStore.user);
        Notify.create({
          message: isLogin.value ? "ورود موفقیت آمیز" : "ثبت نام موفقیت آمیز",
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

const onReset = () => {
  userName.value = null;
  password.value = null;
  repassword.value = null;
};
</script>
