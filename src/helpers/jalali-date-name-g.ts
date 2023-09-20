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
  console.log(date);
  const m: Moment = moment(date, "YYYY/MM/DD HH:mm:ss");
  console.log(m);
  console.log(m.locale("fa").format("DD"));
  console.log(monthNames[parseInt(m.format("MM")) - 1]);
  const returnData: string =
    dayNames[m.day()] +
    "، " +
    m.locale("fa").format("DD") +
    "" +
    monthNames[parseInt(m.format("MM")) - 1] +
    " ساعت " +
    date.split(" ")[1];
  return returnData;
}
