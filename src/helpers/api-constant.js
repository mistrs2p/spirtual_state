export const ApiConst = Object.freeze({
  Register: "Register",
  Login: "Login",
  UserInfoCompletion: "User/InfoCompletion",
  Masters: "Masters",
  Meetings: "Meetings",
  GetMasterMeetings: "Meetings/GetMasterMeetings",
  UserChangePassword: "User/ChangePassword",
  UserTests: "Exams/GetUserExams",
});
export const Discount = Object.freeze({
  GetUserDiscounts: "Discounts/GetUserDiscounts",
  GetDiscountsList: "Discounts/GetDiscountsList",
});
export const Requests = Object.freeze({
  ConsultanceRequest: "Requests/ConsultanceRequest",
  ConsultancePayment: "Requests/ConsultancePayment",
  GetUserConsultanceRequests: "Requests/GetUserConsultanceRequests",
  CheckRequestPay: "Requests/CheckRequestPay",
  GetMasterConsultances: "Requests/GetMasterConsultances",
  GetConsultanceRequestList: "Requests/GetConsultanceRequestList",
});
export const Exams = Object.freeze({
  GetUserExams: "Exams/GetUserExams",
  GetMasterExams: "Exams/GetMasterExams",
});
export const Meetings = Object.freeze({
  AddMeeting: "Meetings/AddMeeting",
  GetMasterMeetings: "Meetings/GetMasterMeetings",
  DeleteMasterMeeting: "Meetings/DeleteMasterMeeting",
  EditMasterMeeting: "Meetings/EditMasterMeeting",
  GetMasterMeetingsForMaster: "Meetings/GetMasterMeetingsForMaster",
  GetAllMeetings: "Meetings/GetAllMeetings",
});
export const Master = Object.freeze({
  GetAllMasters: "GetAllMasters",
});

export const Questions = Object.freeze({
  GetQuestionsList: "Questions/GetQuestionsList",
  GetQuestionItemsList: "Questions/GetQuestionItemsList",
});
