<template>
  <div class="col-10">
    <q-form @submit="onSubmit" class="q-gutter-md">
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
        <div class="col-12">
          <q-input
            filled
            type="number"
            v-model="addMeetingModel.Order"
            label="ردیف"
            lazy-rules
            :rules="[(val) => (val && val > 0) || 'ردیف باید ذکر شود']"
          />
        </div>
        <div class="col-12">
          <q-input
            filled
            v-model="addMeetingModel.StartTime"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="addMeetingModel.StartTime"
                    calendar="persian"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-input
            filled
            type="number"
            v-model="addMeetingModel.Cost"
            label="مبلغ جلسه"
            lazy-rules
            :rules="[(val) => (val && val > 0) || 'مبلغ جلسه باید ذکر شود']"
          />
        </div>
        <div class="col-12">
          <q-input
            filled
            type="number"
            v-model="addMeetingModel.Duration"
            label="مدت جلسه"
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
      <div>
        <q-btn label="ثبت" type="submit" color="primary" />
        <!-- <q-btn
            label="خالی کردن"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          /> -->
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
const addMeetingModel = ref({
  Title: null,
  Order: null,
  StartTime: null,
  Cost: null,
  Duration: null,
  isVisible: true,
  IsReservable: false,
});
</script>
