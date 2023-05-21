import { Notify } from "quasar";

export const handleNewVersion = () => {
  const myVersion = localStorage.getItem("version");
  const myEnvVersion = process.env.VUE_APP_VERSE;
  if (!myVersion || (myVersion && myVersion != myEnvVersion)) {
    localStorage.setItem("version", myEnvVersion);
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
