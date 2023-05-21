import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import projectService from "../services/project.service.js";

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
  console.log(to);
  if (to.name != "login") {
    localStorage.getItem("UserStore") ? next() : next({ name: "login" });
  } else next();
});
export default router;
