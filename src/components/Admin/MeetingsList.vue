<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-10">
      <q-table
        flat
        bordered
        title="جلسات"
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
                v-if="item.name == 'DateCreate' || item.name == 'StartTime'"
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
              <span v-else-if="item.name == 'IsReasign'">
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
  </q-page>
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
    .GetAllMeetings()
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
    name: "Mastrer",
    label: "استاد",
    field: "Mastrer",
    // align: 'center',
  },
  {
    name: "DateCreate",
    label: "تاریخ ایجاد",
    field: "DateCreate",
    // align: 'center',
  },
  {
    name: "StartTime",
    label: "زمان جلسه",
    field: "StartTime",
    // align: 'center',
  },
  {
    name: "Cost",
    label: "مبلغ جلسه",
    field: "Cost",
    // align: 'center',
  },
  {
    name: "IsReasign",
    label: "رزرو شده",
    field: "IsReasign",
    // align: 'center',
  },
];
</script>
<style lang="scss"></style>
