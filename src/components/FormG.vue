<template>
  <q-card>
    <q-card-actions
      align="left"
      style="
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        overflow: auto;
        text-align: center;
      "
      class="bg-blue-grey-10"
    >
      <q-btn
        @click="handleCloseAction"
        round
        color="secondary"
        icon="close"
        flat
        class="q-ml-md"
        dense
      >
      </q-btn>
      <q-btn
        v-if="!forShow"
        dense
        @click="handleResult(false)"
        round
        color="secondary"
        icon="save"
        outline
        class="q-ml-md"
      >
        <q-tooltip>ذخیره اطلاعات</q-tooltip>
      </q-btn>
      <!-- <q-btn dense color="negative" label="خروج" v-close-popup outline /> -->
    </q-card-actions>
    <q-card
      :style="{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '52px',
        bottom: forShow ? 0 : '52px',
        overflow: 'auto',
      }"
    >
      <template v-for="(item, index) in items">
        <q-card-section
          :key="index"
          class="row"
          v-if="
            item.QIType != QItemType.startRow && item.QIType != QItemType.endRow
          "
        >
          <div v-if="item.AnswerType == AnswerType.Choice" class="col-12">
            <div v-if="item.Title && !item.Title?.startsWith('http://')">
              {{ item.Title }}
            </div>
            <div v-else>
              <q-img
                loading="lazy"
                :src="handleImg(item.Title)"
                width="300px"
              />
            </div>
            <q-option-group
              v-model="item.Value"
              :options="item.choiceOptions"
              color="primary"
              inline
              :disable="formDisable"
            >
              <template v-slot:label="opt">
                <div class="row items-center">
                  <span v-if="!opt.label.startsWith('http://')">
                    {{ opt.label }}
                  </span>
                  <q-img
                    loading="lazy"
                    v-else
                    :src="handleImg(opt.label)"
                    width="100px"
                  />
                </div>
              </template>
            </q-option-group>
          </div>
          <div v-else-if="item.AnswerType == AnswerType.Text" class="col-12">
            <!-- v-if="item.QIType == QItemType.TextAnswer" -->
            <q-input
              v-model="item.Value"
              :disable="formDisable"
              :type="
                item.QIType == QItemType.multiTextAnswer
                  ? 'textarea'
                  : item.QIType == QItemType.TextAnswer
                  ? 'text'
                  : null
              "
              :label="item.Title"
              filled
            >
            </q-input>
            <!-- 
            <q-input
              v-else-if="item.QIType == QItemType.multiTextAnswer"
              v-model="item.Value"
              type="textarea"
              :label="item.Title"
            /> -->
          </div>
          <div v-else class="col-12">
            <!-- <div v-if="item.Title != null && item.Title.startsWith('http://')">
              <q-img
                :src="item.title"
                loading="lazy"
                spinner-color="white"
                height="140px"
                style="max-width: 150px"
              />
            </div> -->
            <!-- <div v-else> -->
            <p v-if="item.QIType == QItemType.Body">
              {{ item.Title }}
            </p>
            <h4 v-if="item.QIType == QItemType.Title">{{ item.Title }}</h4>
            <h6 v-if="item.QIType == QItemType.Section">{{ item.Title }}</h6>
            <div v-if="item.QIType == QItemType.newLine">
              br
              <br />
            </div>
            <div v-if="item.QIType == QItemType.Choice">{{ item.Title }}</div>

            <hr
              v-if="item.QIType == QItemType.hr"
              style="
                width: 100%;
                height: 5px;
                background-color: teal;
                border-radius: 1rem;
                border: none;
              "
            />
            <!-- </div> -->
          </div>
        </q-card-section>
      </template>
    </q-card>
    <q-card-actions
      align="left"
      style="
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        text-align: center;
      "
    >
      <q-btn
        @click="handlePreResult"
        color="primary"
        label="پایان"
        outline
        class="q-ml-md"
        v-if="!forShow"
      />
      <!-- <q-btn color="negative" label="خروج" v-close-popup outline /> -->
    </q-card-actions>
  </q-card>
  <!-- <q-card>
  </q-card> -->
  <!-- <q-card style="position: absolute; bottom: 0; height: 60px; width: 60vw">
    <q-card-action> asdfasfd </q-card-action>
  </q-card> -->
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import { Notify } from "quasar";
import projectService from "../services/project.service";

const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  answers: {
    type: String,
    default: null,
  },
  examID: {
    type: String,
    required: true,
  },
  formDisable: {
    type: Boolean,
    default: false,
  },
  forShow: {
    type: Boolean,
    default: false,
  },
});

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
const AnswerType = {
  Choice: 0,
  Text: 1,
  None: 2,
};

