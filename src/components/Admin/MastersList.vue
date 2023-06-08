<template>
  <div class="col-12 q-px-md">
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
      <template v-slot:top>
        <div class="col-2 q-table__title">اساتید</div>
        <div>
          <q-btn dense color="primary" @click="handleAddMasterDialog" flat
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
            <span v-if="item.name == 'IsVisible'">
              <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              />
            </span>

            <span v-else-if="item.name == 'operation'" class="q-gutter-x-sm">
              <!-- <q-btn color="primary" @click="handleEdit = true" dense flat
                >ویرایش</q-btn
              > -->
              <q-btn
                color="primary"
                @click="
                  (operationData = { ...props.row }), (isEditDialog = true)
                "
                dense
                flat
                >ویرایش</q-btn
              >
              <q-btn
                color="negative"
                @click="
                  (operationData = { ...props.row }), (isOperationDialog = true)
                "
                dense
                flat
                >حذف</q-btn
              >

              <!-- <q-btn color="secondary" @click="handleDetel = true" dense flat
                >پیامک</q-btn
              > -->
              <!-- <q-checkbox
                size="xs"
                v-model="props.row[item.field]"
                :false-value="props.row[item.field] == null ? null : false"
                disable
              /> -->
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
  <q-dialog v-model="isEditDialog" persistent>
    <q-card>
      <!-- <q-card-section class="row items-center">
        <span class="q-ml-sm">ویرایش جلسه</span>
      </q-card-section> -->
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
                v-model="operationData.DisplayName"
                label="نام نمایشی"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'نام نمایشی باید ذکر شود',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.Name"
                label="نام"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'نام باید ذکر شود',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.Family"
                label="نام خانوادگی"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'نام خانوادگی باید ذکر شود',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                filled
                type="text"
                v-model="operationData.Tel"
                label="شماره تماس"
                lazy-rules
                :rules="[(val) => val.length > 0 || 'شماره تماس باید ذکر شود']"
              />
            </div>
            <div class="col-12">
              <q-select
                name="users"
                v-model="cUserID"
                :options="usersList"
                option-label="DisplayName"
                :option-value="'ID'"
                color="primary"
                filled
                clearable
                label="انتخاب مراجعه کننده"
                :rules="[(val) => val || 'مراجعه کننده باید ذکر شود']"
              />
            </div>

            <div class="col-12">
              <q-checkbox
                size="xs"
                v-model="operationData.IsVisible"
                label="قابلیت نمایش"
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
import { Notify } from "quasar";
import { ref, watch } from "vue";
// import { Notify } from 'quasar';
const isOperationDialog = ref(false);
const isEditDialog = ref(false);
// const operationData = ref(null);
const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetAllMastersList()
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

// const handleDelete = (evt) => {
//   projectService
//     .DeleteMaster(operationData.value.ID)
//     .then((res) => {
//       console.log(res);
//       Notify.create({
//         message: "با موفقیت حذف شد!",
//         position: "top",
//         timeout: 500,
//         progress: true,
//         color: "positive",
//       });
//       loadDataTable();
//     })
//     .catch((err) => {
//       console.log(err);
//       Notify.create({
//         message: "حذف استاد با خطا مواجه شد!",
//         position: "top",
//         timeout: 500,
//         progress: true,
//         color: "positive",
//       });
//     });
// };
const operationData = ref({
  DisplayName: null,
  Family: null,
  IsSendSMS: false,
  IsVisible: false,
  Name: null,
  Tel: null,
  UserName: null,
  cUserID: null,
});
const handleResetForm = () => {
  operationData.value = {
    DisplayName: null,
    Family: null,
    IsSendSMS: false,
    IsVisible: false,
    Name: null,
    Tel: null,
    UserName: null,
    cUserID: null,
  };
  cUserID.value = null;
};
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
const handleEdit = () => {
  console.log(true);
  const model = { ...operationData.value };
  model.cUserID = cUserID.value.ID;
  console.log(model);
  if (!isAdd.value) {
    projectService
      .EditMaster(model)
      .then((res) => {
        console.log(res);
        Notify.create({
          message: "با موفقیت ویرایش شد!",
          position: "top",
          timeout: 500,
          progress: true,
          color: "positive",
        });
        isEditDialog.value = false;
        loadDataTable();
      })
      .catch((err) => {
        console.log(err);
        Notify.create({
          message: err.response.data.Message,
          position: "top",
          timeout: 500,
          progress: true,
          color: "negative",
        });
      });
  } else {
    isAdd.value = false;
    delete model.UserName;
    projectService
      .AddMaster(model)
      .then((res) => {
        console.log(res);
        Notify.create({
          message: "با موفقیت اضافه شد!",
          position: "top",
          timeout: 500,
          progress: true,
          color: "positive",
        });
        isEditDialog.value = false;
        loadDataTable();
      })
      .catch((err) => {
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
const cUserID = ref(null);
watch(isEditDialog, (nVal) => {
  if (nVal) {
    const myFind = usersList.value.find(
      (el) => el.UserName == operationData.value.UserName
    );
    if (myFind) {
      cUserID.value = myFind;
      operationData.value.cUserID = myFind.ID;
    }

    console.log(myFind);
  }
});
const isAdd = ref(false);
const handleAddMasterDialog = () => {
  handleResetForm();
  isAdd.value = true;
  isEditDialog.value = true;
};
</script>
<style lang="scss"></style>
