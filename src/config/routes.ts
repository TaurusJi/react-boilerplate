import HomePage from "src/pages/HomePage";
import Login from "src/pages/Login";
import User from "src/pages/User";
import {
  NormalRoute,
  AuthorizedRoute
} from "src/components/AclRouter/AclRouter";
import Unauthorized from "src/pages/Unauthorized";

// 登录前白名单
export const whiteList: string[] = [];
// 登录后黑名单
export const blackList: string[] = [];

export const normalRoutes: NormalRoute[] = [
  { path: "/", exact: true, redirect: "/dashboard" },
  { path: "/login", exact: true, component: Login, title: "登录" }
];

export const authorizedRoutes: AuthorizedRoute[] = [
  {
    path: "/dashboard",
    exact: true,
    component: HomePage,
    permissions: ["admin"],
    breadcrumb: ["/dashboard"],
    title: "dashboard",
    unauthorized: Unauthorized
  },
  {
    path: "/dashboard/user",
    exact: true,
    component: User,
    permissions: ["admin"],
    breadcrumb: ["/dashboard", "/dashboard/user"],
    title: "用户",
    unauthorized: Unauthorized
  }
];

export const combineRoutes = [...normalRoutes, ...authorizedRoutes];
