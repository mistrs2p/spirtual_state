<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="لیست کاربران"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="deep-purple-14"
      :separator="'cell'"
      :loading="loading"
      :filter="filter"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input v-model="filter" dense debounce="300" placeholder="جستجو">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
            <span v-if="item.name == 'operation'">
              <q-input
                v-model="props.row.modelValue"
                dense
                placeholder="پیام..."
              >
                <template v-slot:append>
                  <q-btn
                    icon="chevron_left"
                    dense
                    rounded
                    color="primary"
                    @click="handleSendSMS(props.row)"
                  >
                    <q-tooltip>ارسال</q-tooltip></q-btn
                  >
                </template></q-input
              >
              {{ props.row.modelValue }}
            </span>
            <span v-else>
              {{ props.row[item.field] }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-inner-loading :showing="smsLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import projectService from "../../services/project.service";
import { Notify } from "quasar";
import interfaces from "@/interfaces";
import { ref } from "vue";

const filter = ref(null);

const loading = ref(false);
const columns = [
  {
    name: "DisplayName",
    label: "نام نمایشی",
    field: "DisplayName",
    // align: 'center',
  },
  {
    name: "UserName",
    label: "نام کاربری",
    field: "UserName",
    // align: 'center',
  },

  {
    name: "operation",
    label: "عملیات",
    field: "operation",
    // align: 'center',
  },
];
const rows = ref([]);

const getUsersData = async () => {
  loading.value = true;

  projectService
    .GetUsersList()
    .then((res) => {
      console.log(res);
      rows.value = res.data.map((el) => ({ ...el, modelValue: "" }));
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      Notify.create({
        message: "خطا در دریافت کاربر!",
        position: "top",
        timeout: 1000,
        progress: true,
        color: "negative",
      });
      loading.value = false;
    });
};
getUsersData();

const smsLoading = ref(false);
const handleSendSMS = (model: object) => {
  if (model.modelValue) {
    smsLoading.value = true;
    // const model = {}
    const reqModel: interfaces.sendSMS = {
      Text: model.modelValue,
      Mobile: model.UserName,
    };
    projectService
      .SendSMS(reqModel)
      .then((res) => {
        console.log(res);
        Notify.create({
          message: "پیام با موفقیت ارسال شد!",
          position: "top",
          timeout: 2000,
          progress: true,
          color: "positive",
        });
        smsLoading.value = false;
        model.modelValue = "";
      })
      .catch((err) => {
        console.log(err);
        Notify.create({
          message: "خطا در ارسال پیام به کاربر!",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "negative",
        });
        smsLoading.value = false;
      });
  } else {
    Notify.create({
      message: "لطفا پیام مناسب را وارد نمایید!",
      position: "top",
      timeout: 1000,
      progress: true,
      color: "negative",
    });
  }
};
</script>
