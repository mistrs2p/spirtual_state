<template>
  <div class="col-10">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <q-input
            filled
            type="text"
            v-model="infoModel1.DisplayName"
            label="نام نمایشی"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'نام نمایشی باید ذکر شود',
            ]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.Name"
            label="نام"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'نام باید ذکر شود']"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.Family"
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
            v-model="infoModel1.Phone"
            label="شماره تلفن ثابت"
            lazy-rules
          />
          <!-- :rules="[
              (val) =>
                (val && val.length > 0) || 'شماره تلفن ثابت باید ذکر شود',
            ]" -->
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.Mobile"
            label="شماره تلفن همراه"
            lazy-rules
          />
          <!-- :rules="[
              (val) =>
                (val && val.length > 0) || 'شماره تلفن همراه باید ذکر شود',
            ]" -->
        </div>
        <div class="col-12">
          <q-input filled v-model="infoModel1.BirthDate">
            <!-- :rules="['date']" -->
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="infoModel1.BirthDate" calendar="persian">
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
            v-model="infoModel1.isMaile"
            :options="[
              { label: 'مرد', value: true },
              { label: 'زن', value: false },
            ]"
            color="primary"
            inline
          />
        </div>
        <div class="col-12 col-md-6">
          وضعیت تاهل:

          <q-option-group
            name="marriage"
            v-model="infoModel1.IsSingle"
            :options="[
              { label: 'مجرد', value: true },
              { label: 'متاهل', value: false },
            ]"
            color="primary"
            inline
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input filled type="text" v-model="infoModel1.Job" label="شغل" />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.Religion"
            label="مذهب"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.Language"
            label="زبان"
          />
        </div>
        <!-- <div class="col-12 col-md-6">
          <q-input filled type="text" v-model="infoModel1.race" label="نژاد" />
        </div> -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.Nasionality"
            label="ملیت"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.Education"
            label="میزان تحصیلات"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.BirthPlace"
            label="محل تولد"
          />
        </div>
        <!-- <div class="col-12 col-md-6">
          <q-input filled type="text" v-model="infoModel1.City" label="شهر" />
        </div> -->
        <div class="col-12 col-md-6">
          <q-input filled type="text" v-model="infoModel1.City" label="استان" />
        </div>
        <!-- <div class="col-12 col-md-6">
          <q-input
            filled
            type="text"
            v-model="infoModel1.postalCode"
            label="کد پستی"
          />
        </div> -->

        <div class="col-12">
          <q-input
            filled
            type="textarea"
            v-model="infoModel1.Address"
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
import { Notify } from "quasar";
import projectService from "../services/project.service.js";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
import moment from "jalali-moment";

// const infoModel = ref({
//   name: null,
//   family: null,
//   telephone: null,
//   mobilephone: null,
//   birthDate: null,
//   gender: null,
//   marriage: null,
//   profession: null,
//   religion: null,
//   language: null,
//   race: null,
//   nationality: null,
//   education: null,
//   birthPlace: null,
//   city: null,
//   state: null,
//   postalCode: null,
//   address: null,
// });

const infoModel1 = ref({
  DisplayName: null,
  Name: null,
  Family: null,
  Mobile: null,
  Phone: null,
  City: null,
  Address: null,
  isMaile: false,
  BirthDate: null,
  Status: false,
  ImgAddress: null,
  IsUserNameIsMobile: false,
  IsSingle: false,
  Job: null,
  Religion: null,
  Language: null,
  Nasionality: null,
  Education: null,
  BirthPlace: null,
});

const userData = JSON.parse(localStorage.getItem("UserStore") || "{}").user;
for (let k in infoModel1.value) {
  infoModel1.value[k] = userData[k];
  if (k == "BirthDate" && infoModel1.value[k] != null) {
    alert(infoModel1.value[k]);
    console.log(infoModel1.value[k]);
    const dateTimeEdit = userData[k].split("T");
    infoModel1.value.BirthDate = moment(dateTimeEdit[0], "YYYY-MM-DD")
      .locale("fa")
      .format("YYYY/MM/DD");
  }
}

const userStore = useUserStore();
const router = useRouter();

const onSubmit = () => {
  console.log(infoModel1.value);
  const model = { ...infoModel1.value };
  model.BirthDate =
    infoModel1.value.BirthDate != null
      ? moment
          .from(infoModel1.value.BirthDate, "fa", "YYYY/M/D HH:mm:ss")
          .format("YYYY-M-D HH:mm:ss")
      : null;
  console.log(model);
  const tempModel = {
    Type: JSON.parse(localStorage.getItem("UserStore")).user.Type,
  };
  projectService
    .UserInfoCompletion(model)
    .then((res) => {
      userStore.user = { ...res.data, ...tempModel };
      router.push({ name: "home" });
      Notify.create({
        message: "با موفقیت ویرایش شد!",
        position: "top",
        timeout: 500,
        progress: true,
        color: "positive",
      });
      console.log(res);
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
    });
};
// const onReset = () => {
//   newPassword.value = null;
//   currentPassword.value = null;
//   confirmPassword.value = null;
// };
</script>
