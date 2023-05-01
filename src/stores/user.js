import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    user: {
      ID: "",
      UserName: "",
      DisplayName: "",
      Name: "",
      Family: "",
      Mobile: "",
      Phone: "",
      City: "",
      Address: "",
      isMaile: null,
      isInfoComplete: null,
      BithDate: "",
      DateCreate: "",
      DateLastLogIn: "",
      Status: null,
      ImgAddress: "",
      IsUserNameIsMobile: null,
      IsSingle: null,
      Job: "",
      Religion: "",
      Language: "",
      Nasionality: "",
      Education: "",
      BirthPlace: "",
      IsVisible: null,
      Type: null,
      TTKK: "",
      isMaster: false,
    },
    lastMeetingRequest: null,
    isMaster: false,
    master: null,
    mastersList: [],
    meetingsList: [],
    testsList: [],
  }),
  actions: {},
  getters: {
    isLogin: () => {
      const user = localStorage.getItem("user");
      return user?.ID != "" && user?.UserName != "";
    },
    userType: () => {
      const user = localStorage.getItem("user");
      return user?.Type;
    },
  },
  persist: {
    storage: localStorage,
    paths: ["user"],
  },
});
