<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-10">
      <q-table
        flat
        bordered
        title="مشاورها"
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
              <span v-if="item.name == 'IsVisible'">
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
    .GetAllMasters()
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
    field: "DisplayName",
    // align: 'center',
  },
  {
    name: "Name",
    label: "استاد",
    field: "Name",
    // align: 'center',
  },
  {
    name: "Family",
    label: "کد تخفیف",
    field: "Family",
    // align: 'center',
  },
  {
    name: "UserName",
    label: "درصد تخفیف",
    field: "UserName",
    // align: 'center',
  },
  {
    name: "Tel",
    label: "کاربر",
    field: "Tel",
    // align: 'center',
  },
  {
    name: "IsVisible",
    label: "وضعیت",
    field: "IsVisible",
    // align: 'center',
  },
];
</script>
<style lang="scss"></style>
