<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="مشاوره های من"
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
            <span
              v-else-if="item.name == 'isAccept' || item.name == 'isExecuted'"
            >
              <q-checkbox size="xs" v-model="props.row[item.field]" disable />
            </span>

            <span v-else-if="item.name == 'ReqStatus'">
              <q-chip
                :color="
                  props.row[item.field] == 3
                    ? 'green'
                    : props.row[item.field] == 5
                    ? 'orange'
                    : 'red'
                "
                text-color="white"
              >
                {{
                  props.row[item.field] == 3
                    ? "پرداخت موفق"
                    : props.row[item.field] == 5
                    ? "در انتظار پرداخت"
                    : "پرداخت ناموفق"
                }}
              </q-chip>
            </span>
            <span v-else>
              {{ props.row[item.field] }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
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
    .GetUserConsultanceRequests()
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
    // align: 'center',
  },
  {
    name: "MasterDisplayName",
    label: "استاد",
    field: "MasterDisplayName",
    // align: 'center',
  },
  {
    name: "MeetingTitle",
    label: "جلسه",
    field: "MeetingTitle",
    // align: 'center',
  },
  {
    name: "MasterMobileNumber",
    label: "شماره مشاور",
    field: "MasterMobileNumber",
    // align: 'center',
  },
  {
    name: "DateCreate",
    label: "تاریخ درخواست",
    field: "DateCreate",
    // align: 'center',
  },
  {
    name: "DateExecuted",
    label: "تاریخ انجام",
    field: "DateExecuted",
    // align: 'center',
  },
  {
    name: "isExecuted",
    label: "انجام شده",
    field: "isExecuted",
    // align: 'center',
  },
  {
    name: "isAccept",
    label: "تایید شده",
    field: "isAccept",
    // align: 'center',
  },
  {
    name: "ReqStatus",
    label: "وضعیت پرداخت",
    field: "ReqStatus",
    // align: 'center',
  },
];
</script>
<style lang="scss"></style>
