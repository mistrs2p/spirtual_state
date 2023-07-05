import { defineStore } from "pinia";
import interfaces from "../interfaces/interfaces";

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
      isMaile: false,
      isInfoComplete: false,
      BirthDate: new Date(),
      DateCreate: new Date(),
      DateLastLogIn: new Date(),
      Status: false,
      ImgAddress: "",
      IsUserNameIsMobile: false,
      IsSingle: false,
      Job: "",
      Religion: "",
      Language: "",
      Nasionality: "",
      Education: "",
      BirthPlace: "",
      IsVisible: false,
      Type: 1,
      TTKK: "",
      isMaster: false,
    } as interfaces.LoginResponse,

    lastMeetingRequest: null,
    isMaster: false,
    master: null,
  }),
  actions: {},
  persist: {
    storage: localStorage,
    paths: ["user"],
  },
});
