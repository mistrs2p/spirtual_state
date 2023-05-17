<template>
  <div class="col-10">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.name"
            label="نام"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'نام باید ذکر شود']"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.family"
            label="نام خانوادگی"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'نام خانوادگی باید ذکر شود',
            ]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.telephone"
            label="شماره تلفن ثابت"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'شماره تلفن ثابت باید ذکر شود',
            ]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.mobilephone"
            label="شماره تلفن همراه"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'شماره تلفن همراه باید ذکر شود',
            ]"
          />
        </div>
        <div class="col-12">
          <q-input
            filled
            v-model="infoModel.birthDate"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="infoModel.birthDate" calendar="persian">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-6">
          جنسیت:

          <q-option-group
            name="gender"
            v-model="infoModel.gender"
            :options="[
              { label: 'مرد', value: 'male' },
              { label: 'زن', value: 'female' },
            ]"
            color="primary"
            inline
          />
        </div>
        <div class="col-12 col-md-6">
          وضعیت تاهل:

          <q-option-group
            name="marriage"
            v-model="infoModel.marriage"
            :options="[
              { label: 'مجرد', value: 'single' },
              { label: 'متاهل', value: 'married' },
            ]"
            color="primary"
            inline
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.profession"
            label="شغل"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.religion"
            label="مذهب"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.language"
            label="زبان"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input filled type="text" v-model="infoModel.race" label="نژاد" />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.nationality"
            label="ملیت"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.education"
            label="میزان تحصیلات"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.birthPlace"
            label="محل تولد"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input filled type="text" v-model="infoModel.city" label="شهر" />
        </div>
        <div class="col-12 col-md-6">
          <q-input filled type="text" v-model="infoModel.state" label="استان" />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel.postalCode"
            label="کد پستی"
          />
        </div>

        <div class="col-12">
          <q-input
            filled
            type="textarea"
            v-model="infoModel.address"
            label="آدرس دقیق محل سکونت"
          />
        </div>
      </div>
      <div>
        <q-btn label="اعمال تغییرات" type="submit" color="primary" />
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
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { Notify } from 'quasar';

const infoModel = ref({
  name: null,
  family: null,
  telephone: null,
  mobilephone: null,
  birthDate: null,
  gender: null,
  marriage: null,
  profession: null,
  religion: null,
  language: null,
  race: null,
  nationality: null,
  education: null,
  birthPlace: null,
  city: null,
  state: null,
  postalCode: null,
  address: null,
});
const onSubmit = () => {
  console.log(infoModel.value);
  // const changePasswordModel = {
  //   CurrentPassword: CryptoJS.SHA256(
  //     CryptoJS.enc.Utf8.parse(currentPassword.value)
  //   ).toString(),
  //   NewPassword: newPassword.value,
  // };
  // projectService
  //   .UserChangePassword(changePasswordModel)
  //   .then((res) => {
  //     console.log(res);
  //     currentPassword.value = null;
  //     newPassword.value = null;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
// const onReset = () => {
//   newPassword.value = null;
//   currentPassword.value = null;
//   confirmPassword.value = null;
// };
</script>
