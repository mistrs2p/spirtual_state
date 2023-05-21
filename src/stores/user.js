import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    user: {
      ID: null,
      UserName: null,
      DisplayName: null,
      Name: null,
      Family: null,
      Mobile: null,
      Phone: null,
      City: null,
      Address: null,
      isMaile: false,
      isInfoComplete: false,
      BirthDate: null,
      DateCreate: null,
      DateLastLogIn: null,
      Status: null,
      ImgAddress: null,
      IsUserNameIsMobile: false,
      IsSingle: false,
      Job: null,
      Religion: null,
      Language: null,
      Nasionality: null,
      Education: null,
      BirthPlace: null,
      IsVisible: false,
      Type: null,
      TTKK: null,
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
