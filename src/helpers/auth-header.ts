import interfaces from "@/interfaces/interfaces";

export function authHeader() {
  const myLocal: string | null = localStorage.getItem("UserStore");
  let UserStore: interfaces.spLocalStorage | null = null;
  if (myLocal !== null) {
    UserStore = JSON.parse(myLocal);
  }
  if (UserStore != null && UserStore.user.TTKK) {
    const token = UserStore.user.TTKK;
    const username = UserStore.user.UserName;
    return "Bearer " + token + ":" + username;
  } else {
    return "";
  }
}
