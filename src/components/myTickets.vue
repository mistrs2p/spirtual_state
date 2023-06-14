<template>
  <div class="col-10">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        type="text"
        v-model="requestModle.Subject"
        label="عنوان"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'عنوان باید ذکر شود']"
      />
      <q-input
        filled
        type="textarea"
        v-model="requestModle.Question"
        label="سوال"
        :rules="[(val) => (val && val.length > 0) || 'سوال باید ذکر شود']"
      />
      <q-select
        name="masters"
        v-model="ticketCat"
        :options="selectOption"
        color="primary"
        filled
        clearable
        label="انتخاب بخش"
        :rules="[(val) => val != null || 'بخش مورد نظر باید ذکر شود']"
      />
      <div>
        <q-btn label="ارسال تیکت" type="submit" color="primary" />
      </div>
    </q-form>
    <hr />
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="تیکت های من"
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
            <span v-if="item.name == 'Category'">
              {{
                selectOption.find((el) => el.value == props.row[item.field])
                  ?.label
              }}
            </span>

            <span v-else-if="item.name == 'State'">
              <q-chip
                :color="props.row[item.field] == 1 ? 'green' : 'negative'"
                text-color="white"
              >
                {{ props.row[item.field] == 1 ? "باز" : "بسته" }}
              </q-chip>
            </span>
            <span v-else-if="item.name == 'operation'">
              <q-btn
                flat
                dense
                label="ویرایش"
                color="primary"
                @click="handleEdit(props.row.ID)"
                disable
              />
              <q-btn
                flat
                dense
                label="حذف"
                color="negative"
                @click="handleEdit(props.row.ID)"
                disable
              />
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
import { Notify } from "quasar";

import { ref } from "vue";
const requestModle = ref({
  Subject: null,
  Question: null,
  Category: null,
});
const TicketCategory = {
  Consultation: 1,
  Exam: 2,
  Master: 3,
  Payment: 4,
  Account: 5,
};
const loading = ref(false);
const columns = [
  {
    name: "Subject",
    label: "عنوان",
    field: "Subject",
    // align: 'center',
  },
  {
    name: "Question",
    label: "سوال",
    field: "Question",
    // align: 'center',
  },
  {
    name: "Answer",
    label: "پاسخ",
    field: "Answer",
    // align: 'center',
  },
  {
    name: "Category",
    label: "بخش",
    field: "Category",
    // align: 'center',
  },
  {
    name: "State",
    label: "وضعیت تیکت",
    field: "State",
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
const ticketCat = ref(null);
const selectOption = ref([
  { label: "Consultation", value: 1 },
  { label: "Exam", value: 2 },
  { label: "Master", value: 3 },
  { label: "Payment", value: 4 },
  { label: "Account", value: 5 },
]);

const onSubmit = (evt) => {
  console.log(evt);
  console.log(requestModle.value);
  requestModle.value.Category = ticketCat.value.value;
  projectService
    .SendTicket(requestModle.value)
    .then((res) => {
      console.log(res);
      Notify.create({
        message: "تیکت با موفقیت ارسال شد!",
        position: "top",
        timeout: 1000,
        progress: true,
        color: "positive",
      });
    })
    .catch((err) => {
      console.log(err);
      Notify.create({
        message: "خطا در ارسال تیکت!",
        position: "top",
        timeout: 1000,
        progress: true,
        color: "negative",
      });
    });
};

const getTicketsData = () => {
  loading.value = true;

  projectService
    .GetUserTickets()
    .then((res) => {
      console.log(res);
      rows.value = res.data;
      loading.value = false;
      // Notify.create({
      //   message: "تیکت با موفقیت ارسال شد!",
      //   position: "top",
      //   timeout: 1000,
      //   progress: true,
      //   color: "positive",
      // });
    })
    .catch((err) => {
      console.log(err);
      Notify.create({
        message: "خطا در دریافت تیکت!",
        position: "top",
        timeout: 1000,
        progress: true,
        color: "negative",
      });
      loading.value = false;
    });
};
getTicketsData();

const handleEdit = (evt) => {
  console.log(evt);
};
</script>
