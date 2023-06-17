import { Notify } from "quasar";
import { appVersion } from "../main";

export const handleNewVersion = () => {
  const myVersion = localStorage.getItem("version");
  const myEnvVersion = appVersion;
  console.log(myEnvVersion, myVersion);
  if (myVersion == null || (myVersion != null && myVersion != myEnvVersion)) {
    localStorage.setItem("version", myEnvVersion);
    Notify.create({
      message: "نسخه جدید دریافت شده، سایت بروز رسانی میشود ...",
      position: "top",
      timeout: 2000,
      progress: true,
      color: "secondary",
    });
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  } else {
    return;
  }
};
