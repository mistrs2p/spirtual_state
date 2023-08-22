<template>
  <q-select
    v-model="vModel"
    :label="label"
    :options="filterOptions"
    dense
    options-dense
    use-input
    :multiple="isMultiple ? true : false"
    :use-chips="isUseChips ? true : false"
    :readonly="isReadonly"
    :outlined="outlined"
    @filter="filterFn"
    @new-value="createValue"
    @update:model-value="handleChange"
    clearable
    @clear="handleClearSelection"
    :loading="loading"
    :filled="filled"
    :option-label="optionLabel"
    :option-value="optionValue"
    :color="color"
    :rules="myRules"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          داده ای وجود ندارد...
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:prepend v-if="prepIcon">
      <q-icon :name="prepIcon"> </q-icon>
    </template>
  </q-select>
</template>
<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
const props = defineProps({
  valInit: {
    type: String || Object,
    default: null,
  },
  selectOption: {
    type: Array,
    default: null,
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "label",
  },
  isUseChips: {
    type: Boolean,
    default: false,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  filled: {
    type: Boolean,
    default: false,
  },
  optionLabel: {
    type: String,
    required: false,
  },
  optionValue: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    default: "",
  },
  myFilterProp: {
    type: String || Array,
    default: "Title",
  },
  myRules: {
    type: Array,
    required: false,
  },
  prepIcon: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(["listenChangeValue"]);
const vModel = ref(props.valInit);
const label = ref(props.label);
const filterOptions = ref(props.selectOption);

const filterFn = (val, update) => {
  update(() => {
    if (val === "") {
      filterOptions.value = props.selectOption;
    } else {
      const needle = val.toLowerCase();
      // console.log(needle);
      console.log(filterOptions.value);
      //   console.log(needle);
      //   console.log(props.selectOption);
      filterOptions.value = props.selectOption.filter((v) => {
        if (v[props.myFilterProp]) {
          return v[props.myFilterProp].toLowerCase().indexOf(needle) > -1;
        }
      });
    }
  });
};

const createValue = (value, done) => {
  if (value.length > 2) {
    if (!props.selectOption.includes(value)) {
      done(value, "add-unique");
    }
  }
};
const handleChange = (ev) => {
  console.log(ev);
  emit("listenChangeValue", ev);
};
const handleClearSelection = (ev) => {
  emit("listenClearVModel", ev);
};
watch(
  () => props.valInit,
  (nVal) => {
    vModel.value = nVal;
  }
);
</script>
<style lang="scss" scoped></style>
