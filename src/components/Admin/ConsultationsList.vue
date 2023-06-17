<template>
  <div class="col-12 q-px-md">
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
      <template v-slot:top>
        <div class="col-2 q-table__title">مشاوره ها</div>
        <div>
          <q-btn
            dense
            color="primary"
            @click="handleConsultDialog(), (isAdd = true)"
            flat
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
              <!-- <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              /> -->
              <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              />
            </span>
            <span v-else-if="item.name == 'operation'">
              <q-btn
                color="primary"
                @click="handleEditData(props.row)"
                dense
                flat
                >ویرایش</q-btn
              >
              <q-btn
                color="negative"
                @click="
                  (operationData = props.row),
                    (isDelete = true),
                    (isOperationDialog = true)
                "
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
  <q-dialog v-model="isOperationDialog" persistent>
    <q-card v-if="isAdd || isEdit">
      <!-- <q-card-section class="row items-center">
        <span class="q-ml-sm">ویرایش جلسه</span>
      </q-card-section> -->
      <q-card-section>
        <q-form
          @submit="handleConsultOperation"
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
            <div class="col-12">
              <q-input
                filled
                type="textarea"
                v-model="operationData.Description"
                label="توضیحات"
                lazy-rules
              />
            </div>
            <div class="col-12" v-if="isAdd">
              <q-select
                name="masters"
                v-model="master"
                :options="mastersList"
                @update:model-value="handleClickMaster"
                option-label="DisplayName"
                option-value="ID"
                color="primary"
                filled
                clearable
                label="انتخاب استاد"
              />
            </div>
            <div class="col-12">
              <q-select
                name="meeting"
                v-model="meeting"
                :options="meetingsList"
                @update:model-value="handleClickMeeting"
                option-label="Title"
                option-value="ID"
                color="primary"
                filled
                clearable
                label="انتخاب جلسه"
              />
            </div>
            <div class="col-12">
              <q-select
                name="user"
                v-model="user"
                :options="usersList"
                @update:model-value="handleClickUser"
                option-label="DisplayName"
                option-value="ID"
                color="primary"
                filled
                clearable
                label="انتخاب کاربر"
              />
            </div>

            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="operationData.ReservedNextMeeting"
                label="رزرو همین ساعت برای هفته آینده"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.DiscountCode"
                label="کد تخفیف"
                lazy-rules
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="number"
                v-model="operationData.Money"
                label="مبلغ (هزینه)"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'مبلغ باید ذکر شود']"
              />
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-12">تاریخ درخواست</div>
              <div class="col-6">
                <DatePicker
                  :disabled="false"
                  v-model="dateTimeCreate.date"
                  type="date"
                />
                <!-- <q-input filled v-model="dateTimeCreate.date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="dateTimeCreate.date"
                          calendar="persian"
                        >
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
                </q-input> -->
              </div>
              <div class="col-6">
                <DatePicker
                  :disabled="false"
                  v-model="dateTimeCreate.time"
                  type="time"
                />

                <!-- <q-input filled v-model="dateTimeCreate.time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="dateTimeCreate.time"
                          mask="HH:mm"
                          format24h
                        >
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
                </q-input> -->
              </div>
              <div class="col-12">تاریخ پرداخت</div>

              <div class="col-6">
                <DatePicker
                  :disabled="false"
                  v-model="dateTimePay.date"
                  type="date"
                />

                <!-- <q-input filled v-model="dateTimePay.date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="dateTimePay.date" calendar="persian">
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
                </q-input> -->
              </div>
              <div class="col-6">
                <DatePicker
                  :disabled="false"
                  v-model="dateTimePay.time"
                  type="time"
                />

                <!-- <q-input filled v-model="dateTimePay.time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="dateTimePay.time"
                          mask="HH:mm"
                          format24h
                        >
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
                </q-input> -->
              </div>
              <div class="col-12">تاریخ انجام</div>

              <div class="col-6">
                <DatePicker
                  :disabled="false"
                  v-model="dateTimeExecute.date"
                  type="date"
                />

                <!-- <q-input filled v-model="dateTimeExecute.date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="dateTimeExecute.date"
                          calendar="persian"
                        >
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
                </q-input> -->
              </div>
              <div class="col-6">
                <DatePicker
                  :disabled="false"
                  v-model="dateTimeExecute.time"
                  type="time"
                />

                <!-- <q-input filled v-model="dateTimeExecute.time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="dateTimeExecute.time"
                          mask="HH:mm"
                          format24h
                        >
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
                </q-input> -->
              </div>
            </div>
            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="operationData.IsAccept"
                label="تایید شده"
              />
            </div>
            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="operationData.IsPayed"
                label="تایید شده"
              />
            </div>
            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="operationData.IsExecuted"
                label="انجام شده"
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
              <q-btn flat label="لغو" color="warning" v-close-popup />
            </q-card-actions>
            <!-- <q-btn
            label="خالی کردن"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          /> -->
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card v-if="isDelete">
      <q-card-section class="row items-center">
        <span class="q-ml-sm">مشاوره حذف شود؟</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="تایید"
          color="primary"
          @click="handleConsultOperation"
        />
        <q-btn flat label="لغو" color="warning" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";
