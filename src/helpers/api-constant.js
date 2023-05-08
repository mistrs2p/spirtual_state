export const ApiConst = Object.freeze({
  Register: "Register",
  Login: "Login",
  UserInfoCompletion: "Users/InfoCompletion",
  Masters: "Masters",
  Meetings: "Meetings",
  GetMasterMeetings: "Meetings/GetMasterMeetings",
  UserChangePassword: "Users/ChangePassword",
  UserTests: "Exams/GetUserExams",
});
export const Discount = Object.freeze({
  GetUserDiscounts: "Discounts/GetUserDiscounts",
});
export const Requests = Object.freeze({
  ConsultanceRequest: "Requests/ConsultanceRequest",
  ConsultancePayment: "Requests/ConsultancePayment",
  GetUserConsultanceRequests: "Requests/GetUserConsultanceRequests",
  CheckRequestPay: "Requests/CheckRequestPay",
  GetMasterConsultances: "Requests/GetMasterConsultances",
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
});
export const Master = Object.freeze({});

export const Questions = Object.freeze({
  // GetQuestionItemsList: "Questions/GetQuestionItemsList",
});
export const Admin = Object.freeze({
  AddDiscount: "Admin/AddDiscount",
  GetMastersInfo: "Admin/GetMastersInfo",
  EditMaster: "Admin/EditMaster",
  EditDiscount: "Admin/EditDiscount",
  DeleteMeeting: "Admin/DeleteMeeting",
  GetAllMeetingsList: "Admin/GetAllMeetingsList",
  EditMeeting: "Admin/EditMeeting",
  GetDiscountsList: "Admin/GetDiscountsList",
  AddMeeting: "Admin/AddMeeting",
  DeleteDiscount: "Admin/DeleteDiscount",
  GetAllMastersList: "Admin/GetAllMastersList",
  DeleteMaster: "Admin/DeleteMaster",
  AddMaster: "Admin/AddMaster",
  GetQuestionsList: "Admin/GetQuestionsList",
  GetQuestionItemsList: "Admin/GetQuestionItemsList",

  GetConsultanceRequestList: "Admin/GetConsultanceRequestList",
  EditConsultanceRequest: "Admin/EditConsultanceRequest",
  DeleteConsultanceRequest: "Admin/DeleteConsultanceRequest",
  AddConsultanceRequest: "Admin/AddConsultanceRequest",
  GetUsersList: "Admin/GetUsersList",
});
export const User = Object.freeze({
  // GetUsersListAdmin: "Users/GetUsersListAdmin",
});
