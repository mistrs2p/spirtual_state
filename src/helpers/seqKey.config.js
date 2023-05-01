import CryptoJS from "crypto-js";
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toDate = new Date();
const day = toDate.getUTCDate();
const month = toDate.getUTCMonth() + 1;
const hours = toDate.getUTCHours();
const year = toDate.getUTCFullYear();
const myKey =
  year +
  "-" +
  month +
  "-" +
  day +
  "-" +
  hours +
  "-" +
  weekday[toDate.getUTCDay()];

export const seqKey = CryptoJS.SHA512(CryptoJS.enc.Utf8.parse(myKey)).toString(
  CryptoJS.enc.Hex
);
