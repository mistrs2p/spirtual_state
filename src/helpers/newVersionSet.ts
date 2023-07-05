import { Notify } from "quasar";
import { appVersion } from "../main";

export const handleNewVersion = () => {
  const myVersion = localStorage.getItem("version");
  const myEnvVersion = process.env.VUE_APP_VERSION;
  console.log(myEnvVersion, myVersion, appVersion);
  if (!myVersion || (myVersion && myVersion != appVersion)) {
    localStorage.setItem("version", appVersion);
    Notify.create({
      message: "نسخه جدید دریافت شده، سایت بروز رسانی میشود ...",
      position: "top",
      timeout: 2000,
      progress: true,
      color: "secondary",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    return;
  }
};
