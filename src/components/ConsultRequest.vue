<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-8">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          type="text"
          v-model="title"
          label="عنوان"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'عنوان باید ذکر شود']"
        />
        <q-input filled type="textarea" v-model="description" label="توضیحات" />
        <q-select
          name="masters"
          v-model="master"
          :options="mastersList"
          color="primary"
          filled
          clearable
          label="انتخاب استاد"
        />
        <q-select
          name="meeting"
          v-model="meeting"
          :options="meetingsList"
          color="primary"
          filled
          clearable
          label="انتخاب جلسه"
        />
        <q-input filled type="text" v-model="discount" label="کد تخفیف" />
        <q-checkbox
          size="xs"
          name="next_week_reserve"
          v-model="reserveNextWeek"
          label="رزرو همین ساعت برای هفته آینده"
        />
        <div>
          <q-btn label="ثبت و پرداخت" type="submit" color="primary" />
          <!-- <q-btn
            label="خالی کردن"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          /> -->
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { Notify } from 'quasar';

const title = ref(null);
const description = ref(null);
const master = ref(null);
const mastersList = ref([]);
const meeting = ref(null);
const meetingsList = ref([]);
const discount = ref(null);
const reserveNextWeek = ref(false);
// const onSubmit = () => {};
// const onReset = () => {
//   newPassword.value = null;
//   currentPassword.value = null;
//   confirmPassword.value = null;
// };
</script>
