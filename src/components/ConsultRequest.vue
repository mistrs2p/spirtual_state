<template>
  <div class="col-8">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        type="text"
        v-model="requestModle.Title"
        label="عنوان"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'عنوان باید ذکر شود']"
      />
      <q-input
        filled
        type="textarea"
        v-model="requestModle.Description"
        label="توضیحات"
      />
      <q-select
        name="masters"
        v-model="master"
        :options="mastersList"
        @update:model-value="handleClickMaster"
        option-label="DisplayName"
        option-value="ID"
        color="primary"
        filled
        clearable
        label="انتخاب استاد"
      />
      <q-select
        name="meeting"
        v-model="meeting"
        :options="meetingsList"
        @update:model-value="handleClickMeeting"
        option-label="Title"
        option-value="ID"
        color="primary"
        filled
        clearable
        label="انتخاب جلسه"
      />
      <q-input
        filled
        type="text"
        v-model="requestModle.DiscountCode"
        label="کد تخفیف"
      />
      <q-checkbox
        size="xs"
        name="next_week_reserve"
        v-model="requestModle.ReservedNextMeeting"
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
  <q-dialog v-model="isCheckBeforePay">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">بررسی</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>عنوان: {{ previewData.Title }}</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section
              >توضیحات: {{ previewData.Description }}</q-item-section
            >
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>هزینه جلسه: {{ previewData.Money }}</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section
              >نام استاد: {{ previewData.MasterName }}</q-item-section
            >
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section
              >تاریخ جلسه: {{ previewData.MeetingTitle }}</q-item-section
            >
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section
              >هزینه قبل از اعمال تخفیف:
              {{ previewData.MoneyBeforDiscount }}</q-item-section
            >
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="left" class="bg-white text-teal">
        <q-btn flat label="پرداخت" color="primary" @click="handlePayPage" />
        <q-btn flat label="لغو" v-close-popup color="warning" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { Notify } from 'quasar';
import projectService from "../services/project.service.js";
const requestModle = ref({
  ID: null,
  Title: null,
  Description: null,
  DiscountCode: null,
  MeetingID: null,
  ReservedNextMeeting: false,
});
const master = ref(null);
const mastersList = ref([]);
const meeting = ref(null);
const meetingsList = ref([]);
const isCheckBeforePay = ref(false);
const previewData = ref(null);
const handleGetMasters = () => {
  projectService
    .Masters()
    .then((res) => {
      console.log(res);
      mastersList.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
handleGetMasters();

const handleClickMaster = (evt) => {
  console.log(evt);
  if (evt == null) {
    meetingsList.value = [];
    return;
  }
  requestModle.value.ID = evt.ID;
  projectService
    .GetMasterMeetings(evt.ID)
    .then((res) => {
      console.log(res);
      meetingsList.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleClickMeeting = (evt) => {
  console.log(evt);
  requestModle.value.MeetingID = evt.ID;
};
const onSubmit = () => {
  projectService
    .ConsultanceRequest(requestModle.value)
    .then((res) => {
      console.log(res);
      previewData.value = res.data;
      isCheckBeforePay.value = true;
    })
    .catch((err) => {
      console.log(err);
    });
};
const handlePayPage = () => {
  const model = {
    RequestID: previewData.value?.ID,
    OnlinePayment: true,
  };
  projectService
    .ConsultancePayment(model)
    .then((res) => {
      console.log(res);
      window.open(res.data.ZarrinPayURL, "_self");
      isCheckBeforePay.value = false;
    })
    .catch((err) => {
      console.log(err);
      isCheckBeforePay.value = false;
    });
};
</script>
