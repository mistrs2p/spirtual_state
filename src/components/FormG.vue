<template>
  <q-card
    style="
      width: 60vw;
      /* margin: 0 auto;
      position: absolute;
      height: calc(100vh - 200px);
      overflow-y: scroll;
      left: 50%;
      right: 50%;
      transform: translateX(50%); */
    "
  >
    <div>
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
    </div>
  </q-card>
  <div>
    <q-btn @click="handleResult" flat color="primary" label="ارسال" />
  </div>
  <!-- <q-card style="position: absolute; bottom: 0; height: 60px; width: 60vw">
    <q-card-action> asdfasfd </q-card-action>
  </q-card> -->
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import { Notify } from "quasar";
import projectService from "../services/project.service.js";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  examID: {
    type: String,
    required: true,
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
  return (
    rootUrl.value.substring(0, rootUrl.value.length - 4) +
    data.replace("http://halemanavi.ir/", "")
  );
};

const handleResult = () => {
  let str = "";
  let counter = 1;
  items.value.forEach((el) => {
    if (el.AnswerType != AnswerType.None) {
      str += `${counter}:${el.Value}|`;

      counter++;
    }
  });
  console.log(str);
  const model = {
    ExamID: props.examID,
    Answers: str,
  };
  projectService
    .ExamsCalculateResult(model)
    .then((res) => {
      console.log(res);
      Notify.create({
        message: "asdasdfafsd",
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
</script>
