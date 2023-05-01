export const handleNewVersion = () => {
  const myVersion = localStorage.getItem("version");
  const myEnvVersion = process.env.VUE_APP_VERSE;
  if (!myVersion || (myVersion && myVersion != myEnvVersion)) {
    localStorage.setItem("version", myEnvVersion);
    // window.location.reload();
  } else {
    return;
  }
};
