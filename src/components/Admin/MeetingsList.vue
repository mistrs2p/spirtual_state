<template>
  <div class="col-12 q-px-md">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="جلسات"
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
        <div class="col-2 q-table__title">جلسات</div>
        <div>
          <q-btn dense color="primary" @click="handleAddMeetingDialog" flat
            >اضافه کردن</q-btn
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
            <span v-if="item.name == 'DateCreate' || item.name == 'StartTime'">
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
              v-else-if="item.name == 'IsReasign' || item.name == 'isVisible'"
            >
              <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              />
            </span>
            <span v-else-if="item.name == 'Master'">
              {{ props.row[item.field].DisplayName }}
            </span>

            <span v-else-if="item.name == 'operation'" class="q-gutter-x-sm">
              <!-- <q-btn color="primary" @click="handleEdit = true" dense flat
                >ویرایش</q-btn
              > -->
              <q-btn
                color="primary"
                @click="handleEditClick(props.row)"
                dense
                flat
                >ویرایش</q-btn
              >
              <q-btn
                color="negative"
                @click="(operationData = props.row), (operationDialog = true)"
                dense
                flat
                >حذف</q-btn
              >
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
        <span class="q-ml-sm">جلسه حذف شود؟</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="تایید"
          color="primary"
          @click="handleDeleteMeeting"
          v-close-popup
        />
        <q-btn flat label="لغو" color="warning" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="isEditMeetingDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-form
          @submit="handleEditMeeting"
          @reset="handleResetForm"
          class="q-gutter-md"
        >
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.Title"
                label="عنوان"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'عنوان باید ذکر شود',
                ]"
              />
            </div>
            <div class="col-6">
              <q-input filled v-model="dateTime.date">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="dateTime.date" calendar="persian">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <q-input filled v-model="dateTime.time">
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="dateTime.time" mask="HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-4">
              <q-input
                filled
                type="number"
                v-model="operationData.Order"
                label="ردیف"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'ردیف باید ذکر شود']"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                filled
                type="number"
                v-model="operationData.Cost"
                label="مبلغ جلسه"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'مبلغ جلسه باید ذکر شود']"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                filled
                type="number"
                v-model="operationData.Duration"
                label="مدت جلسه"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'مدت جلسه باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-select
                name="masters"
                v-model="master"
                :options="mastersList"
                option-label="DisplayName"
                option-value="ID"
                color="primary"
                filled
                clearable
                label="انتخاب استاد"
                :rules="[(val) => val || 'استاد باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="operationData.isVisible"
                label="قابلیت نمایش"
              />
              <q-checkbox
                size="xs"
                v-model="operationData.IsReservable"
                label="قابلیت رزرو"
              />
            </div>
          </div>
          <div class="q-gutter-x-sm">
            <q-card-actions align="left">
              <q-btn label="ثبت" type="submit" color="primary" />
              <q-btn
                label="پاک کردن فرم"
                id="resetBtn"
                type="reset"
                color="warning"
              />
              <q-btn label="لغو" v-close-popup color="negative" />
            </q-card-actions>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";
import moment from "jalali-moment";

import { ref } from "vue";
import { Notify } from "quasar";

const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetAllMeetingsList()
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
    name: "Master",
    label: "استاد",
    field: "Master",
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
  {
    name: "isVisible",
    label: "قابلیت نمایش",
    field: "isVisible",
    // align: 'center',
  },
  {
    name: "operation",
    label: "عملیات",
    field: "operation",
    // align: 'center',
  },
];

const operationDialog = ref(false);
const operationData = ref({
  Title: null,
  Order: null,
  StartTime: null,
  Cost: null,
  Duration: null,
  isVisible: true,
  IsReservable: false,
});
const handleDeleteMeeting = () => {
  projectService
    .DeleteMeeting(operationData.value.ID)
    .then((res) => {
      console.log(res);
      loadDataTable();
      Notify.create({
        message: "با موفقیت اضافه شد!",
        position: "top",
        timeout: 500,
        progress: true,
        color: "positive",
      });
      operationDialog.value = false;
      // ;
    })
    .catch((err) => {
      operationDialog.value = false;
      console.log(err);
      Notify.create({
        message: err.response.data.Message,
        position: "top",
        timeout: 500,
        progress: true,
        color: "negative",
      });
    });
};

const dateTime = ref({
  date: null,
  time: null,
});
const isEditMeetingDialog = ref(false);
const handleResetForm = () => {
  operationData.value = {
    Title: null,
    Order: null,
    Cost: null,
    Duration: null,
    isVisible: true,
    IsReservable: false,
    StartTime: null,
  };
  dateTime.value = {
    date: null,
    time: null,
  };
  master.value = null;
};
const mastersList = ref([]);
const master = ref(null);
// const handleEditMeeting = () => {};
const handleEditClick = (evt) => {
  console.log(evt);
  operationData.value = { ...evt };
  master.value = { ...operationData.value.Master };
  delete operationData.value.Master;
  const dateTimeEdit = operationData.value.StartTime.split("T");
  dateTime.value.date = moment(dateTimeEdit[0], "YYYY-MM-DD")
    .locale("fa")
    .format("YYYY/MM/DD");
  dateTime.value.time = dateTimeEdit[1];
  isEditMeetingDialog.value = true;
};

const handleGetMasters = () => {
  projectService
    .Masters()
    .then((res) => {
      console.log(res);
      mastersList.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
handleGetMasters();

const handleEditMeeting = () => {
  const model = { ...operationData.value };
  model.MasterID = master.value.ID;
  model.Duration = parseFloat(model.Duration);
  model.Cost = parseFloat(model.Cost);
  model.Order = parseFloat(model.Order);
  console.log(model);

  if (!isAdd.value) {
    projectService
      .EditMeeting(model)
      .then((res) => {
        console.log(res);
        loadDataTable();
        Notify.create({
          message: "با موفقیت ویرایش شد!",
          position: "top",
          timeout: 500,
          progress: true,
          color: "positive",
        });
        isEditMeetingDialog.value = false;
      })
      .catch((err) => {
        isEditMeetingDialog.value = false;
        console.log(err);
        Notify.create({
          message: "خطا!",
          position: "top",
          timeout: 500,
          progress: true,
          color: "negative",
        });
      });
  } else {
    isAdd.value = false;
    projectService
      .AddMeetingAdmin(model)
      .then((res) => {
        console.log(res);
        loadDataTable();
        Notify.create({
          message: "با موفقیت ویرایش شد!",
          position: "top",
          timeout: 500,
          progress: true,
          color: "positive",
        });
        isEditMeetingDialog.value = false;
      })
      .catch((err) => {
        isEditMeetingDialog.value = false;
        console.log(err);
        Notify.create({
          message: "خطا!",
          position: "top",
          timeout: 500,
          progress: true,
          color: "negative",
        });
      });
  }
};
const isAdd = ref(false);
const handleAddMeetingDialog = () => {
  isAdd.value = true;
  isEditMeetingDialog.value = true;
};
</script>
<style lang="scss"></style>
