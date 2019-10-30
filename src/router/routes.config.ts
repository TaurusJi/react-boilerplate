import HomePage from "src/pages/HomePage";
import Login from "src/pages/Login";
import User from "src/pages/User";
import {
  NormalRoute,
  AuthorizedRoute
} from "src/components/AclRouter/AclRouter";
import NotAuthorize from "src/components/NotAuthorize";

// 登录前白名单
export const whiteList: string[] = [];
// 登录后黑名单
export const blackList: string[] = [];

export const normalRoutes: NormalRoute[] = [
  { path: "/login", exact: true, component: Login }
];

export const authorizedRoutes: AuthorizedRoute[] = [
  {
    path: "/",
    exact: true,
    redirect: "/dashboard",
    component: HomePage,
    permissions: ["admin"],
    breadcrumb: [],
    unauthorized: NotAuthorize
  },
  {
    path: "/dashboard/user",
    component: User,
    permissions: ["admin"],
    breadcrumb: [],
    unauthorized: NotAuthorize
  }
];
