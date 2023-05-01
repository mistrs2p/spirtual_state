export function authHeader() {
  let UserStore = JSON.parse(localStorage.getItem("UserStore"));
  console.log(UserStore);
  if (UserStore && UserStore.user.TTKK) {
    const token = UserStore.user.TTKK;
    const username = UserStore.user.UserName;
    return "Bearer " + token + ":" + username;
  } else {
    return "";
  }
}
