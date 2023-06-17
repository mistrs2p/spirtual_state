import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import projectService from "../services/project.service.js";
import { handleNewVersion } from "../helpers/newVersionSet";
import { useUserStore } from "../stores/user.js";
import { Notify } from "quasar";
import { appVersion } from "../main";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/IndexLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/HomeView.vue"),
        name: "home",
      },
      {
        path: "change-password",
        component: () => import("@/components/ChangePassword.vue"),
        name: "changePassword",
      },
      {
        path: "consult-request",
        component: () => import("@/components/ConsultRequest.vue"),
        name: "consultRequest",
      },
      {
        path: "user-info",
        component: () => import("@/components/AdditionalInfo.vue"),
        name: "userInfo",
      },
      {
        path: "my-exams",
        component: () => import("@/components/MyExams.vue"),
        name: "myExams",
      },
      {
        path: "my-tickets",
        component: () => import("@/components/MyTickets.vue"),
        name: "myTickets",
      },

      {
        path: "master-exams",
        component: () => import("@/components/Master/ExamsList.vue"),
        name: "masterExams",
      },
      {
        path: "my-counseling",
        component: () => import("@/components/MyCounseling.vue"),
        name: "myCounseling",
      },
      {
        path: "exam-request",
        component: () => import("@/components/ExamRequest.vue"),
        name: "examRequest",
      },
      {
        path: "master/add-meeting",
        component: () => import("@/components/Master/AddMeeting.vue"),
        name: "addMeeting",
      },
      {
        path: "master/consultations-list",
        component: () => import("@/components/Master/ConsultationsList.vue"),
        name: "consultationsList",
      },
      {
        path: "master/show-meetings",
        component: () => import("@/components/Master/ShowMeetings.vue"),
        name: "showMeetings",
      },
      {
        path: "admin/discount-list",
        component: () => import("@/components/Admin/DiscountList.vue"),
        name: "discountList",
      },
      {
        path: "admin/masters-list",
        component: () => import("@/components/Admin/MastersList.vue"),
        name: "mastersList",
      },
      {
        path: "admin/meetings-list",
        component: () => import("@/components/Admin/MeetingsList.vue"),
        name: "meetingsList",
      },
      {
        path: "admin/consultations-list",
        component: () => import("@/components/Admin/ConsultationsList.vue"),
        name: "consultationsListAdmin",
      },
      {
        path: "admin/questions-List",
        component: () => import("@/components/Admin/QuestionsList.vue"),
        name: "questionsList",
      },
      {
        path: "admin/question-items-list",
        component: () => import("@/components/Admin/QuestionItemsList.vue"),
        name: "questionItemsList",
      },
      {
        path: "admin/masters-info",
        component: () => import("@/components/Admin/MastersInfo.vue"),
        name: "mastersInfo",
      },
      {
        path: "admin/ticket-list",
        component: () => import("@/components/Admin/TicketList.vue"),
        name: "ticketList",
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/LoginLayout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to, from);
  const myStorage = localStorage.getItem("UserStore");
  console.log("document", appVersion);
  // console.log("asdasd", document.referrer);
  // console.log("sargrre", window.location);
  handleNewVersion();
  if (to.name != "login") {
    if (!myStorage) {
      next({ name: "login" });
    }
    // else if (
    //   !useUserStore().user.isInfoComplete &&
    //   useUserStore().user.Type != 3 &&
    //   to.name != "userInfo"
    // ) {
    //   Notify.create({
    //     message: "لطفا پروفایل خود را تکمیل کنید و سپس ادامه دهید ...",
    //     position: "top",
    //     timeout: 1500,
    //     progress: true,
    //     color: "warning",
    //   });
    //   next({ name: "userInfo" });
    // }
    else next();
  } else next();
});
export default router;
