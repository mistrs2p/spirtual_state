<template>
  <div class="col-10">
    <q-form
      @submit="handleAddMeeting"
      @reset="handleResetForm"
      class="q-gutter-md"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <q-input
            filled
            type="text"
            v-model="addMeetingModel.Title"
            label="عنوان"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'عنوان باید ذکر شود']"
          />
        </div>
        <div class="col-12 col-md-6">
          <DatePicker :disabled="false" v-model="dateTime.date" type="date" />
          <!-- <q-input filled v-model="dateTime.date">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="dateTime.date" calendar="persian">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> -->
        </div>
        <div class="col-12 col-md-6">
          <DatePicker :disabled="false" v-model="dateTime.time" type="time" />

          <!-- <custom-date-picker /> -->
          <!-- <q-input filled v-model="dateTime.time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="dateTime.time"
                    mask="HH:mm"
                    format24h
                    calendar="persian"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> -->
        </div>
        <div class="col-12 col-md-4">
          <q-input
            filled
            type="number"
            v-model="addMeetingModel.Order"
            label="ردیف"
            lazy-rules
            :rules="[(val) => (val && val > 0) || 'ردیف باید ذکر شود']"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            filled
            type="number"
            v-model="addMeetingModel.Cost"
            label="مبلغ جلسه (به تومان)"
            lazy-rules
            :rules="[(val) => (val && val > 0) || 'مبلغ جلسه باید ذکر شود']"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            filled
            type="number"
            v-model="addMeetingModel.Duration"
            label="مدت جلسه (به دقیقه)"
            lazy-rules
            :rules="[(val) => (val && val > 0) || 'مدت جلسه باید ذکر شود']"
          />
        </div>
        <div class="col-12">
          <q-checkbox
            size="xs"
            v-model="addMeetingModel.isVisible"
            label="قابلیت نمایش"
          />
          <q-checkbox
            size="xs"
            v-model="addMeetingModel.IsReservable"
            label="قابلیت رزرو"
          />
        </div>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          label="ثبت"
          type="submit"
          color="primary"
          :disable="visibleLoader"
        />
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
    <q-inner-loading
      :showing="visibleLoader"
      label="لطفا منتظر بمانید..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import projectService from "../../services/project.service.js";
import moment from "jalali-moment";
import { Notify } from "quasar";
import DatePicker from "vue3-persian-datetime-picker";
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
const dateTime = ref({
  date: null,
  time: null,
});
const addMeetingModel = ref({
  Title: null,
  Order: null,
  StartTime: null,
  Cost: null,
  Duration: null,
  isVisible: true,
  IsReservable: false,
});
const visibleLoader = ref(false);
const handleAddMeeting = () => {
  visibleLoader.value = true;
  const model = { ...addMeetingModel.value };
  console.log(model);
  model.Order = parseFloat(addMeetingModel.value.Order);
  model.Duration = parseFloat(addMeetingModel.value.Duration);
  model.Cost = parseFloat(addMeetingModel.value.Cost);
  model.StartTime = moment
    .from(
      `${dateTime.value.date} ${dateTime.value.time}`,
      "fa",
      "YYYY/M/D HH:mm:ss"
    )
    .format("YYYY-M-D HH:mm:ss");
  console.log(model);
  projectService
    .AddMeeting(model)
    .then((res) => {
      visibleLoader.value = false;
      console.log(res);
      Notify.create({
        message: "با موفقیت اضافه شد!",
        position: "top",
        timeout: 500,
        progress: true,
        color: "positive",
      });
      handleResetForm();
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
      visibleLoader.value = false;
    });
};
const handleResetForm = () => {
  addMeetingModel.value = {
    Title: null,
    Order: null,
    Cost: null,
    Duration: null,
    isVisible: true,
    IsReservable: false,
    StartTime: null,
  };
  dateTime.value = {
    date: null,
    time: null,
  };
};
</script>

<style lang="scss"></style>
