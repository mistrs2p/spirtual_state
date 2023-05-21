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
            <div class="col-12">
              <q-select
                name="tests"
                v-model="QITypeMolde"
                :options="QITypeList"
                option-label="name"
                option-value="id"
                color="primary"
                filled
                clearable
                label="نوع آیتم آزمون"
                :rules="[(val) => val || 'نوع آیتم آزمون باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-select
                name="tests"
                v-model="AnswerTypeModel"
                :options="AnswerTypeList"
                option-label="name"
                option-value="id"
                color="primary"
                filled
                clearable
                label="نوع پاسخ"
                :rules="[(val) => val || 'نوع پاسخ باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.TitleClass"
                label="کلاس عنوان"
                lazy-rules
              />
            </div>
            <!-- <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.AnswerClass"
                label="کلاس پاسخ"
                lazy-rules
              />
            </div> -->
            <div class="col-12">
              <q-input
                filled
                type="textarea"
                v-model="operationData.AnswerClass"
                label="کلاس پاسخ"
                lazy-rules
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.Title"
                label="عنوان"
                lazy-rules
              />
            </div>
            <div class="col-12" v-for="(item, index) in 10" :key="index">
              <q-input
                filled
                type="text"
                :label="`گزینه ${item}`"
                lazy-rules
                v-model="operationData[`Choice${item}`]"
              />
            </div>
            <div class="col-12">
              <!-- @update:model-value="handleClickQType" -->
              <q-select
                name="tests"
                v-model="test"
                :options="rows"
                option-label="Name"
                option-value="ID"
                color="primary"
                filled
                clearable
                label="آزمون"
                :rules="[(val) => val || 'آزمون باید ذکر شود']"
              />
            </div>

            <div class="q-gutter-x-sm">
              <q-card-actions align="left">
                <q-btn label="ثبت" type="submit" color="primary" />
                <q-btn
                  label="پاک کردن فرم"
                  id="resetBtn"
                  type="reset"
                  color="warning"
                />
                <q-btn flat label="لغو" color="warning" v-close-popup />
              </q-card-actions>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import projectService from "../../services/project.service";

import { ref, defineProps, computed } from "vue";

// const emit = defineEmits(["dialogStatus"]);
const props = defineProps({
  compData: {
    isAdd: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    dataM: {
      type: Object,
    },
  },
});
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
const AnswerTypeModel = ref(null);
const AnswerType = {
  Choice: 0,
  Text: 1,
  None: 2,
};
const QITypeMolde = ref(null);
const QItemType = {
  Choice: 0,
  TextAnswer: 1,
  Title: 2,
  Body: 3,
  Section: 4,
  multiTextAnswer: 5,
  newLine: 6,
  startRow: 7,
  endRow: 8,
  hr: 9,
  Legend: 10,
};
const QITypeList = computed(() => {
  let data = [];
  for (let k in QItemType) {
    data.push({
      id: QItemType[k],
      name: k,
    });
  }
  return data;
});
const AnswerTypeList = computed(() => {
  let data = [];
  for (let k in AnswerType) {
    data.push({
      id: AnswerType[k],
      name: k,
    });
  }
  return data;
});
const test = ref(null);
const rows = ref([]);
const loading = ref(false);
const loadQuestionItems = () => {
  loading.value = true;
  projectService
    .QuestionsList()
    .then((res) => {
      console.log(res);
      rows.value = res.data;
      setProps();
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
loadQuestionItems();
const handleResetForm = () => {
  operationData.value = {
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
  };
  AnswerTypeModel.value = null;
  QITypeMolde.value = null;
};

const handleExamOperation = () => {
  const model = { ...operationData.value };
  model.AnswerType = AnswerTypeModel.value.id;
  model.QIType = QITypeMolde.value.id;
  model.QuestionName = operationData.value.Title;
  console.log(model);
};
const setProps = () => {
  if (!props.compData.isAdd) {
    operationData.value = { ...props.compData.dataM };
    AnswerTypeModel.value = AnswerTypeList.value.find(
      (el) => el.id == operationData.value.AnswerType
    );
    QITypeMolde.value = QITypeList.value.find(
      (el) => el.id == operationData.value.QIType
    );
    console.log(props.compData.dataM);
    test.value = rows.value.find((el) => el.ID == operationData.value.QID);
  }
};
</script>
<style lang="scss"></style>
