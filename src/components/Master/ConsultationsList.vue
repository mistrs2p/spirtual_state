<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="لیست مشاوره ها"
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
              v-else-if="
                item.name == 'ReservedNextMeeting' || item.name == 'isExecuted'
              "
            >
              <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              />
            </span>
            <span v-else-if="item.name == 'operation'">
              <q-btn dense flat color="primary">فرم جلسه</q-btn>
              <q-btn dense flat color="negative">پایان جلسه</q-btn>
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
import projectService from "@/services/project.service";

import { ref } from "vue";
// import { Notify } from 'quasar';

const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetMasterConsultances()
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
    label: "جلسه",
    field: "MeetingTitle",
    // align: 'center',
  },
  {
    name: "From",
    label: "درخواست کننده",
    field: "From",
    // align: 'center',
  },
  {
    name: "Title",
    label: "عنوان",
    field: "Title",
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
    name: "ReservedNextMeeting",
    label: "رزرو جلسه بعد",
    field: "ReservedNextMeeting",
    // align: 'center',
  },
  {
    name: "operation",
    label: "عملیات",
    field: "operation",
    // align: 'center',
  },
];
</script>
<style lang="scss"></style>
