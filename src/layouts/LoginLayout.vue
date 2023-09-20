<template>
  <q-layout view="lHh Lpr fff">
    <q-page-container>
      <q-page
        v-if="!isForgetPass"
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
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="register.Name"
                    type="text"
                    lazy-rules
                    label="نام"
                    :rules="[
                      (val) => (val && val.length > 0) || 'نام وارد شود',
                    ]"
                    v-if="!isLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="register.Family"
                    type="text"
                    lazy-rules
                    label="نام خانوادگی"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'نام خانوادگی وارد شود',
                    ]"
                    v-if="!isLogin"
                  >
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
                  </q-card-actions>
                </q-form>
              </q-card-section>

              <q-card-section v-if="!isRegister" class="text-center q-pa-sm">
                <p class="text-grey-6"></p>
                <q-btn @click="isLogin = !isLogin" flat>{{
                  isLogin ? "ثبت نام نکرده اید؟" : "ورود به پنل کاربری"
                }}</q-btn>
                <q-btn @click="isForgetPass = !isForgetPass" flat>{{
                  isLogin ? "فراموشی رمز عبور" : "فراموشی رمز عبور"
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
      <q-page
        v-else
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
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    square
                    clearable
                    v-model="forgetPhone.PhoneNumber"
                    type="text"
                    lazy-rules
                    label="شماره موبایل"
                    :disable="isStep2 || isStep3"
                  >
                    <template v-slot:prepend>
                      <q-icon name="phone" />
                    </template>
                  </q-input>
                  <q-input
                    v-if="isStep2"
                    square
                    clearable
                    v-model="forgetPhone.ForgotPassCode"
                    type="text"
                    lazy-rules
                    label="کد ارسالی"
                    :disable="isStep3"
                  >
                    <template v-slot:prepend>
                      <q-icon name="code" />
                    </template>
                  </q-input>

                  <q-input
                    square
                    clearable
                    v-model="newForgetPass"
                    :type="fVisibility ? 'text' : 'password'"
                    lazy-rules
                    label="کلمه عبور"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'کلمه عبور مورد نیاز است',
                    ]"
                    v-if="isStep3"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="fVisibility ? 'visibility_off' : 'visibility'"
                        @click="fVisibility = !fVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                  <q-input
                    square
                    v-if="isStep3"
                    clearable
                    v-model="reNewForgetPass"
                    :type="fReVisibility ? 'text' : 'password'"
                    lazy-rules
                    label="تکرار کلمه عبور"
                    :rules="[
                      (val) =>
                        val == newForgetPass || 'با کلمه عبور مطابقت ندارد',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="fReVisibility ? 'visibility_off' : 'visibility'"
                        @click="fReVisibility = !fReVisibility"
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
                      @click="sendForgetCode"
                      color="secondary"
                      class="full-width text-white"
                      :label="true ? 'دریافت کد' : 'ثبت نام'"
                      v-if="!isStep2 && !isStep3"
                    />
                    <q-btn
                      unelevated
                      size="lg"
                      type="submit"
                      @click="handleSendCode"
                      color="secondary"
                      class="full-width text-white"
                      :label="true ? 'ارسال کد' : 'ثبت نام'"
                      v-if="isStep2 && !isStep3"
                    />
                    <q-btn
                      unelevated
                      size="lg"
                      type="submit"
                      @click="handleFinish"
                      color="secondary"
                      class="full-width text-white"
                      :label="true ? 'تغییر رمز' : 'ثبت نام'"
                      v-if="isStep3"
                    />
                  </q-card-actions>
                </q-form>
              </q-card-section>

              <q-card-section v-if="!isRegister" class="text-center q-pa-sm">
                <p class="text-grey-6"></p>
                <q-btn @click="isLogin = !isLogin" flat>{{
                  isLogin ? "ثبت نام نکرده اید؟" : "ورود به پنل کاربری"
                }}</q-btn>
                <q-btn @click="isForgetPass = !isForgetPass" flat>{{
                  isLogin ? "صفحه ورود" : "صفحه ورود"
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
const isForgetPass = ref(false);

const login: Ref<interfaces.UserLogin> = ref({
  UserName: "",
  Password: "",
});

const register = ref({
  Name: "",
  Family: "",
});

const newForgetPass = ref(null);
const reNewForgetPass = ref(null);
const forgetPhone: Ref<interfaces.ForgotPassword> = ref({
  PhoneNumber: "",
  Password: null,
  ForgotPassCode: null,
});
// const forgetPhone: Ref<interfaces.ForgotPasswordStep1> = ref({
//   PhoneNumber: "",
// });

const visibility = ref(false);
const reVisibility = ref(false);

const fVisibility = ref(false);
const fReVisibility = ref(false);

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
    const model = {
      ...loginModel,
      ...register.value,
    };
    console.log(model);
    projectService
      .UserRegister(model)
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
const resetForgotElement = () => {
  fVisibility.value = false;
  fReVisibility.value = false;
  isStep2.value = false;
  isStep3.value = false;
  isForgetPass.value = false;
  forgetPhone.value.PhoneNumber = "";
  forgetPhone.value.ForgotPassCode = "";
  forgetPhone.value.Password = "";
  newForgetPass.value = null;
  reNewForgetPass.value = null;
};
const isStep2 = ref(false);
const isStep3 = ref(false);
const handleSendCode = (e) => {
  visibleLoader.value = true;
  e.preventDefault();
  projectService
    .ForgotPasswordStep2({
      PhoneNumber: forgetPhone.value.PhoneNumber,
      ForgotPassCode: forgetPhone.value.ForgotPassCode,
    })
    .then((res) => {
      console.log(res);
      isStep2.value = false;
      isStep3.value = true;
      Notify.create({
        message: res.data,
        position: "top",
        timeout: 1000,
        progress: true,
        color: "positive",
      });

      visibleLoader.value = false;
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
};
const sendForgetCode = (e) => {
  e.preventDefault();
  visibleLoader.value = true;
  console.log("submit forget");
  projectService
    .ForgotPasswordStep1({ PhoneNumber: forgetPhone.value.PhoneNumber })
    .then((res) => {
      console.log(res);
      isStep2.value = true;
      Notify.create({
        message: res.data,
        position: "top",
        timeout: 1000,
        progress: true,
        color: "positive",
      });

      visibleLoader.value = false;
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
};
const handleFinish = (e) => {
  e.preventDefault();
  visibleLoader.value = true;
  console.log("submit forget");
  projectService
    .ForgotPasswordFinalStep({
      PhoneNumber: forgetPhone.value.PhoneNumber,
      Password: newForgetPass.value,
    })
    .then((res) => {
      console.log(res);
      Notify.create({
        message: res.data,
        position: "top",
        timeout: 1000,
        progress: true,
        color: "positive",
      });
      visibleLoader.value = false;
      resetForgotElement();
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
};
</script>
