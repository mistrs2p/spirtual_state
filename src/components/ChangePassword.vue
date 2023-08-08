<template>
  <div class="col-8">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        :type="isVisible ? 'text' : 'password'"
        v-model="currentPassword"
        label="کلمه عبور قبلی"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'کلمه عبور قبلی را وارد کنید',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="!isVisible ? 'visibility_off' : 'visibility'"
            @click="isVisible = !isVisible"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <q-input
        filled
        :type="isVisibleNew ? 'text' : 'password'"
        v-model="newPassword"
        label="کلمه عبور جدید"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'کلمه عبور جدید را وارد کنید',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="!isVisibleNew ? 'visibility_off' : 'visibility'"
            @click="isVisibleNew = !isVisibleNew"
            class="cursor-pointer"
          />
        </template>
      </q-input>
      <q-input
        filled
        :type="isVisibleConfirm ? 'text' : 'password'"
        v-model="confirmPassword"
        label="تکرار کلمه عبور جدید"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0 && val == newPassword) || 'مطابقت ندارد',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="!isVisibleConfirm ? 'visibility_off' : 'visibility'"
            @click="isVisibleConfirm = !isVisibleConfirm"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="تغییر کلمه عبور" type="submit" color="primary" />
        <q-btn
          label="خالی کردن"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          ref="reset"
          id="reset"
        />
      </div>
    </q-form>
    <q-inner-loading
      :showing="visibleLoader"
      label="لطفا منتظر بمانید..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script setup lang="ts">
import CryptoJS from "crypto-js";
import projectService from "../services/project.service";
import { Notify } from "quasar";

import { ref } from "vue";

const currentPassword = ref(null);
const newPassword = ref(null);
const confirmPassword = ref(null);
const isVisible = ref(false);
const isVisibleNew = ref(false);
const isVisibleConfirm = ref(false);
const visibleLoader = ref(false);
const reset = ref(null);
const onSubmit = () => {
  visibleLoader.value = true;
  const changePasswordModel = {
    CurrentPassword: CryptoJS.SHA256(
      CryptoJS.enc.Utf8.parse(currentPassword.value)
    ).toString(),
    NewPassword: newPassword.value,
  };
  projectService
    .UserChangePassword(changePasswordModel)
    .then((res) => {
      console.log(res);
      // currentPassword.value = null;
      // newPassword.value = null;
      // onReset(null);
      // reset.value.click();
      document.getElementById("reset")?.click();
      visibleLoader.value = false;
      Notify.create({
        message: res.data,
        position: "top",
        timeout: 500,
        progress: true,
        color: "positive",
      });
    })
    .catch((err) => {
      console.log(err);
      visibleLoader.value = false;
      Notify.create({
        message: err.message,
        position: "top",
        timeout: 500,
        progress: true,
        color: "negative",
      });
    });
};

const onReset = (e) => {
  if (e) e.preventDefault();

  newPassword.value = null;
  currentPassword.value = null;
  confirmPassword.value = null;
};
</script>