const items = ref([]);
const loadData = () => {
  const myData = [...props.formData];
  myData.forEach((element) => {
    // console.log(element);
    element.choiceOptions = [];
    element.Value = null;

    for (let k in element) {
      if (k.startsWith("Choice")) {
        if (element[k] != null) {
          const num = k.split("Choice");
          element.choiceOptions.push({
            choiceNumber: k,
            label: element[k],
            value: num[1],
          });
        }
      }
    }
  });
  //   if (element.QIType = QItemType.startRow || element.QIType = QItemType.endRow)
  // myData
  console.log(myData);
  // console.log(
  //   myData.filter(
  //     (el) => el.QIType != QItemType.startRow && el.QIType != QItemType.endRow
  //   )
  // );
  items.value = myData.filter(
    (el) => el.QIType != QItemType.startRow && el.QIType != QItemType.endRow
  );
};
loadData();

// const handleItem = (el) => {
//   if (el != null) {
//     switch (el.QIType) {
//       case QItemType.Choice:
//         break;

//       default:
//         break;
//     }
//   }
// };

const rootUrl = computed(() => {
  return process.env.VUE_APP_ROOT_URL;
});
const handleImg = (data) => {
  if (!data) return;
  return (
    rootUrl.value.substring(0, rootUrl.value.length - 4) +
    data.replace("http://halemanavi.ir/", "")
  );
};
const handlePreResult = () => {
  Notify.create({
    group: "myG",
    spinner: true,
    message: "آزمونتان را به اتمام می رسانید؟",
    position: "center",
    color: "light-blue-2",
    textColor: "black",
    timeout: 0,
    actions: [
      {
        label: "بله",
        icon: "done",
        color: "primary",
        handler: () => {
          handleResult();
        },
      },
      {
        label: "خیر",
        icon: "close",
        color: "secondary",
        handler: () => {
          return;
        },
      },
    ],
  });
};

const handlePreAnswers = () => {
  if (props.answers != null) {
    const answersPairs = props.answers.split("|");
    console.log(answersPairs);
    answersPairs.forEach((el) => {
      const answersKeyValue = el.split(":");
      const myFind = items.value.find(
        (ztel) => ztel.UnicNumber == answersKeyValue[0]
      );
      console.log(myFind);
      if (myFind) {
        myFind.Value = answersKeyValue[1];
      }
    });
  }
};
handlePreAnswers();
const handleCalculateResult = () => {
  let str = "";
  // let counter = 1;
  items.value.forEach((el) => {
    if (el.AnswerType != AnswerType.None) {
      str += `${el.UnicNumber}:${
        el.Value != null
          ? el.Value
          : el.AnswerType == AnswerType.Choice
          ? 0
          : ""
      }|`;

      // counter++;
    }
  });
  return str;
};
const handleResult = async (isDone = false) => {
  const model = {
    ExamID: props.examID,
    Answers: handleCalculateResult(),
  };
  console.log(model);
  const myModelApi = isDone
    ? await projectService.ExamsCalculateResult(model)
    : await projectService.ExamAsnwerSaveDraft(model);
  // console.log(myModelApi.data);
  // console.log(myModelApi);
  if (myModelApi.status == 200) {
    console.log(myModelApi);
    Notify.create({
      group: "myG",
      spinner: true,
      message: isDone
        ? "آزمون با موفقیت به اتمام رسید."
        : "آزمون با موفقیت ذخیره شد.",
      position: "top",
      timeout: 500,
      progress: true,
      color: "positive",
    });
    emit("closeDialog", false);
  } else {
    Notify.create({
      group: "myG",
      spinner: true,
      message: "خطا",
      position: "top",
      timeout: 500,
      progress: true,
      color: "negative",
    });
  }

  // projectService
  //   .ExamsCalculateResult(model)
  //   .then((res) => {
  //     console.log(res);
  //     activeNotifications.create({
  //       message: "آزمون با موفقیت به اتمام رسید.",
  //       position: "top",
  //       timeout: 500,
  //       progress: true,
  //       color: "positive",
  //     });
  //     emit("closeDialog", false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     activeNotifications.create({
  //       message: "خطا",
  //       position: "top",
  //       timeout: 500,
  //       progress: true,
  //       color: "negative",
  //     });
  //   });
};

// const handleSaveDraft = () => {};
const handleCloseAction = () => {
  if (props.forShow) {
    emit("closeDialog", false);
  } else {
    Notify.create({
      group: "myG",
      spinner: true,
      message: "آزمون ذخیره شود؟",
      position: "center",
      color: "light-blue-2",
      textColor: "black",
      timeout: 0,
      actions: [
        {
          label: "ذخیره و خروج",
          icon: "save",
          color: "primary",
          handler: () => {
            handleResult(false);
          },
        },
        {
          label: "ذخیره نشود!",
          icon: "close",
          color: "negative",
          handler: () => {
            setTimeout(() => {
              emit("closeDialog", false);
            }, 500);
          },
        },
        {
          label: "ادامه آزمون!",
          icon: "arrow_right_alt",
          color: "secondary",
          handler: () => {
            return;
          },
        },
      ],
    });
  }
};
</script>