import moment from "jalali-moment";

import { ref, watch } from "vue";
import { Notify } from "quasar";
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
  {
    name: "operation",
    label: "عملیات",
    field: "operation",
    // align: 'center',
  },
];
const user = ref(null);
const usersList = ref([]);
const handleGetUsers = () => {
  loading.value = true;
  projectService
    .GetUsersList()
    .then((res) => {
      console.log(res);
      usersList.value = res.data;
      // options.value.pageCount = Math.ceil(res.data.length / itemsPerPage.value);
      loading.value = false;
    })
    .catch((err) => {
      // isLoading.value = false;
      console.log(err);
      loading.value = false;
    });
};
handleGetUsers();
const operationData = ref({
  Title: null,
  Description: null,
  DiscountCode: null,
  MeetingID: null,
  ReservedNextMeeting: false,
  cUserID: null,
});
const isOperationDialog = ref(false);
const isAdd = ref(false);
const isDelete = ref(false);
const isEdit = ref(false);

const master = ref(null);
const mastersList = ref([]);
const meeting = ref(null);
const meetingsList = ref([]);

const handleConsultDialog = () => {
  isOperationDialog.value = true;
};
const handleConsultOperation = () => {
  console.log(operationData.value);
  if (isAdd.value) {
    // alert(true);
    projectService
      .AddConsultanceRequest(operationData.value)
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
        handleResetForm();
        isOperationDialog.value = false;
      })
      .catch((err) => {
        isOperationDialog.value = false;
        console.log(err);
        Notify.create({
          message: err.response.data.Message,
          position: "top",
          timeout: 500,
          progress: true,
          color: "negative",
        });
      });
  }
  if (isDelete.value) {
    projectService
      .DeleteConsultanceRequest(operationData.value.ID)
      .then((res) => {
        console.log(res);
        loadDataTable();
        Notify.create({
          message: "با موفقیت حذف شد!",
          position: "top",
          timeout: 500,
          progress: true,
          color: "positive",
        });
        handleResetForm();
        isOperationDialog.value = false;
      })
      .catch((err) => {
        isOperationDialog.value = false;
        console.log(err);
        Notify.create({
          message: err.response.data.Message,
          position: "top",
          timeout: 500,
          progress: true,
          color: "negative",
        });
      });
  }
  if (isEdit.value) {
    operationData.value.RequestTitle = operationData.value.Title;
    delete operationData.value.Title;
    // dateTimeCreate.value.date != null
    //   ? handleGoergeanDate(operationData.value.DateCreate)
    //   : operationData.value.DateCreate;
    // dateTimeExecute.value.date != null
    //   ? handleGoergeanDate(operationData.value.DateExecuted)
    //   : operationData.value.DateExecuted;
    // dateTimePay.value.date != null
    //   ? handleGoergeanDate(operationData.value.DateAcceptOrReject)
    //   : operationData.value.DateAcceptOrReject;

    dateTimeCreate.value.date != null
      ? (operationData.value.DateCreate = handleGoergeanDate(
          dateTimeCreate.value
        ))
      : new Date();
    dateTimeExecute.value.date != null
      ? (operationData.value.DateExecuted = handleGoergeanDate(
          dateTimeExecute.value
        ))
      : null;
    dateTimePay.value.date != null
      ? (operationData.value.DateAcceptOrReject = handleGoergeanDate(
          dateTimePay.value
        ))
      : null;

    console.log(operationData.value);

    projectService
      .EditConsultanceRequest(operationData.value)
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
        handleResetForm();
        isOperationDialog.value = false;
      })
      .catch((err) => {
        isOperationDialog.value = false;
        console.log(err);
        Notify.create({
          message: err.response.data.Message,
          position: "top",
          timeout: 500,
          progress: true,
          color: "negative",
        });
      });
  }
};
const handleResetForm = () => {
  operationData.value = {
    Title: null,
    Description: null,
    DiscountCode: null,
    MeetingID: null,
    ReservedNextMeeting: false,
    cUserID: null,
  };

  master.value = null;
  meeting.value = null;
  meetingsList.value = [];
  mastersList.value = [];
  user.value = null;
  isAdd.value = false;
  isDelete.value = false;
  isEdit.value = false;
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

const handleClickMaster = (evt) => {
  console.log(evt);
  if (evt == null) {
    meetingsList.value = [];
    return;
  }
  // operationData.value.ID = evt.ID;
  projectService
    .GetMasterMeetings(evt.ID)
    .then((res) => {
      console.log(res);
      meetingsList.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleClickMeeting = (evt) => {
  console.log(evt);
  operationData.value.MeetingID = evt.ID;
};

const handleClickUser = (evt) => {
  operationData.value.cUserID = evt.ID;
  console.log(evt);
};

const dateTimeCreate = ref({
  date: null,
  time: null,
});
const dateTimePay = ref({
  date: null,
  time: null,
});
const dateTimeExecute = ref({
  date: null,
  time: null,
});
watch(isOperationDialog, (nVal) => {
  if (!nVal) {
    handleResetForm();
  }
  if (isAdd.value) {
    handleGetMasters();
  }
  if (isEdit.value) {
    projectService
      .GetAllMeetingsList()
      .then((res) => {
        console.log(res);
        meetingsList.value = res.data;
        meeting.value = meetingsList.value.find(
          (el) => el.ID == operationData.value.MeetingID
        );
        user.value = usersList.value.find(
          (el) => el.ID == operationData.value.cUserID
        );
        // options.value.pageCount = Math.ceil(res.data.length / itemsPerPage.value);
      })
      .catch((err) => {
        // isLoading.value = false;
        console.log(err);
      });
    console.log(operationData.value);
    if (operationData.value.DateCreate != null) {
      dateTimeCreate.value = handlePersianDate(operationData.value.DateCreate);
    }
    if (operationData.value.DateAcceptOrReject != null) {
      dateTimePay.value = handlePersianDate(
        operationData.value.DateAcceptOrReject
      );
    }
    if (operationData.value.DateExecuted != null) {
      dateTimeExecute.value = handlePersianDate(
        operationData.value.DateExecuted
      );
    }
  }
});
const handlePersianDate = (data) => {
  const dateTime = data.split("T");
  console.log(dateTime);
  return {
    date: moment(dateTime[0], "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD"),
    time: dateTime[1],
  };
};
const handleGoergeanDate = (data) => {
  console.log(data);
  if (data.date == null) return;
  return (
    moment
      .from(`${data.date} ${data.time}`, "fa", "YYYY/M/D HH:mm:ss")
      // .from(`${data}`, "fa", "YYYY/M/D HH:mm:ss")
      .format("YYYY-M-D HH:mm:ss")
  );
};
const handleEditData = (evt) => {
  console.log(evt);
  operationData.value = { ...evt };
  isEdit.value = true;
  isOperationDialog.value = true;
  operationData.value.Title = evt.RequestTitle;
  delete operationData.value.RequestTitle;
  delete operationData.value.MeetingTitle;
  delete operationData.value.isVisible;
  delete operationData.value.UserName;
};
</script>
<style lang="scss"></style>
