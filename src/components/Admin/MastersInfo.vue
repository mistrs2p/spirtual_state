<template>
  <div class="col-10 row">
    <div class="col-12 row" style="flex-direction: column; align-items: center">
      <q-date
        v-model="dateModel"
        range
        landscape
        calendar="persian"
        ref="myDate"
      >
      </q-date>
      <q-btn
        @click="loadDataTable"
        color="primary"
        class="q-mt-lg"
        style="font-size: 1.25rem; border-radius: 0.6rem"
        >گزارش گیری</q-btn
      >
    </div>
    <hr />
    <div class="col-12">
      <q-table
        :pagination="{ rowsPerPage: 10 }"
        dense
        flat
        bordered
        title="آزمون ها"
        :rows="rows"
        :columns="columns"
        row-key="name"
        color="deep-purple-14"
        :separator="'cell'"
        :wrap-cells="true"
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
              <span v-if="item.name == 'DateStart' || item.name == 'DateEnd'">
                <!-- {{
                  props.row[item.field] != null
                    ? new Date(props.row[item.field]).toLocaleTimeString(
                        "fa-IR"
                      )
                    : ""
                }}
                - -->
                {{
                  props.row[item.field] != null
                    ? new Date(props.row[item.field]).toLocaleDateString(
                        "fa-IR"
                      )
                    : ""
                }}
              </span>
              <span v-else>
                {{ props.row[item.field] }}
              </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import projectService from "@/services/project.service";
import moment from "jalali-moment";
console.log(moment());
import { ref, computed, onMounted } from "vue";
// import { Notify } from 'quasar';
const newDate = ref(new Date());
// const dateModel = ref({
//   from: newDate.value.toLocaleDateString("fa-IR"),
//   to: new Date(
//     newDate.value.setDate(newDate.value.getDate() - 30)
//   ).toLocaleDateString("fa-IR"),
// });
const myDate = ref(null);
const dateModel = ref({
  from: moment().startOf("jMonth").format("jYYYY/jMM/jDD"),
  to: moment().endOf("jMonth").format("jYYYY/jMM/jDD"),
});
// const calculatedDate = computed(() => {
//   return {
//     from: new Date(dateModel.value.from),
//     to: new Date(dateModel.value.to),
//   };
// });
// const calculatedDate = computed(() => {
//   return {
//     from: new Date(
//       moment.from(dateModel.value.from, "fa", "YYYY/M/D").format("YYYY-M-D")
//     ),
//     to: new Date(
//       moment.from(dateModel.value.to, "fa", "YYYY/M/D").format("YYYY-M-D")
//     ),
//   };
// });
const rows = ref([]);
const loading = ref(false);
const loadDataTable = () => {
  const model = {
    DateStart: new Date(
      moment.from(dateModel.value.from, "fa", "YYYY/M/D").format("YYYY-M-D")
    ),
    DateEnd: new Date(
      moment.from(dateModel.value.to, "fa", "YYYY/M/D").format("YYYY-M-D")
    ),
  };
  console.log(model);
  loading.value = true;
  projectService
    .GetMastersInfo(model)
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
const columns = [
  {
    name: "name",
    label: "نام استاد",
    field: "DisplayName",
    // align: 'center',
  },
  {
    name: "DateStart",
    label: "تاریخ شروع",
    field: "DateStart",
    // align: 'center',
  },
  {
    name: "DateEnd",
    label: "تاریخ پایان",
    field: "DateEnd",
    // align: 'center',
  },
  {
    name: "MeetingsCount",
    label: "تعداد جلسات",
    field: "MeetingsCount",
    // align: 'center',
  },
  {
    name: "ExamsCount",
    label: "تعداد آزمون ها",
    field: "ExamsCount",
    // align: 'center',
  },
  {
    name: "MeetingsTotalAmount",
    label: "مجموع هزینه های جلسات",
    field: "MeetingsTotalAmount",
    // align: 'center',
  },

  {
    name: "ExamsTotalAmount",
    label: "مجموع هزینه های آزمون ها",
    field: "ExamsTotalAmount",
    // align: 'center',
  },
  {
    name: "Total",
    label: "مقدار کل",
    field: "Total",
    // align: 'center',
  },
  {
    name: "Final",
    label: "مقدار نهایی",
    field: "Final",
    // align: 'center',
  },
];
</script>
<style lang="scss"></style>
