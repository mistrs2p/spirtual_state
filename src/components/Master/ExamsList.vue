<template>
  <div class="col-12 q-px-md">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="لیست آزمون ها"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="deep-purple-14"
      :separator="'cell'"
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="item in columns"
            :key="item.name"
            :props="props"
            style="text-align: right !important"
          >
            {{ item.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="item in columns"
            :key="item.name"
            :props="props"
            style="text-align: right !important"
          >
            <span
              v-if="item.name == 'DateCreate' || item.name == 'DateExecuted'"
            >
              {{
                props.row[item.field] != null
                  ? new Date(props.row[item.field]).toLocaleTimeString("fa-IR")
                  : ""
              }}
              -
              {{
                props.row[item.field] != null
                  ? new Date(props.row[item.field]).toLocaleDateString("fa-IR")
                  : ""
              }}
            </span>
            <span v-else-if="item.name == 'isExecuted'">
              <q-checkbox
                size="xs"
                v-if="props.row.IsExecuted == null"
                v-model="props.row.IsExecuted"
                :false-value="null"
                disable
              />
              <q-checkbox
                size="xs"
                v-else
                v-model="props.row.IsExecuted"
                disable
              />
            </span>
            <span v-else-if="item.name == 'operation'">
              <span v-if="props.row.IsExecuted">
                <q-btn
                  dense
                  flat
                  :label="'نمایش'"
                  :color="'primary'"
                  @click="handleShowExam(props.row)"
                />
                <q-btn
                  flat
                  dense
                  label="نتیجه"
                  color="secondary"
                  @click="handleResultExam(props.row)"
                />
              </span>
            </span>
            <span v-else>
              {{ props.row[item.field] }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-inner-loading
      :showing="visibleLoader"
      label="لطفا منتظر بمانید..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
  <q-dialog
    v-model="isOperationDialog"
    full-width
    full-height
    style="position: relative"
    persistent
  >
    <FormG
      :formData="formData"
      :answers="answers"
      :examID="examID"
      formDisable
      forShow
      @closeDialog="(isOperationDialog = false), loadDataTable()"
    />
  </q-dialog>
  <q-dialog v-model="isResultShow" full-height>
    <q-card>
      <q-card-section>
        <h5>{{ resultData.UserDisplayName }}</h5>
      </q-card-section>
      <q-card-section style="direction: ltr">
        <div v-for="(value, key) of resultData" :key="key">
          <span v-if="key != 'UserDisplayName' && key != 'QuestionType'"
            >{{ key }}: {{ value }}</span
          >
        </div>
        <!-- {{ resultData }} -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "../../services/project.service";

import { ref } from "vue";
import { Notify } from "quasar";
import FormG from "@/components/FormG.vue";

const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetMasterExams()
    .then((res) => {
      console.log(res);
      rows.value = res.data;
      // options.value.pageCount = Math.ceil(res.data.length / itemsPerPage.value);
      loading.value = false;
    })
    .catch((err) => {
      // isLoading.value = false;
      console.log(err);
      loading.value = false;
    });
};
loadDataTable();
const columns = [
  {
    name: "name",
    label: "عنوان",
    field: "Title",
    align: "right",
  },
  {
    name: "User",
    label: "مراجعه کننده",
    field: "User",
    align: "right",
  },
  {
    name: "DateCreate",
    label: "تاریخ درخواست",
    field: "DateCreate",
    align: "right",
  },
  {
    name: "Master",
    label: "استاد",
    field: "Master",
    align: "right",
  },
  {
    name: "Question",
    label: "تست",
    field: "Question",
    align: "right",
  },
  {
    name: "isExecuted",
    label: "انجام شده",
    field: "isExecuted",
    align: "right",
  },
  { name: "operation", label: "عملیات", field: "operation", align: "right" },
];
const isOperationDialog = ref(false);
const visibleLoader = ref(false);
const formData = ref(null);
const answers = ref(null);
const examID = ref(null);
const handleShowExam = (evt) => {
  visibleLoader.value = true;
  examID.value = evt.ID;

  console.log(evt);
  projectService
    .UserGetQuestionItemsList(evt.ID)
    .then((res) => {
      formData.value = res.data;
      answers.value = evt.Answer;
      console.log(res);
      visibleLoader.value = false;
      isOperationDialog.value = true;
    })
    .catch((err) => {
      console.log(err);
      visibleLoader.value = false;
    });
};
const isResultShow = ref(false);
const resultData = ref(null);
const handleResultExam = (evt) => {
  visibleLoader.value = true;
  const model = {
    ExamID: evt.ID,
    Answers: evt.Answer,
  };
  console.log(model);
  projectService
    .ExamsCalculateResult(model)
    .then((res) => {
      console.log(res);
      resultData.value = res.data;
      // handleResultExamDecorate();
      visibleLoader.value = false;
      isResultShow.value = true;
    })
    .catch((err) => {
      console.log(err);
      visibleLoader.value = false;
    });
  console.log(evt);
};
// const handleResultExamDecorate = () => {
//   console.log(true);
//   for (let k in resultData.value) {
//   }
// };
</script>
