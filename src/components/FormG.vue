<template>
  <q-card style="width: 60vw; margin: 0 auto">
    <template v-for="(item, index) in items">
      <q-card-section
        :key="index"
        class="row"
        v-if="
          item.QIType != QItemType.startRow && item.QIType != QItemType.endRow
        "
      >
        {{ index }}
        <!-- item.AnswerType != AnswerType.None -->
        <!-- <q-chip>{{ index + 1 }}</q-chip> -->

        <div v-if="item.AnswerType == AnswerType.None" class="col-12">
          <p v-if="item.QIType == QItemType.Body">
            {{ item.Title }}
          </p>
          <h4 v-if="item.QIType == QItemType.Title">{{ item.Title }}</h4>
          <h6 v-if="item.QIType == QItemType.Section">{{ item.Title }}</h6>
          <br v-if="item.QIType == QItemType.newLine" />
          <div v-if="item.QIType == QItemType.Choice">{{ item.Title }}</div>

          <hr
            v-if="item.QIType == QItemType.hr"
            style="
              height: 5px;
              background-color: teal;
              border-radius: 1rem;
              border: none;
            "
          />
        </div>
        <div v-else-if="item.AnswerType == AnswerType.Choice" class="col-12">
          <div>{{ item.Title }}</div>
          <q-option-group
            v-model="item.Value"
            :options="item.choiceOptions"
            color="primary"
            inline
          />
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
      </q-card-section>
    </template>
  </q-card>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  formData: {
    type: Object,
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

const handleItem = (el) => {
  if (el != null) {
    switch (el.QIType) {
      case QItemType.Choice:
        break;

      default:
        break;
    }
  }
};
</script>
