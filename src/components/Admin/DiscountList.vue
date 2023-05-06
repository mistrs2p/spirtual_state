<template>
  <div class="col-10">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="لیست تخفیف ها"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="deep-purple-14"
      :separator="'cell'"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="col-2 q-table__title">کد تخفیف</div>
        <div>
          <q-btn dense color="primary" @click="isDicountAddDialog = true" flat
            >اضافه کردن</q-btn
          >
        </div>
        <q-space />
      </template>
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
            <span v-if="item.name == 'isActive' || item.name == 'isVisible'">
              <q-checkbox size="xs" v-model="props.row[item.field]" disable />
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
  <!-- <q-dialog v-model="operationDialog" persistent>
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
  </q-dialog> -->
  <q-dialog v-model="isDicountAddDialog" persistent>
    <q-card>
      <q-form
        @submit="handleAddDiscount"
        @reset="handleResetForm"
        class="q-gutter-md"
      >
        <q-card-section class="row items-center">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="addDiscountModel.Title"
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
                v-model="addDiscountModel.Description"
                label="توضیحات"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="addDiscountModel.DiscountCode"
                label="کد تخفیف"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'کد تخفیف باید ذکر شود',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="number"
                v-model="addDiscountModel.DiscountPercent"
                label="درصد تخفیف"
                lazy-rules
                :rules="[
                  (val) => (val && val > 0) || 'درصد تخفیف باید ذکر شود',
                ]"
              />
            </div>
            <div class="col-12">
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
                :rules="[(val) => val || 'استاد باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="addDiscountModel.isActive"
                label="فعال بودن"
              />
            </div>
            <div class="col-12">
              <q-select
                name="users"
                v-model="user"
                :options="usersList"
                @update:model-value="handleClickUser"
                option-label="DisplayName"
                option-value="ID"
                color="primary"
                filled
                clearable
                label="انتخاب مراجعه کننده"
                :rules="[(val) => val || 'مراجعه کننده باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="number"
                v-model="addDiscountModel.CountToBeUser"
                label="تعداد استفاده"
                lazy-rules
                :rules="[
                  (val) => (val && val > 0) || 'تعداد استفاده باید ذکر شود',
                ]"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="left">
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
            <q-btn color="negative" v-close-popup>لغو</q-btn>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="operationDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">کد تخفیف حذف شود؟</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="تایید"
          color="primary"
          @click="handleDeleteDiscount"
          v-close-popup
        />
        <q-btn flat label="لغو" color="warning" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";

import { ref } from "vue";
import { Notify } from "quasar";
// import { Notify } from 'quasar';
const addDiscountModel = ref({
  Title: null,
  Description: null,
  DiscountCode: null,
  DiscountPercent: null,
  MasterID: null,
  isActive: false,
  CountToBeUser: null,
  cUserID: null,
});
const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetDiscountsList()
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

const operationDialog = ref(false);
const operationData = ref(null);

const columns = [
  {
    name: "name",
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
    name: "DiscountCode",
    label: "کد تخفیف",
    field: "DiscountCode",
    // align: 'center',
  },
  {
    name: "DiscountPercent",
    label: "درصد تخفیف",
    field: "DiscountPercent",
    // align: 'center',
  },
  {
    name: "User",
    label: "کاربر",
    field: "User",
    // align: 'center',
  },
  {
    name: "isActive",
    label: "وضعیت",
    field: "isActive",
    // align: 'center',
  },
  {
    name: "isVisible",
    label: "نمایش",
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
const isDicountAddDialog = ref(false);
const mastersList = ref([]);
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
const usersList = ref([]);

const handleGetUsers = () => {
  loading.value = true;
  projectService
    .GetUsersListAdmin()
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
const handleResetForm = () => {
  addDiscountModel.value = {
    Title: null,
    Description: null,
    DiscountCode: null,
    DiscountPercent: null,
    MasterID: null,
    isActive: false,
    CountToBeUser: null,
    cUserID: null,
  };
  user.value = null;
  master.value = null;
};
const master = ref(null);
const user = ref(null);
const handleClickMaster = (evt) => {
  if (evt == null) return;
  addDiscountModel.value.MasterID = evt.ID;
  console.log(evt);
};
const handleClickUser = (evt) => {
  if (evt == null) return;
  addDiscountModel.value.cUserID = evt.ID;
  console.log(evt);
};

const handleDeleteDiscount = () => {
  projectService
    .DeleteDiscountAdmin(operationData.value.ID)
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
    })
    .catch((err) => {
      console.log(err);
      Notify.create({
        message: "خطا!",
        position: "top",
        timeout: 500,
        progress: true,
        color: "negative",
      });
    });
};

const handleAddDiscount = () => {
  if (!isEdit.value) {
    const model = { ...addDiscountModel.value };
    delete model.cUserID;
    delete model.MasterID;
    projectService
      .AddDiscountAdmin(model)
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
        isDicountAddDialog.value = false;
        document.getElementById("resetBtn").click();
      })
      .catch((err) => {
        isDicountAddDialog.value = false;
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
    console.log(addDiscountModel.value);
    projectService
      .EditDiscount(addDiscountModel.value)
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
        isDicountAddDialog.value = false;
        isEdit.value = false;
        document.getElementById("resetBtn").click();
      })
      .catch((err) => {
        isDicountAddDialog.value = false;
        isEdit.value = false;

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

const isEdit = ref(false);

const handleEditClick = (evt) => {
  console.log(evt);
  addDiscountModel.value = { ...evt };
  const userM = usersList.value.find((el) => el.DisplayName == evt.User);
  user.value = userM;
  addDiscountModel.value.cUserID = user.value.ID;

  const masterM = mastersList.value.find(
    (el) => el.DisplayName.trim() == evt.Master.trim()
  );
  console.log(masterM);
  master.value = masterM;
  addDiscountModel.value.MasterID = masterM.ID;
  isDicountAddDialog.value = true;
  isEdit.value = true;
};
</script>
<style lang="scss"></style>
