<template>
  <div class="col-8">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row q-col-gutter-y-md">
        <div class="col-12">
          <q-select
            name="meeting"
            v-model="question"
            :options="questionsList"
            @update:model-value="(evt) => (requestModle.QuestionID = evt.ID)"
            option-label="Name"
            option-value="ID"
            color="primary"
            filled
            clearable
            label="انتخاب تست"
          />
        </div>
        <div class="col-12">
          <q-select
            name="masters"
            v-model="master"
            :options="mastersList"
            @update:model-value="
              (evt) => (requestModle.MasterCUserID = evt.cUserID)
            "
            option-label="DisplayName"
            option-value="ID"
            color="primary"
            filled
            clearable
            label="انتخاب استاد"
          />
        </div>
        <div class="col-12">
          <q-input
            filled
            type="textarea"
            v-model="requestModle.Description"
            label="توضیحات"
          />
        </div>

        <div>
          <q-btn
            :disable="visibleLoader"
            label="ثبت و پرداخت"
            type="submit"
            color="primary"
          />
          <!-- <q-btn
              label="خالی کردن"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            /> -->
        </div>
      </div>
    </q-form>
    <q-inner-loading
      :showing="visibleLoader"
      label="لطفا منتظر بمانید..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
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
            <q-item-section>مشاور: {{ master.DisplayName }}</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section
              >توضیحات: {{ requestModle.Description }}</q-item-section
            >
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>قیمت: {{ previewData.Cost }}</q-item-section>
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
  QuestionID: null,
  MasterCUserID: null,
  Description: null,
});
const master = ref(null);
const mastersList = ref([]);
const question = ref(null);
const questionsList = ref([]);
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
const handleGetQuestions = () => {
  projectService
    .QuestionsList()
    .then((res) => {
      console.log(res);
      questionsList.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
handleGetQuestions();
// const handleClickMaster = (evt) => {
//   master.value = evt;
//   console.log(evt);
// };
// const handleClickQuestion = (evt) => {
//   console.log(evt);
//   question.value = evt;
// };
const visibleLoader = ref(false);
const onSubmit = () => {
  visibleLoader.value = true;
  console.log(requestModle.value);
  projectService
    .ExamRequest(requestModle.value)
    .then((res) => {
      isCheckBeforePay.value = true;
      console.log(res);
      previewData.value = res.data;
      visibleLoader.value = false;
    })
    .catch((err) => {
      console.log(err);
      visibleLoader.value = false;
    });
};
const handlePayPage = () => {
  const model = {
    ExamID: previewData.value?.ID,
    OnlinePayment: true,
  };
  projectService
    .ExamPayment(model)
    .then((res) => {
      console.log(res);
      window.open(res.data.ZarrinPayURL, "_self");
      isCheckBeforePay.value = false;
      handleResetForm();
    })
    .catch((err) => {
      console.log(err);
      isCheckBeforePay.value = false;
    });
};
const handleResetForm = () => {
  requestModle.value = {
    QuestionID: null,
    MasterCUserID: null,
    Description: null,
  };
  master.value = null;
  question.value = null;
};
</script>
