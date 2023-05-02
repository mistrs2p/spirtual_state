<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          <router-link :to="{ name: 'home' }"> حال معنوی </router-link>
        </q-toolbar-title>
        <div>
          <q-btn @click="logout" push glossy dense color="red-14">
            <q-icon class="rotate-180" name="logout" size="xs"></q-icon
            >خروج</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list padding bordered class="rounded-borders" style="max-width: 328px">
        <q-banner inline-actions>
          <!-- class="text-white bg-red-13" -->
          <q-chip>{{
            userStore.user.DisplayName != null
              ? userStore.user.DisplayName
              : userStore.user.Type == 1
              ? "کاربر"
              : userStore.user.Type == 2
              ? "استاد"
              : userStore.user.Type == 3
              ? "ادمین"
              : ""
          }}</q-chip>
        </q-banner>
        <q-expansion-item
          v-if="userStore.user.Type == 2"
          icon="school"
          label="پنل استاد"
        >
          <q-card>
            <q-card-section>
              <q-list bordered separator>
                <router-link :to="{ name: 'addMeeting' }">
                  <q-item clickable v-ripple>
                    <q-item-section>اضافه کردن جلسه</q-item-section>
                  </q-item>
                </router-link>
                <router-link :to="{ name: 'masterExams' }">
                  <q-item clickable v-ripple>
                    <q-item-section>لیست آزمون ها</q-item-section>
                  </q-item>
                </router-link>
                <router-link :to="{ name: 'consultationsList' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>نمایش مشاوره ها</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>

                <router-link :to="{ name: 'showMeetings' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>نمایش جلسات</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          icon="person"
          label="پنل کاربر"
          v-if="userStore.user.Type == 1 || userStore.user.Type == 2"
        >
          <q-card>
            <q-card-section>
              <q-list bordered separator>
                <router-link :to="{ name: 'consultRequest' }">
                  <q-item clickable v-ripple>
                    <q-item-section> درخواست مشاوره </q-item-section>
                  </q-item>
                </router-link>

                <router-link :to="{ name: 'myExams' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>آزمون های من</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>

                <router-link :to="{ name: 'myCounseling' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>مشاوره های من</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>

                <router-link :to="{ name: 'userInfo' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>اطلاعات پایه</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>

                <router-link :to="{ name: 'changePassword' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label> تغییر کلمه عبور </q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          v-if="userStore.user.Type == 3"
          icon="admin_panel_settings"
          label="پنل ادمین"
          header-class="text-orange"
        >
          <q-card>
            <q-card-section>
              <q-list bordered separator>
                <router-link :to="{ name: 'discountList' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label> لیست تخفیف ها</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>

                <router-link :to="{ name: 'mastersList' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label> لیست اساتید </q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>

                <router-link :to="{ name: 'meetingsList' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label> لیست جلسات </q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
                <router-link :to="{ name: 'consultationsListAdmin' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label> لیست مشاوره ها </q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
                <router-link :to="{ name: 'questionsList' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>لیست آزمون ها</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
                <router-link :to="{ name: 'questionItemsList' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>آزمون ها</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
                <router-link :to="{ name: 'mastersInfo' }">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>اطلاعات اساتید</q-item-label>
                    </q-item-section>
                  </q-item>
                </router-link>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="row items-start justify-evenly q-pt-md bg-blue-2">
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
  <!-- <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >You are currently not connected to any network.</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const leftDrawerOpen = ref(false);
const logout = () => {
  localStorage.clear();
  router.push({ name: "login" });
};
</script>
<style lang="scss">
:deep .q-page {
  min-height: unset;
}
</style>
