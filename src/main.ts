/* eslint-disable @typescript-eslint/no-var-requires */

import { createApp } from "vue";
import App from "./App.vue";
import { cloneDeep as clone } from "lodash";
import "./registerServiceWorker";
import router from "./router";
import { Quasar, Notify } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

export const appVersion: string = require("../package.json").version;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
if (process.env.NODE_ENV === "production") {
  console.log = function () {
    return false;
  };
  console.warn = function () {
    return false;
  };
  console.error = function () {
    return false;
  };
}
const SpirtualState = createApp(App);

SpirtualState.config.globalProperties.$appVersion = appVersion;
export const datePickerConfig = {
  name: "DatePicker",
  props: {
    clearable: true,
    autoSubmit: true,
    color: "#00acc1",
    format: "YYYY-MM-DD",
    displayFormat: "jDD jMMMM jYYYY",
    type: "date",
  },
};

export const dateTimePickerConfig = {
  name: "TimePicker",
  props: {
    clearable: true,
    autoSubmit: true,
    color: "#00acc1",
    type: "time",
    format: "HH:mm",
    displayFormat: "HH:mm",
    type: "time",
  },
};
SpirtualState.use(clone(Vue3PersianDatetimePicker), datePickerConfig);
SpirtualState.use(clone(Vue3PersianDatetimePicker), dateTimePickerConfig);

SpirtualState.use(Quasar, {
  ...quasarUserOptions,
  plugins: {
    Notify,
  },
  config: {
    notify: {
      /* look at QuasarConfOptions from the API card */
    },
  },
});
SpirtualState.use(router);
SpirtualState.use(pinia);
SpirtualState.mount("#app");
