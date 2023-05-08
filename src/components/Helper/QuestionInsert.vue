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
                type="text"
                v-model="operationData.Name"
                label="نام تست"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'نام تست باید ذکر شود',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="textarea"
                v-model="operationData.Discribtion"
                label="توضیحات"
                lazy-rules
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="textarea"
                v-model="operationData.Help"
                label="راهنما"
                lazy-rules
              />
            </div>
            <div class="col-12">
              <q-select
                name="masters"
                v-model="qTypeModel"
                @update:model-value="handleClickQType"
                :options="qTypeOptions"
                option-label="name"
                option-value="id"
                color="primary"
                filled
                clearable
                label="نوع آزمون"
                :rules="[(val) => val || 'نوع آزمون باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-checkbox
                size="xs"
                name="next_week_reserve"
                v-model="operationData.IsVisible"
                label="قابلیت نمایش"
              />
              <q-checkbox
                size="xs"
                name="next_week_reserve"
                v-model="operationData.IsRealAzmoon"
                label="آزمون واقعی"
              />
              <q-checkbox
                size="xs"
                name="next_week_reserve"
                v-model="operationData.IsForOstad"
                label="برای استاد"
              />
              <q-checkbox
                size="xs"
                name="next_week_reserve"
                v-model="operationData.IsTaklif"
                label="تکلیف"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="number"
                v-model="operationData.Price"
                label="هزینه تست"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'هزینه تست باید ذکر شود']"
              />
            </div>
            <q-card-actions align="left">
              <q-btn label="ثبت" type="submit" color="primary" />
              <q-btn
                label="پاک کردن فرم"
                id="resetBtn"
                type="reset"
                color="warning"
              />
              <q-btn flat label="لغو" color="negative" v-close-popup />
            </q-card-actions>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import projectService from "../../services/project.service";

import { ref, computed } from "vue";
// import { Notify } from 'quasar';
const operationData = ref({
  ID: null,
  Name: null,
  Discribtion: null,
  Help: null,
  QType: null,
  IsTaklif: false,
  IsForOstad: false,
  IsRealAzmoon: false,
  IsVisible: false,
  Price: null,
});
const QType = ref({
  Cattell: 1,
  Raven: 2,
  InfoForm: 3,
  MeetingSummary: 4,
  Karbarg: 5,
  Millon: 6,
  CattellStress: 7,
  Yellbrown: 8,
  MBTI: 9,
  SCL90: 10,
  Gardner: 11,
  Haland: 12,
  BeckDep: 13,
  Yang90: 14,
});
const qTypeModel = ref(null);
const qTypeOptions = computed(() => {
  let data = [];
  for (let k in QType.value) {
    data.push({
      id: QType.value[k],
      name: k,
    });
  }
  return data;
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
const handleClickQType = (evt) => {
  if (!evt) {
    operationData.value.QType = null;
  } else {
    operationData.value.QType = evt.id;
  }
};
const handleResetForm = () => {
  operationData.value = {
    ID: null,
    Name: null,
    Discribtion: null,
    Help: null,
    QType: null,
    IsTaklif: false,
    IsForOstad: false,
    IsRealAzmoon: false,
    IsVisible: false,
    Price: null,
  };
  qTypeModel.value = null;
};
</script>
<style lang="scss"></style>
