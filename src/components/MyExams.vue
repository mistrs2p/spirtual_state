<template>
  <div class="col-12 q-px-md">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="آزمون های من"
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
              v-if="
                item.name == 'DateStart' ||
                item.name == 'DateEnd' ||
                item.name == 'DatePayed'
              "
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
            <span
              v-else-if="item.name == 'IsExecuted' || item.name == 'IsPayed'"
            >
              <q-checkbox
                size="xs"
                v-if="props.row[item.field] == null"
                v-model="props.row[item.field]"
                :false-value="null"
                disable
              />
              <q-checkbox
                size="xs"
                v-else
                v-model="props.row[item.field]"
                disable
              />
            </span>
            <span v-else-if="item.name == 'operation'">
              <!-- <q-btn dense flat label="حذف" color="negative" /> -->
              <q-btn
                v-if="props.row.IsPayed && !props.row.IsExecuted"
                dense
                flat
                :label="props.row.Answers != null ? 'ادامه' : 'شروع '"
                :color="props.row.IsExecuted ? 'positive' : 'primary'"
                @click="handleGetExamForm(props.row)"
              />
              <q-btn
                v-else-if="!props.row.IsPayed"
                flat
                dense
                label="پرداخت"
                color="secondary"
                @click="handlePay(props.row.ID)"
              />
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
      @closeDialog="(isOperationDialog = false), loadDataTable()"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "../services/project.service";
import FormG from "@/components/FormG.vue";
import { ref } from "vue";
// import { Notify } from 'quasar';

const examID = ref(null);
const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetUserExams()
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
  { name: "Question", label: "تست", field: "Question", align: "right" },
  // { name: "operation", label: "عملیات", field: "operation", align: "right" },
  {
    name: "DateStart",
    label: "تاریخ شروع",
    field: "DateStart",
    align: "right",
  },
  { name: "DateEnd", label: "تاریخ پایان", field: "DateEnd", align: "right" },
  { name: "IsPayed", label: "پرداخت شده", field: "IsPayed", align: "right" },
  {
    name: "DatePayed",
    label: "تاریخ پرداخت",
    field: "DatePayed",
    align: "right",
  },

  {
    name: "IsExecuted",
    label: "انجام شده",
    field: "IsExecuted",
    align: "right",
  },
  {
    name: "operation",
    label: "عملیات",
    field: "operation",
    align: "right",
  },
];
const formData = ref(null);
const answers = ref(null);
const visibleLoader = ref(false);
const handleGetExamForm = (data) => {
  visibleLoader.value = true;
  console.log(data);
  examID.value = data.ID;
  // if (!data.IsExecuted) {
  // alert(data.IsExecuted);
  if (data.IsExecuted) {
    // alert(data.ID);
    projectService
      .ExamResult(data.ID)
      .then((res) => {
        // formData.value = res.data;
        // isOperationDialog.value = true;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    projectService
      .UserGetQuestionItemsList(data.ID)
      .then((res) => {
        formData.value = res.data;
        answers.value = data.Answers;
        isOperationDialog.value = true;
        console.log(res);
        visibleLoader.value = false;
      })
      .catch((err) => {
        console.log(err);
        visibleLoader.value = false;
      });
  }
  // } else {
  //   alert(true);
  // }
};

const isOperationDialog = ref(false);

const handlePay = (id) => {
  visibleLoader.value = true;

  const model = {
    ExamID: id,
    OnlinePayment: true,
  };
  projectService
    .ExamPayment(model)
    .then((res) => {
      console.log(res);
      window.open(res.data.ZarrinPayURL, "_self");
      visibleLoader.value = false;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
