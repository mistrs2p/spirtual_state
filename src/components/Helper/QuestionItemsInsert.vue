<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="col-12">
    <q-card>
      <q-card-section>
        <q-form
          @submit="handleExamOperation"
          @reset="handleResetForm"
          class="q-gutter-md"
        >
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                filled
                type="number"
                v-model="operationData.UnicNumber"
                label="کد سوال"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'کد سوال باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="number"
                v-model="operationData.Order"
                label="اولویت نمایش"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'کد سوال باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="number"
                v-model="operationData.Row"
                label="ردیف"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'ردیف باید ذکر شود']"
              />
            </div>
            ------
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.TitleClass"
                label="کلاس عنوان"
                lazy-rules
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.AnswerClass"
                label="کلاس پاسخ"
                lazy-rules
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="textarea"
                v-model="operationData.AnswerClass"
                label="کلاس پاسخ"
                lazy-rules
              />
            </div>
            <div class="col-12" v-for="(item, index) in 10" :key="index">
              <q-input
                filled
                type="text"
                v-model="operationData.[`Choice${item}`]"
                :label="`گزینه ${item}`"
                lazy-rules
              />
            </div>
            <!-- <div class="q-gutter-x-sm">
        <q-card-actions align="left">
          <q-btn label="ثبت" type="submit" color="primary" />
          <q-btn
            label="پاک کردن فرم"
            id="resetBtn"
            type="reset"
            color="warning"
          />
          <q-btn flat label="لغو" color="warning" v-close-popup />
        </q-card-actions> -->
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import projectService from "../../services/project.service";

import { ref } from "vue";
// import { Notify } from 'quasar';
const operationData = ref({
  ID: null,
  UnicNumber: null,
  Order: null,
  Row: null,
  QIType: null,
  AnswerType: null,
  TitleClass: null,
  AnswerClass: null,
  Title: null,
  Choice1: null,
  Choice2: null,
  Choice3: null,
  Choice4: null,
  Choice5: null,
  Choice6: null,
  Choice7: null,
  Choice8: null,
  Choice9: null,
  Choice10: null,
  QuestionName: null,
});
const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetUserConsultanceRequests()
    .then((res) => {
      console.log(res);
      rows.value = res.data;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
// loadDataTable();
</script>
<style lang="scss"></style>
