<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="نمایش جلسات"
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
                item.name == 'DateCreate' ||
                item.name == 'StartTime' ||
                item.name == 'LastRequestDate'
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
              v-else-if="
                item.name == 'IsReservable' ||
                item.name == 'IsReasign' ||
                item.name == 'isVisible'
              "
            >
              <q-checkbox size="xs" v-model="props.row[item.field]" disable />
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
    .GetMasterMeetingsForMaster()
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
    label: "ردیف",
    field: "Order",
    // align: 'center',
  },
  {
    name: "Title",
    label: "عنوان",
    field: "Title",
    // align: 'center',
  },
  {
    name: "Cost",
    label: "هزینه",
    field: "Cost",
    // align: 'center',
  },
  {
    name: "Duration",
    label: "مدت زمان",
    field: "Duration",
    // align: 'center',
  },
  {
    name: "isVisible",
    label: "قابلیت نمایش",
    field: "isVisible",
    // align: 'center',
  },
  {
    name: "IsReservable",
    label: "قابلیت رزرو",
    field: "IsReservable",
    // align: 'center',
  },
  {
    name: "IsReasign",
    label: "رزرو شده",
    field: "IsReasign",
    // align: 'center',
  },
  {
    name: "StartTime",
    label: "تاریخ شروع",
    field: "StartTime",
    // align: 'center',
  },
  {
    name: "DateCreate",
    label: "تاریخ ایجاد",
    field: "DateCreate",
    // align: 'center',
  },
  {
    name: "LastRequestDate",
    label: "تاریخ آخرین درخواست",
    field: "LastRequestDate",
    // align: 'center',
  },
  // {
  //   name: "operation",
  //   label: "عملیات",
  //   field: "operation",
  // },
];
</script>
<style lang="scss"></style>
