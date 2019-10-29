import HomePage from "src/pages/HomePage";
import Login from "src/pages/Login";
import User from "src/pages/User";
import {
  NormalRoute,
  AuthorizedRoute
} from "src/components/AclRouter/AclRouter";
import NotFound from "src/components/NotFound";

export const normalRoutes: NormalRoute[] = [
  { path: "/", component: HomePage, exact: true },
  { path: "/login", component: Login }
];

export const authorizedRoutes: AuthorizedRoute[] = [
  {
    path: "/user",
    component: User,
    permissions: ["admin"],
    unauthorized: NotFound
  }
];
