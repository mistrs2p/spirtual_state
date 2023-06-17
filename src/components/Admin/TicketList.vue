<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="لیست تیکت ها"
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
      <template v-slot:top>
        <div class="col-2 q-table__title">لیست تیکت ها</div>
        <div>
          <q-btn
            dense
            color="primary"
            @click="(isDialog = true), (isAdd = true)"
            flat
            >اضافه کردن تیکت</q-btn
          >
        </div>
        <q-space />
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
            <span v-else-if="item.name == 'createdBy'">
              {{ props.row[item.field].DisplayName }}
            </span>

            <span v-else-if="item.name == 'State'">
              <q-chip
                :color="props.row[item.field] == 1 ? 'primary' : 'success'"
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
                @click="handleEdit(props.row)"
              />
              <!-- disable -->
              <q-btn
                flat
                dense
                label="حذف"
                color="negative"
                @click="
                  (isDialog = true),
                    (isDelete = true),
                    (requestModle.ID = props.row.ID)
                "
              />
              <!-- disable -->
            </span>
            <span v-else>
              {{ props.row[item.field] }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="isDialog" full-width>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >{{ isAdd ? "اضافه کردن" : isEdit ? "ویرایش" : "حذف" }} تیکت</span
        >
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div v-if="!isDelete">
            <q-input
              filled
              type="text"
              v-model="requestModle.Subject"
              label="عنوان"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'عنوان باید ذکر شود',
              ]"
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
          </div>
          <h6 v-else>از حذف تیکت اطمینان دارید؟</h6>
          <div>
            <q-btn label="انجام عملیات" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
      <q-inner-loading
        :showing="visibleLoader"
        label="لطفا منتظر بمانید..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "../../services/project.service";
import { Notify } from "quasar";

import { ref, watch } from "vue";
const requestModle = ref({
  Subject: null,
  Question: null,
  Category: null,
});
const isDialog = ref(false);
const isAdd = ref(false);
const isEdit = ref(false);
const isDelete = ref(false);
const visibleLoader = ref(false);
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
    name: "createdBy",
    label: "کاربر سازنده",
    field: "createdBy",
    // align: 'center',
  },
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
  visibleLoader.value = true;
  console.log(evt);
  if (isAdd.value) {
    requestModle.value.Category = ticketCat.value.value;
    projectService
      .SendTicket(requestModle.value)
      .then((res) => {
        console.log(res);
        Notify.create({
          message: "تیکت با موفقیت اضافه شد!",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "positive",
        });

        resetForm();
        visibleLoader.value = false;
        getTicketsData();
      })
      .catch((err) => {
        console.log(err);
        Notify.create({
          message: "خطا در اضافه تیکت!",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "negative",
        });
        visibleLoader.value = false;
        isDialog.value = false;
      });
  } else if (isEdit.value) {
    projectService
      .EditTicket(requestModle.value)
      .then((res) => {
        console.log(res);
        Notify.create({
          message: "تیکت با موفقیت ویرایش شد!",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "positive",
        });

        visibleLoader.value = false;
        getTicketsData();
        isDialog.value = false;
      })
      .catch((err) => {
        console.log(err);
        Notify.create({
          message: "خطا در ویرایش تیکت!",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "negative",
        });
        visibleLoader.value = false;
      });
  } else {
    projectService
      .DeleteTicket(requestModle.value.ID)
      .then((res) => {
        console.log(res);
        Notify.create({
          message: "تیکت با موفقیت حذف شد!",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "positive",
        });

        visibleLoader.value = false;
        getTicketsData();
        isDialog.value = false;
      })
      .catch((err) => {
        console.log(err);
        Notify.create({
          message: "خطا در حذف تیکت!",
          position: "top",
          timeout: 1000,
          progress: true,
          color: "negative",
        });
        visibleLoader.value = false;
      });
  }
  console.log(requestModle.value);
};

watch(isDialog, (nVal) => {
  if (!nVal) {
    resetForm();
    isAdd.value = false;
    isEdit.value = false;
    isDelete.value = false;
  }
});
const handleEdit = (evt) => {
  console.log(evt);
  isEdit.value = true;
  isDialog.value = true;
  ticketCat.value = selectOption.value.find((el) => el.value == evt.Category);
  requestModle.value.Category = evt.Category;
  requestModle.value.Subject = evt.Subject;
  requestModle.value.Question = evt.Question;
  requestModle.value.ID = evt.ID;
};
const getTicketsData = async () => {
  loading.value = true;
  let data = [];
  await projectService.GetUsersList().then((res) => {
    console.log(res);
    data = res.data;
  });
  projectService
    .GetTicketsList()
    .then((res) => {
      console.log(res);
      rows.value = res.data;
      rows.value.forEach((el) => {
        el.createdBy = data.find((f) => f.ID == el.CreatedByID);
        console.log(el);
      });
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
const resetForm = () => {
  requestModle.value = {
    Subject: null,
    Question: null,
    Category: null,
  };
  ticketCat.value = null;
};
</script>
