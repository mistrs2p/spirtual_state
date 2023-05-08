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
              <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              />
            </span>
            <span v-else-if="item.name == 'operation'">
              <q-btn
                dense
                color="primary"
                flat
                @click="(isEditDialog = true), (editData = { ...props.row })"
                >ویرایش</q-btn
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
  <q-dialog v-model="isEditDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">ویرایش جلسه</span>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="handleEdit"
          @reset="handleResetForm"
          class="q-gutter-md"
        >
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="editData.Title"
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
                v-model="editData.Order"
                label="ردیف"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'ردیف باید ذکر شود']"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                filled
                type="number"
                v-model="editData.Cost"
                label="مبلغ جلسه"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'مبلغ جلسه باید ذکر شود']"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                filled
                type="number"
                v-model="editData.Duration"
                label="مدت جلسه"
                lazy-rules
                :rules="[(val) => (val && val > 0) || 'مدت جلسه باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="editData.isVisible"
                label="قابلیت نمایش"
              />
              <q-checkbox
                size="xs"
                v-model="editData.IsReservable"
                label="قابلیت رزرو"
              />
            </div>
          </div>
          <div class="q-gutter-x-sm">
            <q-btn label="ثبت" type="submit" color="primary" />
            <q-btn
              label="پاک کردن فرم"
              id="resetBtn"
              type="reset"
              color="warning"
            />
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
      <q-card-actions align="right">
        <q-btn
          flat
          label="تایید"
          color="primary"
          @click="handleEdit"
          v-close-popup
        />
        <q-btn flat label="لغو" color="warning" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";

import { ref, computed, watch } from "vue";
import { Notify } from "quasar";
import moment from "jalali-moment";

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
  {
    name: "operation",
    label: "عملیات",
    field: "operation",
  },
];

const editData = ref({
  Title: null,
  Order: null,
  StartTime: null,
  Cost: null,
  Duration: null,
  isVisible: true,
  IsReservable: false,
});
const dateTime = ref({
  date: null,
  time: null,
});
const isEditDialog = ref(false);
const handleEdit = () => {
  console.log(true);
  const model = { ...editData.value };
  model.Order = parseFloat(editData.value.Order);
  model.Duration = parseFloat(editData.value.Duration);
  model.Cost = parseFloat(editData.value.Cost);
  model.StartTime = moment
    .from(
      `${dateTime.value.date} ${dateTime.value.time}`,
      "fa",
      "YYYY/M/D HH:mm:ss"
    )
    .format("YYYY-M-D HH:mm:ss");

  console.log(model);
  projectService
    .EditMasterMeeting(model)
    .then((res) => {
      console.log(res);
      Notify.create({
        message: "با موفقیت ویرایش شد!",
        position: "top",
        timeout: 500,
        progress: true,
        color: "positive",
      });
    })
    .catch((err) => {
      console.log(err);
      Notify.create({
        message: "خطا",
        position: "top",
        timeout: 500,
        progress: true,
        color: "negative",
      });
    });
};
watch(dateTime, (nVal, oVal) => {
  console.log(nVal, oVal);
});
watch(isEditDialog, (nVal, oVal) => {
  if (!nVal) {
    editData.value = {
      Title: null,
      Order: null,
      StartTime: null,
      Cost: null,
      Duration: null,
      isVisible: true,
      IsReservable: false,
    };
  } else {
    const dateTimeEdit = editData.value.StartTime.split("T");
    dateTime.value.date = moment(dateTimeEdit[0], "YYYY-MM-DD")
      .locale("fa")
      .format("YYYY/MM/DD");
    dateTime.value.time = dateTimeEdit[1];
    console.log(dateTimeEdit);
  }
});
const handleResetForm = () => {
  editData.value = {
    Title: null,
    Order: null,
    StartTime: null,
    Cost: null,
    Duration: null,
    isVisible: true,
    IsReservable: false,
  };
};
</script>
<style lang="scss"></style>
