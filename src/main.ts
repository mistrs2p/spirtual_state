import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { Quasar, Notify } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
console.log(appVersion);
SpirtualState.config.globalProperties.$appVersion = appVersion;
SpirtualState.component("DatePicker", Vue3PersianDatetimePicker);
console.log(SpirtualState.config);
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
