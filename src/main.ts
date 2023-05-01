import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { Quasar, Notify } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const SpirtualState = createApp(App);
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
