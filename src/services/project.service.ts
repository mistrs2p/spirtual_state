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
import httpConfig from "../helpers/http.config";

class projectService {
  async Register1(registerModel: object) {
    return await httpConfig.post(ApiConst.Register, { ...registerModel });
  }
  async UserRegister(registerModel: object) {
    return await httpConfig.post(User.Register, { ...registerModel });
  }
  async Login(loginModel: object) {
    return await httpConfig.post(ApiConst.Login, { ...loginModel });
  }
  async UserInfoCompletion(userInfoModel: object) {
    return await httpConfig.post(ApiConst.UserInfoCompletion, {
      ...userInfoModel,
    });
  }
  async UserChangePassword(passwordModel: object) {
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
  async GetMasterMeetings(MasterID: string | number) {
    return await httpConfig.post(Meetings.GetMasterMeetings, {
      MasterID,
    });
  }
  async GetMasterMeetingsForMaster(MasterID: string | number) {
    return await httpConfig.post(Meetings.GetMasterMeetingsForMaster, {
      MasterID,
    });
  }
  async GetUserDiscounts() {
    return await httpConfig.get(Discount.GetUserDiscounts);
  }
  async ConsultanceRequest(consultRequestModel: object) {
    return await httpConfig.post(Requests.ConsultanceRequest, {
      ...consultRequestModel,
    });
  }
  async ConsultancePayment(consultConsultancePaymentModel: object) {
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
  async AddMeeting(addMeetingModel: object) {
    return await httpConfig.post(Meetings.AddMeeting, { ...addMeetingModel });
  }
  async DeleteMasterMeeting(MeetingID: string | number) {
    return await httpConfig.post(Meetings.DeleteMasterMeeting, {
      MeetingID,
    });
  }
  async EditMasterMeeting(editMeetingModel: object) {
    return await httpConfig.post(Meetings.EditMasterMeeting, {
      ...editMeetingModel,
    });
  }
  async CheckRequestPay(RequestID: string | number) {
    return await httpConfig.post(Requests.CheckRequestPay, { RequestID });
  }
  async GetMasterConsultances() {
    return await httpConfig.post(Requests.GetMasterConsultances);
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
  async AdminGetQuestionItemsList(QuestionID: string | number) {
    return await httpConfig.post(Admin.AdminGetQuestionItemsList, {
      QuestionID,
    });
  }
  async UserGetQuestionItemsList(ExamID: string | number) {
    return await httpConfig.post(QuestionItem.GetQuestionItemsList, {
      ExamID,
    });
  }
  async GetMastersInfo(masterInfoModel: object) {
    return await httpConfig.post(Admin.GetMastersInfo, { ...masterInfoModel });
  }
  async DeleteMaster(MasterID: string | number) {
    return await httpConfig.post(Admin.DeleteMaster, { MasterID });
  }
  async GetUsersList() {
    return await httpConfig.post(Admin.GetUsersList);
  }
  async DeleteDiscount(ID: string | number) {
    return await httpConfig.post(Admin.DeleteDiscount, { ID });
  }
  async AddDiscount(addDiscountModel: object) {
    return await httpConfig.post(Admin.AddDiscount, {
      ...addDiscountModel,
    });
  }
  async EditMaster(editMasterModel: object) {
    return await httpConfig.post(Admin.EditMaster, {
      ...editMasterModel,
    });
  }
  async AddMaster(addMasterModel: object) {
    return await httpConfig.post(Admin.AddMaster, {
      ...addMasterModel,
    });
  }
  async EditDiscount(editDiscountModel: object) {
    return await httpConfig.post(Admin.EditDiscount, {
      ...editDiscountModel,
    });
  }
  async DeleteMeeting(MeetingID: string | number) {
    return await httpConfig.post(Admin.DeleteMeeting, {
      MeetingID,
    });
  }
  async EditMeeting(editMeetingModel: object) {
    return await httpConfig.post(Admin.EditMeeting, {
      ...editMeetingModel,
    });
  }
  async AddMeetingAdmin(adminAddMeetingModel: object) {
    return await httpConfig.post(Admin.AddMeeting, {
      ...adminAddMeetingModel,
    });
  }
  async AddConsultanceRequest(adminAddConsultModel: object) {
    return await httpConfig.post(Admin.AddConsultanceRequest, {
      ...adminAddConsultModel,
    });
  }
  async EditConsultanceRequest(adminEditConsultModel: object) {
    return await httpConfig.post(Admin.EditConsultanceRequest, {
      ...adminEditConsultModel,
    });
  }
  async DeleteConsultanceRequest(ID: string | number) {
    return await httpConfig.post(Admin.DeleteConsultanceRequest, {
      ID,
    });
  }
  async AddQuestion(addQuestionModel: object) {
    return await httpConfig.post(Admin.AddQuestion, {
      ...addQuestionModel,
    });
  }
  async EditQuestion(editQuestionModel: object) {
    return await httpConfig.post(Admin.EditQuestion, {
      ...editQuestionModel,
    });
  }
  async DeleteQuestion(ID: string | number) {
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
  async ExamRequest(examRequestModel: object) {
    return await httpConfig.post(Exams.ExamRequest, { ...examRequestModel });
  }
  async ExamPayment(examPayModel: object) {
    return await httpConfig.post(Exams.ExamPayment, { ...examPayModel });
  }
  async ExamResult(ExamID: string | number) {
    return await httpConfig.post(Exams.ExamResult, {
      ExamID,
    });
  }
  async ExamsCalculateResult(ExamCalculateResultModel: object) {
    return await httpConfig.post(Exams.ExamsCalculateResult, {
      ...ExamCalculateResultModel,
    });
  }

  async ExamAsnwerSaveDraft(ExamAsnwerSaveDraftModel: object) {
    return await httpConfig.post(Exams.ExamAsnwerSaveDraft, {
      ...ExamAsnwerSaveDraftModel,
    });
  }

  async SendTicket(SendTicketModel: object) {
    return await httpConfig.post(Ticket.SendTicket, {
      ...SendTicketModel,
    });
  }

  async EditTicket(EditTicketModel: object) {
    return await httpConfig.post(Ticket.EditTicket, {
      ...EditTicketModel,
    });
  }

  async DeleteTicket(ID: string | number) {
    return await httpConfig.post(Ticket.DeleteTicket, {
      ID,
    });
  }

  async AnswerTicket(AnswerTicketModel: object) {
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
  async AdminEditTicket(AdminEditTicketModel: object) {
    return await httpConfig.post(Admin.AdminEditTicket, {
      ...AdminEditTicketModel,
    });
  }

  async AdminDeleteTicket(ID: string | number) {
    return await httpConfig.post(Admin.AdminDeleteTicket, {
      ID,
    });
  }
  async SendSMS(SendSMSModel: object) {
    return await httpConfig.post(Admin.SendSMS, {
      ...SendSMSModel,
    });
  }
  async ForgotPasswordStep1(ForgotPasswordStep1Model: object) {
    return await httpConfig.post(User.ForgotPasswordStep1, {
      ...ForgotPasswordStep1Model,
    });
  }
  async ForgotPasswordStep2(ForgotPasswordStep2Model: object) {
    return await httpConfig.post(User.ForgotPasswordStep2, {
      ...ForgotPasswordStep2Model,
    });
  }
  async ForgotPasswordFinalStep(ForgotPasswordFinalStepModel: object) {
    return await httpConfig.post(User.ForgotPasswordFinalStep, {
      ...ForgotPasswordFinalStepModel,
    });
  }
}
export default new projectService();
