import {
  ApiConst,
  Discount,
  Exams,
  Requests,
  Meetings,
  Master,
  Questions,
  Admin,
  User,
} from "../helpers/api-constant";
import httpConfig from "../helpers/http.config.js";

class projectService {
  async Register(registerModel) {
    return await httpConfig.post(ApiConst.Register, { ...registerModel });
  }
  async Login(loginModel) {
    return await httpConfig.post(ApiConst.Login, { ...loginModel });
  }
  async UserInfoCompletion(userInfoModel) {
    return await httpConfig.post(ApiConst.UserInfoCompletion, {
      ...userInfoModel,
    });
  }
  async UserChangePassword(passwordModel) {
    return await httpConfig.post(ApiConst.UserChangePassword, {
      ...passwordModel,
    });
  }
  async Masters() {
    return await httpConfig.post(ApiConst.Masters);
  }
  async Meetings() {
    return await httpConfig.post(ApiConst.Meetings);
  }
  async UserTests() {
    return await httpConfig.post(ApiConst.UserTests);
  }
  async GetMasterMeetings(MasterID) {
    return await httpConfig.post(Meetings.GetMasterMeetings, {
      MasterID,
    });
  }
  async GetMasterMeetingsForMaster(MasterID) {
    return await httpConfig.post(Meetings.GetMasterMeetingsForMaster, {
      MasterID,
    });
  }
  async GetUserDiscounts() {
    return await httpConfig.get(Discount.GetUserDiscounts);
  }
  async ConsultanceRequest(consultRequestModel) {
    return await httpConfig.post(Requests.ConsultanceRequest, {
      ...consultRequestModel,
    });
  }
  async ConsultancePayment(consultConsultancePaymentModel) {
    return await httpConfig.post(Requests.ConsultancePayment, {
      ...consultConsultancePaymentModel,
    });
  }

  async GetUserExams() {
    return await httpConfig.post(Exams.GetUserExams);
  }
  async GetMasterExams() {
    return await httpConfig.post(Exams.GetMasterExams);
  }
  async GetUserConsultanceRequests() {
    return await httpConfig.post(Requests.GetUserConsultanceRequests);
  }
  async AddMeeting(addMeetingModel) {
    return await httpConfig.post(Meetings.AddMeeting, { ...addMeetingModel });
  }
  async DeleteMasterMeeting(MeetingID) {
    return await httpConfig.post(Meetings.DeleteMasterMeeting, {
      MeetingID,
    });
  }
  async EditMasterMeeting(editMeetingModel) {
    return await httpConfig.post(Meetings.EditMasterMeeting, {
      ...editMeetingModel,
    });
  }
  async CheckRequestPay(RequestID) {
    return await httpConfig.post(Requests.CheckRequestPay, { RequestID });
  }
  async GetMasterConsultances(MasterID) {
    return await httpConfig.post(Requests.GetMasterConsultances, {
      MasterID,
    });
  }
  async GetDiscountsList() {
    return await httpConfig.post(Admin.GetDiscountsList);
  }
  async GetAllMastersList() {
    return await httpConfig.post(Admin.GetAllMastersList);
  }
  async GetAllMeetingsList() {
    return await httpConfig.post(Admin.GetAllMeetingsList);
  }
  async GetConsultanceRequestList() {
    return await httpConfig.post(Admin.GetConsultanceRequestList);
  }
  async GetQuestionsList() {
    return await httpConfig.post(Admin.GetQuestionsList);
  }
  async GetQuestionItemsList(QuestionID) {
    return await httpConfig.post(Admin.GetQuestionItemsList, { QuestionID });
  }
  async GetMastersInfo(masterInfoModel) {
    return await httpConfig.post(Admin.GetMastersInfo, { ...masterInfoModel });
  }
  async DeleteMaster(MasterID) {
    return await httpConfig.post(Admin.DeleteMaster, { MasterID });
  }
  async GetUsersList() {
    return await httpConfig.post(Admin.GetUsersList);
  }
  async DeleteDiscount(ID) {
    return await httpConfig.post(Admin.DeleteDiscount, { ID });
  }
  async AddDiscount(addDiscountModel) {
    return await httpConfig.post(Admin.AddDiscount, {
      ...addDiscountModel,
    });
  }
  async EditMaster(editMasterModel) {
    return await httpConfig.post(Admin.EditMaster, {
      ...editMasterModel,
    });
  }
  async AddMaster(addMasterModel) {
    return await httpConfig.post(Admin.AddMaster, {
      ...addMasterModel,
    });
  }
  async EditDiscount(editDiscountModel) {
    return await httpConfig.post(Admin.EditDiscount, {
      ...editDiscountModel,
    });
  }
  async DeleteMeeting(MeetingID) {
    return await httpConfig.post(Admin.DeleteMeeting, {
      MeetingID,
    });
  }
  async EditMeeting(editMeetingModel) {
    return await httpConfig.post(Admin.EditMeeting, {
      ...editMeetingModel,
    });
  }
  async AddMeetingAdmin(adminAddMeetingModel) {
    return await httpConfig.post(Admin.AddMeeting, {
      ...adminAddMeetingModel,
    });
  }
  async AddConsultanceRequest(adminAddConsultModel) {
    return await httpConfig.post(Admin.AddConsultanceRequest, {
      ...adminAddConsultModel,
    });
  }
  async EditConsultanceRequest(adminEditConsultModel) {
    return await httpConfig.post(Admin.EditConsultanceRequest, {
      ...adminEditConsultModel,
    });
  }
  async DeleteConsultanceRequest(ID) {
    return await httpConfig.post(Admin.DeleteConsultanceRequest, {
      ID,
    });
  }
}
export default new projectService();
