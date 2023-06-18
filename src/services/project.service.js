import {
  ApiConst,
  Discount,
  Exams,
  Requests,
  Meetings,
  // Master,
  Questions,
  Admin,
  User,
  QuestionItem,
  Ticket,
} from "../helpers/api-constant";
import httpConfig from "../helpers/http.config.js";

class projectService {
  async Register1(registerModel) {
    return await httpConfig.post(ApiConst.Register, { ...registerModel });
  }
  async UserRegister(registerModel) {
    return await httpConfig.post(User.Register, { ...registerModel });
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
  async AdminGetQuestionItemsList(QuestionID) {
    return await httpConfig.post(Admin.AdminGetQuestionItemsList, {
      QuestionID,
    });
  }
  async UserGetQuestionItemsList(ExamID) {
    return await httpConfig.post(QuestionItem.GetQuestionItemsList, {
      ExamID,
    });
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
  async AddQuestion(addQuestionModel) {
    return await httpConfig.post(Admin.AddQuestion, {
      ...addQuestionModel,
    });
  }
  async EditQuestion(editQuestionModel) {
    return await httpConfig.post(Admin.EditQuestion, {
      ...editQuestionModel,
    });
  }
  async DeleteQuestion(ID) {
    return await httpConfig.post(Admin.DeleteQuestion, {
      ID,
    });
  }
  async GetExamsList() {
    return await httpConfig.post(Admin.GetExamsList);
  }
  async QuestionsList() {
    return await httpConfig.post(Questions.List);
  }
  async ExamRequest(examRequestModel) {
    return await httpConfig.post(Exams.ExamRequest, { ...examRequestModel });
  }
  async ExamPayment(examPayModel) {
    return await httpConfig.post(Exams.ExamPayment, { ...examPayModel });
  }
  async ExamResult(ExamID) {
    return await httpConfig.post(Exams.ExamResult, {
      ExamID,
    });
  }
  async ExamsCalculateResult(ExamCalculateResultModel) {
    return await httpConfig.post(Exams.ExamsCalculateResult, {
      ...ExamCalculateResultModel,
    });
  }

  async ExamAsnwerSaveDraft(ExamAsnwerSaveDraftModel) {
    return await httpConfig.post(Exams.ExamAsnwerSaveDraft, {
      ...ExamAsnwerSaveDraftModel,
    });
  }

  async SendTicket(SendTicketModel) {
    return await httpConfig.post(Ticket.SendTicket, {
      ...SendTicketModel,
    });
  }

  async EditTicket(EditTicketModel) {
    return await httpConfig.post(Ticket.EditTicket, {
      ...EditTicketModel,
    });
  }

  async DeleteTicket(ID) {
    return await httpConfig.post(Ticket.DeleteTicket, {
      ID,
    });
  }

  async AnswerTicket(AnswerTicketModel) {
    return await httpConfig.post(Ticket.AnswerTicket, {
      ...AnswerTicketModel,
    });
  }

  async GetUserTickets() {
    return await httpConfig.post(Ticket.GetUserTickets);
  }
  async GetTicketsList() {
    return await httpConfig.post(Admin.GetTicketsList);
  }
  async AdminEditTicket(AdminEditTicketModel) {
    return await httpConfig.post(Admin.AdminEditTicket, {
      ...AdminEditTicketModel,
    });
  }

  async AdminDeleteTicket(ID) {
    return await httpConfig.post(Admin.AdminDeleteTicket, {
      ID,
    });
  }
}
export default new projectService();
