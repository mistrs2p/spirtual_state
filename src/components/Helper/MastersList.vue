<template>
  <div class="col-12">
    <q-select
      name="users"
      v-model="vmodel"
      :options="usersListFilter"
      :option-label="(item) => item.DisplayName + ' ' + item.UserName"
      :option-value="'ID'"
      color="primary"
      filled
      use-input
      @filter="filterFn"
      clearable
      label="انتخاب مراجعه کننده"
      :rules="[(val) => val || 'مراجعه کننده باید ذکر شود']"
    />
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  vModel: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: null,
  },
});
const vmodel = ref(props.vModel);
const usersListFilter = ref([...props.options]);

const filterFn = (val, update) => {
  console.log(val, update);
  if (val === "") {
    update(() => {
      usersListFilter.value = usersList.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    console.log(needle.toLowerCase());
    console.log(usersListFilter.value);
    console.log(props.options);
    usersListFilter.value = props.options.filter(
      (vall) =>
        vall.DisplayName?.toLowerCase().indexOf(needle) > -1 ||
        vall.UserName?.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>
<style lang="scss"></style>
