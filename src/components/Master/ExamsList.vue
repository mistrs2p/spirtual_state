<template>
  <div class="col-12 q-px-md">
    <q-table
      :pagination="{ rowsPerPage: 10 }"
      dense
      flat
      bordered
      title="لیست آزمون ها"
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
              v-if="item.name == 'DateCreate' || item.name == 'DateExecuted'"
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
            <span v-else-if="item.name == 'isExecuted'">
              <q-checkbox
                size="xs"
                v-if="props.row.IsExecuted == null"
                v-model="props.row.IsExecuted"
                :false-value="null"
                disable
              />
              <q-checkbox
                size="xs"
                v-else
                v-model="props.row.IsExecuted"
                disable
              />
            </span>
            <span v-else-if="item.name == 'operation'">
              <!-- <span v-if="props.row.IsExecuted"> -->
              <span>
                <q-btn
                  dense
                  flat
                  :label="'نمایش'"
                  :color="'primary'"
                  @click="handleShowExam(props.row)"
                />
                <q-btn
                  flat
                  dense
                  label="نتیجه"
                  color="secondary"
                  @click="handleGetResultExam(props.row)"
                />
              </span>
            </span>
            <span v-else>
              {{ props.row[item.field] }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-inner-loading
      :showing="visibleLoader"
      label="لطفا منتظر بمانید..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
  <q-dialog
    v-model="isOperationDialog"
    full-width
    full-height
    style="position: relative"
    persistent
  >
    <FormG
      :formData="formData"
      :answers="answers"
      :examID="examID"
      formDisable
      forShow
      @closeDialog="(isOperationDialog = false), loadDataTable()"
    />
  </q-dialog>
  <q-dialog v-model="isResultShow" full-height full-width>
    <q-card>
      <q-btn v-close-popup icon="close" flat round></q-btn>
      <q-card-section>
        <h5>
          مراجع: {{ resultData.UserDisplayName }}
          {{ examQType == QType.Millon ? resultData.ResultText : "" }}
        </h5>
      </q-card-section>
      <q-card-section>
        <div
          v-if="examQType == QType.Cattell"
          class="bg-pink-1 q-pa-md rounded-borders"
        >
          <h6 class="q-my-md">عوامل مرتبه اول</h6>
          <div style="direction: ltr" class="row justify-center">
            <template v-for="(value, key) of resultData" :key="key">
              <div class="text-center">
                <q-chip
                  v-if="
                    key != 'UserDisplayName' &&
                    key != 'QuestionType' &&
                    key.includes('Fac')
                  "
                  class="bg-primary text-white"
                  >{{ key.replace("Fac", "") }}: {{ value }}</q-chip
                >
              </div>
            </template>
          </div>
        </div>
        <div
          v-if="examQType == QType.Cattell || examQType == QType.Gardner"
          class="col-12"
        >
          <ChartG :data="dataChart" :type="typeChart" />
        </div>
        <div
          v-if="examQType == QType.Cattell"
          class="bg-pink-1 q-pa-md rounded-borders"
        >
          <h6 class="q-my-md">عوامل مرتبه دوم</h6>
          <div style="direction: ltr" class="row justify-center">
            <template v-for="(value, key) of resultData" :key="key">
              <div class="text-center">
                <q-chip
                  v-if="
                    key != 'UserDisplayName' &&
                    key != 'QuestionType' &&
                    !key.includes('Fac') &&
                    !key.includes('IsMale')
                  "
                  class="bg-primary text-white"
                  >{{ handleDeg2(key) }}: {{ value }}</q-chip
                >
              </div>
            </template>
          </div>
          <hr />
        </div>
        <div v-if="examQType == QType.Raven">
          <h6 class="q-my-md">نمره آزمون شما: {{ resultData.ResultScore }}</h6>
          <div class="" style="display: flex">
            <q-img
              style="width: 800px"
              class="q-mx-auto"
              src="../../assets/images/chart-raven.jpg"
            />
          </div>
        </div>
        <div v-if="examQType == QType.MBTI">
          <h6 class="q-my-md">عوامل</h6>
          <div class="row q-col-gutter-xl">
            <div
              class="col-6 text-center rounded-borders"
              v-for="(key, value, index) in resultData"
              :key="index"
            >
              <span
                v-if="value != 'UserDisplayName' && value != 'QuestionType'"
                :class="index % 2 != 0 ? 'bg-teal' : 'bg-primary'"
                class="q-px-xl text-white rounded-borders"
              >
                {{ key }} :{{ value }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="examQType == QType.Haland">
          <h6 class="q-my-md">نمره خام</h6>
          <q-list bordered separator>
            <template v-for="(value, key) in resultData" :key="key">
              <q-item
                clickable
                v-if="key != 'UserDisplayName' && key != 'QuestionType'"
                v-ripple
              >
                <q-item-section>{{ key }}: {{ value }}</q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>
        <div v-if="examQType == QType.Millon">
          <q-table
            :pagination="{ rowsPerPage: 27 }"
            :rows="resultData.ResultScores"
            :columns="columnsMillon"
            row-key="name"
            :separator="'cell'"
            bordered
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="item in columnsMillon"
                  :key="item.name"
                  :props="props"
                >
                  <span v-if="item.name == 'Ap'">
                    <q-slider
                      :model-value="props.row[item.field]"
                      :max="115"
                      label-always
                      readonly
                    />
                  </span>
                  <span v-else>
                    {{ props.row[item.field] }}
                  </span></q-td
                ></q-tr
              >
            </template>
          </q-table>
        </div>

        <div v-if="examQType == QType.Yellbrown">
          <h6 class="q-my-md">
            درجه وسواس آزمون شما: {{ resultData.ResultScore }} -
            {{ resultData.ResultText }}
          </h6>
        </div>
        <div v-if="examQType == QType.Yang90">
          <q-table
            :pagination="{ rowsPerPage: 18 }"
            :rows="yangRows"
            :columns="columnsYang90"
            row-key="name"
            :separator="'cell'"
            bordered
          />
        </div>
        <div v-if="examQType == QType.BeckDep">
          <h6 class="q-my-md">
            درجه افسردگی آزمون شما: {{ resultData.ResultScore }} -
            {{ resultData.ResultText }}
          </h6>
        </div>

        <!-- {{ resultData }} -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts" generic="T extends string">
import interfaces from "@/interfaces/interfaces";
import projectService from "../../services/project.service";
import { ref, defineComponent, nextTick, computed } from "vue";
import { Notify } from "quasar";
import { type genericComp } from "type";
import FormG from "@/components/FormG.vue";
import ChartG from "@/components/ChartG.vue";

const rows = ref<interfaces.MasterExamResponse[]>([]);
const loading = ref(false);

const loadDataTable = () => {
  loading.value = true;
  projectService
    .GetMasterExams()
    .then(({ data }: { data: interfaces.MasterExamResponse[] }) => {
      console.log(data);
      rows.value = data;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};
loadDataTable();
const columns = [
  {
    name: "name",
    label: "عنوان",
    field: "Title",
    align: "right",
  },
  {
    name: "User",
    label: "مراجعه کننده",
    field: "User",
    align: "right",
  },
  {
    name: "DateCreate",
    label: "تاریخ درخواست",
    field: "DateCreate",
    align: "right",
  },
  {
    name: "Master",
    label: "استاد",
    field: "Master",
    align: "right",
  },
  {
    name: "Question",
    label: "تست",
    field: "Question",
    align: "right",
  },
  {
    name: "isExecuted",
    label: "انجام شده",
    field: "isExecuted",
    align: "right",
  },
  { name: "operation", label: "عملیات", field: "operation", align: "right" },
];
const columnsMillon = [
  {
    name: "Neshanegan",
    label: "نشانگان",
    field: "Neshanegan",
    align: "left",
  },
  {
    name: "Symbol",
    label: "نشانه",
    field: "Symbol",
    align: "left",
  },

  {
    name: "Num",
    label: "نمره خام",
    field: "Num",
    align: "left",
  },
  {
    name: "BR",
    label: "BR",
    field: "BR",
    align: "left",
  },
  {
    name: "Ap",
    label: "نمره",
    field: "Ap",
    align: "left",
  },
  {
    name: "Meghyass",
    label: "مقیاس",
    field: "Meghyass",
    align: "left",
  },
];
const columnsYang90 = [
  {
    name: "sign",
    label: "نشانه",
    field: "sign",
    align: "left",
  },
  {
    name: "title",
    label: "نشانه",
    field: "title",
    align: "left",
  },
  {
    name: "score",
    label: "نمره",
    field: "score",
    align: "left",
  },
];
const isOperationDialog = ref(false);
const visibleLoader = ref(false);
const formData = ref(null);
const answers = ref(null);
const examID = ref(null);
const examQType = ref<string | null>(null);

const handleShowExam = (evt) => {
  visibleLoader.value = true;
  examID.value = evt.ID;

  console.log(evt);
  projectService
    .UserGetQuestionItemsList(evt.ID)
    .then((res) => {
      formData.value = res.data;
      answers.value = evt.Answer;
      console.log(res);

      visibleLoader.value = false;
      isOperationDialog.value = true;
    })
    .catch((err) => {
      console.log(err);
      visibleLoader.value = false;
    });
};
const isResultShow = ref(false);
const resultData = ref(null);
const handleGetResultExam = (evt: interfaces.MasterExamResponse) => {
  visibleLoader.value = true;
  const model: interfaces.ExamCalculateResultRequest = {
    ExamID: evt.ID,
    Answers: evt.Answer,
  };
  console.log(model);
  projectService
    .ExamsCalculateResult(model)
    .then((res) => {
      console.log(res);
      resultData.value = res.data;
      examQType.value = evt.QType;
      handleChartData(evt.QType);
      if (evt.QType == QType.Yang90) {
        handleYang90();
      }
      visibleLoader.value = false;
      isResultShow.value = true;
      nextTick(() => {
        console.log(true);
      });
    })
    .catch((err) => {
      console.log(err);
      Notify.create({
        message: "برای این آزمون نتیجه ای وجود ندارد!",
        position: "top",
        timeout: 1000,
        progress: true,
        color: "negative",
      });
      visibleLoader.value = false;
    });
  console.log(evt);
};
const QType = {
  Cattell: 1,
  Raven: 2,
  InfoForm: 3,
  MeetingSummary: 4,
  Karbarg: 5,
  Millon: 6,
  CattellStress: 7,
  Yellbrown: 8,
  MBTI: 9,
  SCL90: 10,
  Gardner: 11,
  Haland: 12,
  BeckDep: 13,
  Yang90: 14,
};
const dataChart = ref(null);
const typeChart = ref(null);
const yangRows = ref([]);
const handleYang90 = () => {
  let data = {};
  for (let k in resultData.value) {
    if (k != "UserDisplayName" && k != "QuestionType") {
      console.log(data.sign);
      switch (k) {
        case "Yn_ed":
          data.title = "محرومیت هیجانی";
          break;

        case "Yn_ab":
          data.title = "رها شدگی/ بی ثباتی";
          break;

        case "Yn_ma":
          data.title = "بی اعتمادی/ بدرفتاری";
          break;

        case "Yn_si":
          data.title = "انزوای اجتماعی/ بیگانگی";
          break;

        case "Yn_ds":
          data.title = "نقص/ شرم";
          break;

        case "Yn_fa":
          data.title = "شکست";
          break;

        case "Yn_ai":
          data.title = "وابستگی/ بی کفایتی";
          break;

        case "Yn_vu":
          data.title = "آسیب پذیری نسبت به ضرر یا بیماری";
          break;

        case "Yn_eu":
          data.title = "گرفتار / خویشتن تحول نیافته";
          break;

        case "Yn_Sb":
          data.title = "اطاعت";
          break;

        case "Yn_ss":
          data.title = "ایثارگری";
          break;

        case "Yn_ei":
          data.title = "بازداری هیجانی";
          break;

        case "Yn_us":
          data.title = "معیارهای سخت گیرانه";
          break;

        case "Yn_et":
          data.title = "استحقاق / بزرگ منشی";
          break;

        case "Yn_is":
          data.title = "خویشتن داری / خود انضباطی ناکافی";
          break;

        case "Yn_as":
          data.title = "پذیرش جوئی / جلب توجه";
          break;

        case "Yn_np":
          data.title = "منفی گرائی / بدبینی";
          break;

        case "Yn_pu":
          data.title = "تنبیه";
          break;
      }
      data.sign = k.replace("Yn_", "");
      data.score = resultData.value[k];
      yangRows.value.push(data);
      data = {};
    }
  }
};
const handleChartData = (QTypee) => {
  console.log(true);
  let data = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        // borderColor: "red",
        // backgroundColor: "blue",
        // fill: false,
      },
    ],
  };
  for (let k in resultData.value) {
    console.log(k);
    if (k != "UserDisplayName" && k != "QuestionType") {
      if (k.toLowerCase().includes("fac")) {
        data.labels.push(k.replace("Fac", ""));
      } else if (QTypee != QType.Cattell) {
        switch (k) {
          case "Kalami":
            data.labels.push("هوش زبانی - کلامی");
            break;
          case "Riyazi":
            data.labels.push("هوش ریاضی");
            break;
          case "Didari":
            data.labels.push("هوش دیداری - فضایی");
            break;
          case "Badani":
            data.labels.push("هوش بدنی - حرکتی");
            break;
          case "BoroonFardi":
            data.labels.push("هوش برون فردی");
            break;
          case "DaroonFardi":
            data.labels.push("هوش درون فردی");
            break;
          case "Mosighi":
            data.labels.push("هوش موسیقیایی");
            break;
          case "Tabiat":
            data.labels.push("هوش طبیعت گرا");
            break;
        }
      }
      data.datasets[0].data.push(resultData.value[k]);
    }
  }

  switch (QTypee) {
    case QType.Cattell:
      data.datasets[0].label = "16 عاملی";
      typeChart.value = "line";
      break;
    case QType.Gardner:
      data.datasets[0].label = "تست هوش چندگانه";
      typeChart.value = "radar";
      break;
  }
  dataChart.value = data;
  console.log(data);
};

const handleDeg2 = (key) => {
  switch (key) {
    case "Ad":
      return "Adjustment";
    case "An":
      return "Anxiety";
    case "In":
      return "Independence";
    case "Cr":
      return "Creativity";
    case "Ex":
      return "Extraversion";
    case "Co":
      return "Control";
    case "Fl":
      return "Flexibility";
    case "Le":
      return "Leadership";
  }
};
</script>
