import HomePage from "src/pages/HomePage";
import Login from "src/pages/Login";
import User from "src/pages/User";

export default [
  { path: "/", component: HomePage, exact: true, requiresAuth: false },
  { path: "/login", component: Login, requiresAuth: false },
  { path: "/user", component: User, requiresAuth: true },
  {
    redirect: "/"
  }
];
