<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-10">
      <q-table
        flat
        bordered
        title="آزمون های من"
        :rows="rows"
        :columns="columns"
        row-key="name"
        dark
        color="amber"
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
                    ? new Date(props.row[item.field]).toLocaleTimeString(
                        "fa-IR"
                      )
                    : ""
                }}
                -
                {{
                  props.row[item.field] != null
                    ? new Date(props.row[item.field]).toLocaleDateString(
                        "fa-IR"
                      )
                    : ""
                }}
              </span>
              <span
                v-else-if="item.name == 'isExecuted' || item.name == 'isPayed'"
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
              <span v-else-if="item.name == 'test'">
                {{ props.row.Title.split("-")[0] }}
              </span>
              <span v-else>
                {{ props.row[item.field] }}
              </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import projectService from "../services/project.service";

import { ref } from "vue";
// import { Notify } from 'quasar';

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
  { name: "test", label: "تست", field: "test", align: "right" },
  { name: "operation", label: "عملیات", field: "operation", align: "right" },
  {
    name: "DateStart",
    label: "تاریخ شروع",
    field: "DateStart",
    align: "right",
  },
  { name: "DateEnd", label: "تاریخ پایان", field: "DateEnd", align: "right" },
  { name: "isPayed", label: "پرداخت شده", field: "isPayed", align: "right" },
  {
    name: "DatePayed",
    label: "تاریخ پرداخت",
    field: "DatePayed",
    align: "right",
  },
  {
    name: "isExecuted",
    label: "انجام شده",
    field: "isExecuted",
    align: "right",
  },
];
</script>
