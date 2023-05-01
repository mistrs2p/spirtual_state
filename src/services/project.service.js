import {
  ApiConst,
  Discount,
  Exams,
  Requests,
  Meetings,
  Master,
  Questions,
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
  async EditMasterMeeting(MeetingModel) {
    return await httpConfig.post(Meetings.EditMasterMeeting, {
      ...MeetingModel,
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
    return await httpConfig.post(Discount.GetDiscountsList);
  }
  async GetAllMasters() {
    return await httpConfig.post(Master.GetAllMasters);
  }
  async GetAllMeetings() {
    return await httpConfig.post(Meetings.GetAllMeetings);
  }
  async GetConsultanceRequestList() {
    return await httpConfig.post(Requests.GetConsultanceRequestList);
  }
  async GetQuestionsList() {
    return await httpConfig.post(Questions.GetQuestionsList);
  }
  async GetQuestionItemsList() {
    return await httpConfig.post(Questions.GetQuestionItemsList);
  }
}
export default new projectService();
