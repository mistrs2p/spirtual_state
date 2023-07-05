export enum UserType {
  User = 1,
  Master = 2,
  Admin = 3,
}

export enum QType {
  Cattell = 1,
  Raven = 2,
  InfoForm = 3,
  MeetingSummary = 4,
  Karbarg = 5,
  Millon = 6,
  CattellStress = 7,
  Yellbrown = 8,
  MBTI = 9,
  SCL90 = 10,
  Gardner = 11,
  Haland = 12,
  BeckDep = 13,
  Yang90 = 14,
}
export interface UserRegister {
  UserName: string;
  Password: string;
}

export interface UserLogin {
  UserName: string;
  Password: string;
}

export interface RegisterResponse {
  ID: string;
  UserName: string;
  DisplayName: string;
  Name: string;
  Family: string;
  Mobile: string;
  Phone: string;
  City: string;
  Address: string;
  isMaile: boolean;
  isInfoComplete: boolean;
  BirthDate: Date;
  DateCreate: Date;
  DateLastLogIn: Date;
  Status: boolean;
  ImgAddress: string;
  IsUserNameIsMobile: boolean;
  IsSingle: boolean;
  Job: string;
  Religion: string;
  Language: string;
  Nasionality: string;
  Education: string;
  BirthPlace: string;
  IsVisible: boolean;
  TTKK: string;
  Type: UserType;
}

export interface LoginResponse {
  ID: string;
  UserName: string;
  DisplayName: string;
  Name: string;
  Family: string;
  Mobile: string;
  Phone: string;
  City: string;
  Address: string;
  isMaile: boolean;
  isInfoComplete: boolean;
  BirthDate: Date;
  DateCreate: Date;
  DateLastLogIn: Date;
  Status: boolean;
  ImgAddress: string;
  IsUserNameIsMobile: boolean;
  IsSingle: boolean;
  Job: string;
  Religion: string;
  Language: string;
  Nasionality: string;
  Education: string;
  BirthPlace: string;
  IsVisible: boolean;
  TTKK: string;
  Type: UserType;
}

export interface ExamCalculateResultRequest {
  ExamID: string;
  Answers: string;
}

export interface MasterExamResponse {
  ID: string;
  Title: string;
  User: string;
  DateCreate: Date;
  Master: string;
  Question: string;
  IsExecuted: boolean;
  Answer: string;
  QType: QType;
}

export interface spLocalStorage {
  user: LoginResponse;
}

export interface sendSMS {
  Text: string;
  Mobile: string;
}
