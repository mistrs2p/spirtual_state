<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="مشاوره ها"
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
                item.name == 'DateExecuted' ||
                item.name == 'DateAcceptOrReject'
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
                item.name == 'IsAccept' ||
                item.name == 'IsPayed' ||
                item.name == 'IsExecuted'
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
const loading = ref(false);
const rows = ref([]);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetConsultanceRequestList()
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
    label: "عنوان",
    field: "RequestTitle",
    // align: 'center',
  },
  {
    name: "UserName",
    label: "نام درخواست دهنده",
    field: "UserName",
    // align: 'center',
  },
  {
    name: "MeetingTitle",
    label: "جلسه",
    field: "MeetingTitle",
    // align: 'center',
  },
  {
    name: "DateCreate",
    label: "تاریخ درخواست",
    field: "DateCreate",
    // align: 'center',
  },
  {
    name: "IsAccept",
    label: "تایید شده",
    field: "IsAccept",
    // align: 'center',
  },

  {
    name: "Money",
    label: "هزینه واریزی",
    field: "Money",
    // align: 'center',
  },
  {
    name: "IsPayed",
    label: "پرداخت شده",
    field: "IsPayed",
    // align: 'center',
  },
  {
    name: "IsExecuted",
    label: "واریز شده",
    field: "IsExecuted",
    // align: 'center',
  },
  {
    name: "UserMobile",
    label: "شماره",
    field: "UserMobile",
    // align: 'center',
  },
];
</script>
<style lang="scss"></style>
