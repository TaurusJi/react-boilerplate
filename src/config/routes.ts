import HomePage from "src/pages/HomePage";
import Login from "src/pages/Login";
import FAQ from "src/pages/FAQ";
import User from "src/pages/User";
import Form from "src/pages/User/Form";
import {
  NormalRoute,
  AuthorizedRoute
} from "src/components/AclRouter/AclRouter";
import Unauthorized from "src/pages/Unauthorized";

export const normalRoutes: NormalRoute[] = [
  { path: "/", exact: true, redirect: "/dashboard/user" },
  { path: "/login", exact: true, component: Login, title: "登录" },
  { path: "/faq", exact: true, component: FAQ, title: "FAQ" }
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
  },
  {
    path: "/dashboard/form",
    exact: true,
    component: Form,
    permissions: ["admin"],
    breadcrumb: ["/dashboard", "/dashboard/form"],
    title: "表单",
    unauthorized: Unauthorized
  }
];

export const combineRoutes = [...normalRoutes, ...authorizedRoutes];
