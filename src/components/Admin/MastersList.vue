<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="مشاورها"
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
            <span v-if="item.name == 'IsVisible'">
              <q-checkbox size="xs" v-model="props.row[item.field]" disable />
            </span>

            <span v-else-if="item.name == 'operation'" class="q-gutter-x-sm">
              <!-- <q-btn color="primary" @click="handleEdit = true" dense flat
                >ویرایش</q-btn
              > -->
              <q-btn
                color="negative"
                @click="(operationData = props.row), (operationDialog = true)"
                dense
                flat
                >حذف</q-btn
              >
              <!-- <q-btn color="secondary" @click="handleDetel = true" dense flat
                >پیامک</q-btn
              > -->
              <!-- <q-checkbox size="xs" v-model="props.row[item.field]" disable /> -->
            </span>
            <span v-else>
              {{ props.row[item.field] }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="operationDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">استاد حذف شود؟</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="تایید"
          color="primary"
          @click="handleDelete"
          v-close-popup
        />
        <q-btn flat label="لغو" color="warning" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";
import { Notify } from "quasar";
import { ref } from "vue";
// import { Notify } from 'quasar';
const operationDialog = ref(false);
const operationData = ref(null);
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
  {
    name: "operation",
    label: "عملیات",
    field: "operation",
    // align: 'center',
  },
];

const handleDelete = (evt) => {
  projectService
    .DeleteMasterAdmin(operationData.value.ID)
    .then((res) => {
      console.log(res);
      Notify.create({
        message: "با موفقیت حذف شد!",
        position: "top",
        timeout: 500,
        progress: true,
        color: "positive",
      });
      loadDataTable();
    })
    .catch((err) => {
      console.log(err);
      Notify.create({
        message: "حذف استاد با خطا مواجه شد!",
        position: "top",
        timeout: 500,
        progress: true,
        color: "positive",
      });
    });
};
</script>
<style lang="scss"></style>
