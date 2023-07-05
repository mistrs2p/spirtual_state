import moment, { Moment } from "jalali-moment";

const dayNames: string[] = [
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

const monthNames: string[] = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function setDateStr(date: string) {
  const m: Moment = moment(date, "YYYY/MM/DD HH:mm");
  const returnData: string =
    dayNames[m.day()] +
    "، " +
    m.format("DD") +
    "" +
    monthNames[parseInt(m.format("MM")) - 1] +
    " ساعت " +
    date.split(" ")[1];
  return returnData;
}
