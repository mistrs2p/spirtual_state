<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="آزمون ها"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="deep-purple-14"
      :separator="'cell'"
      :wrap-cells="true"
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <div class="col-2 q-table__title">آزمون ها</div>
        <div>
          <q-btn dense color="primary" @click="isOperationDialog = true" flat
            >اضافه کردن</q-btn
          >
          <!-- @click="handleExamDialog(), (isAdd = true)" -->
        </div>
        <q-space />
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
              v-if="item.name == 'IsRealAzmoon' || item.name == 'IsVisible'"
            >
              <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              />
            </span>
            <span v-else-if="item.name == 'QType'">
              <span v-for="(key, index) of QType" :key="index">
                <span v-if="props.row[item.field] == key">
                  {{ index }}
                </span>
              </span>
            </span>
            <span v-else-if="item.name == 'Help'" class="ellipsis-3-lines">
              {{ props.row[item.field] }}
              <q-tooltip max-width="500px">{{
                props.row[item.field]
              }}</q-tooltip>
            </span>
            <span v-else>
              {{ props.row[item.field] }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="isOperationDialog">
    <q-card>
      <q-card-section>
        <QuestionInsert />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";
import QuestionInsert from "@/components/Helper/QuestionInsert.vue";
import { ref } from "vue";
// import { Notify } from 'quasar';

const rows = ref([]);
const loading = ref(false);
const QType = {
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
};
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetQuestionsList()
    .then((res) => {
      console.log(res);
      rows.value = res.data;
      loading.value = false;
      // options.value.pageCount = Math.ceil(res.data.length / itemsPerPage.value);
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
    label: "نام آزمون",
    field: "Name",
    // align: 'center',
  },
  {
    name: "Discribtion",
    label: "توضیحات",
    field: "Discribtion",
    // align: 'center',
  },
  {
    name: "Help",
    label: "راهنما",
    field: "Help",
    // align: 'center',
  },
  {
    name: "QType",
    label: "نوع تست",
    field: "QType",
    // align: 'center',
  },
  {
    name: "IsRealAzmoon",
    label: "آزمون واقعی",
    field: "IsRealAzmoon",
    // align: 'center',
  },

  {
    name: "IsVisible",
    label: "قابلیت نمایش",
    field: "IsVisible",
    // align: 'center',
  },
  {
    name: "Price",
    label: "هزینه آزمون",
    field: "Price",
    // align: 'center',
  },
];

const isOperationDialog = ref(false);
</script>
<style lang="scss"></style>
