<template>
  <div class="col-12 q-px-md">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      map-options
      flat
      bordered
      title="آزمون"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="deep-purple-14"
      :separator="'cell'"
      :loading="loading"
      :wrap-cells="true"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <div class="col-2 q-table__title">آزمون</div>
        <div>
          <q-btn
            dense
            color="primary"
            @click="
              handleExamDialog(),
                (isAdd = true),
                (isEdit = false),
                (isDelete = false)
            "
            flat
            >اضافه کردن</q-btn
          >
        </div>
        <q-space />

        <q-select
          name="masters"
          v-model="questionItem"
          :options="questionItemsList"
          @update:model-value="handleClickQuestionItem"
          option-label="Name"
          option-value="ID"
          color="primary"
          filled
          dense
          options-dense
          label="انتخاب نوع آزمون"
          style="width: 300px"
        >
          <template v-slot:prepend>
            <q-icon name="quiz"> </q-icon>
          </template>
        </q-select>
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
            :auto-width="true"
          >
            <span v-if="item.name == 'AnswerType'">
              <span v-for="(key, index) of AnswerType" :key="index">
                <span v-if="props.row[item.field] == key">
                  {{ index }}
                </span>
              </span>
            </span>
            <span v-else-if="item.name == 'QIType'">
              <span v-for="(key, index) of QItemType" :key="index">
                <span v-if="props.row[item.field] == key">
                  {{ index }}
                </span>
              </span>
            </span>
            <span
              v-else-if="item.name == 'Title' || item.name.startsWith('Choice')"
              class="ellipsis-3-lines"
            >
              {{ props.row[item.field] }}
              <q-tooltip max-width="500px">{{
                props.row[item.field]
              }}</q-tooltip>
            </span>
            <span v-else-if="item.name == 'operation'" class="q-gutter-x-sm">
              <!-- <q-btn color="primary" @click="handleEdit = true" dense flat
                >ویرایش</q-btn
              > -->
              <q-btn
                color="primary"
                @click="
                  (operationData = { ...props.row }),
                    (isOperationDialog = true),
                    (isEdit = true),
                    (isDelete = false),
                    (isAdd = false)
                "
                dense
                flat
                >ویرایش</q-btn
              >
              <q-btn
                color="negative"
                @click="
                  (operationData = { ...props.row }),
                    (isOperationDialog = true),
                    (isEdit = false),
                    (isDelete = true),
                    (isAdd = false)
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
  <q-dialog v-model="isOperationDialog">
    <q-card>
      <q-card-section>
        <QuestionItemsInsert :compData="dialogData" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";
import QuestionItemsInsert from "@/components/Helper/QuestionItemsInsert.vue";
import { ref, computed } from "vue";
// import { Notify } from 'quasar';

const rows = ref([]);
const loading = ref(false);
const AnswerType = {
  Choice: 0,
  Text: 1,
  None: 2,
};
const QItemType = {
  Choice: 0,
  TextAnswer: 1,
  Title: 2,
  Body: 3,
  Section: 4,
  multiTextAnswer: 5,
  newLine: 6,
  startRow: 7,
  endRow: 8,
  hr: 9,
  Legend: 10,
};
const loadDataTable = (id) => {
  loading.value = true;
  projectService
    .AdminGetQuestionItemsList(id)
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
// loadDataTable();
const columns = [
  {
    name: "name",
    label: "شمارنده",
    field: "ID",
    // align: 'center',
  },
  {
    name: "UnicNumber",
    label: "کد سوال",
    field: "UnicNumber",
    // align: 'center',
  },
  {
    name: "Order",
    label: "اولویت نمایش",
    field: "Order",
    // align: 'center',
  },
  {
    name: "QIType",
    label: "نوع آیتم آزمون",
    field: "QIType",
    // align: 'center',
  },
  {
    name: "AnswerType",
    label: "نوع پاسخ",
    field: "AnswerType",
    // align: 'center',
  },

  {
    name: "TitleClass",
    label: "عنوان کلاس",
    field: "TitleClass",
    // align: 'center',
  },
  {
    name: "AnswerClass",
    label: "کلاس پاسخ",
    field: "AnswerClass",
    // align: 'center',
  },
  {
    name: "Title",
    label: "آزمون",
    field: "Title",
    // align: 'center',
  },
  {
    name: "Choice1",
    label: "گزینه 1",
    field: "Choice1",
    // align: 'center',
  },
  {
    name: "Choice2",
    label: "گزینه 2",
    field: "Choice2",
    // align: 'center',
  },
  {
    name: "Choice3",
    label: "گزینه 3",
    field: "Choice3",
    // align: 'center',
  },
  {
    name: "Choice4",
    label: "گزینه 4",
    field: "Choice4",
    // align: 'center',
  },
  {
    name: "Choice5",
    label: "گزینه 5",
    field: "Choice5",
    // align: 'center',
  },
  {
    name: "Choice6",
    label: "گزینه 6",
    field: "Choice6",
    // align: 'center',
  },
  {
    name: "Choice7",
    label: "گزینه 7",
    field: "Choice7",
    // align: 'center',
  },
  {
    name: "Choice8",
    label: "گزینه 8",
    field: "Choice8",
    // align: 'center',
  },
  {
    name: "Choice9",
    label: "گزینه 9",
    field: "Choice9",
    // align: 'center',
  },
  {
    name: "Choice10",
    label: "گزینه 10",
    field: "Choice10",
    // align: 'center',
  },
  {
    name: "QuestionName",
    label: "نام آزمون",
    field: "QuestionName",
    // align: 'center',
  },
  {
    name: "operation",
    label: "عملیات",
    field: "operation",
    // align: 'center',
  },
];

const questionItem = ref([]);
const questionItemsList = ref([]);
const loadDataTableQI = () => {
  projectService
    .GetQuestionsList()
    .then((res) => {
      console.log(res);
      questionItemsList.value = res.data;
      // options.value.pageCount = Math.ceil(res.data.length / itemsPerPage.value);
    })
    .catch((err) => {
      // isLoading.value = false;
      console.log(err);
    });
};
loadDataTableQI();

const handleClickQuestionItem = (evt) => {
  console.log(evt);
  loadDataTable(evt.ID);
};

const handleExamDialog = () => {
  console.log(true);

  isOperationDialog.value = true;
};
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
// const handleResetForm = () => {
//   operationData.value = {
//     Title: null,
//     Description: null,
//     DiscountCode: null,
//     MeetingID: null,
//     ReservedNextMeeting: false,
//     cUserID: null,
//   };

//   isAdd.value = false;
//   isDelete.value = false;
//   isEdit.value = false;
// };
const dialogData = computed(() => {
  return {
    isAdd: isAdd.value,
    isEdit: isEdit.value,
    isDelete: isDelete.value,
    dataM: operationData.value,
  };
});
</script>
<style lang="scss"></style>
