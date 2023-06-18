import moment from "jalali-moment";

const dayNames = [
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
];

const monthNames = [
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

export function setDateStr(date) {
  const m = moment(date, "YYYY/MM/DD HH:mm");
  console.log(m.format("MM"));
  console.log(m.format("DD"));
  console.log();
  console.log(monthNames[parseInt(m.format("MM") - 1)]);
  console.log(dayNames[parseInt(m.day())]);
  return `${dayNames[parseInt(m.day())]}، ${m.format("DD")} ${
    monthNames[parseInt(m.format("MM") - 1)]
  } ساعت ${date.split(" ")[1]}`;
}
