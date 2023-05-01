<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-8">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          :type="isVisible ? 'text' : 'password'"
          v-model="currentPassword"
          label="کلمه عبور"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'کلمه عبور باید حداقل 8 کاراکتر باشد',
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
          label="کلمه عبور"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'کلمه عبور جدید باید حداقل 8 کاراکتر باشد',
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
          label="تکرار کلمه عبور"
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
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CryptoJS from "crypto-js";
import projectService from "../services/project.service";

import { ref } from "vue";

const currentPassword = ref(null);
const newPassword = ref(null);
const confirmPassword = ref(null);
const isVisible = ref(false);
const isVisibleNew = ref(false);
const isVisibleConfirm = ref(false);
const onSubmit = () => {
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
      currentPassword.value = null;
      newPassword.value = null;
    })
    .catch((err) => {
      console.log(err);
    });
};
const onReset = () => {
  newPassword.value = null;
  currentPassword.value = null;
  confirmPassword.value = null;
};
</script>
