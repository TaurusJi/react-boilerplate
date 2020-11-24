import { lazy } from "react";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import Loading from "src/components/Suspense/Loading";

export const pages = {
  AuthorizedLayout: lazy(() => import("src/layouts/BasicLayout")),
  NormalLayout: lazy(() => import("src/layouts/NormalLayout")),
  Unauthorized: lazy(() => import("src/pages/Unauthorized")),
  NotFound: lazy(() => import("src/pages/NotFound")),
  DefaultLayout: lazy(() => import("src/components/AclRouter/DefaultLayout")),
  DefaultNotFound: lazy(
    () => import("src/components/AclRouter/DefaultNotFound")
  ),
  FAQ: lazy(() => import("src/pages/FAQ")),
  Login: lazy(() => import("src/pages/Login")),
  User: lazy(() => import("src/pages/User")),
  Form: lazy(() => import("src/pages/User/Form")),
};

export const routes: RouteModel[] = [
  {
    path: "/faq",
    component: pages.FAQ,
    name: "FAQ",
  },
  {
    path: "/user",
    component: pages.NormalLayout,
    suspense: Loading,
    name: "用户",
    routes: [
      {
        path: "/user/login",
        component: pages.Login,
        exact: true,
        name: "登录",
      },
      {
        path: "/user",
        redirect: "/user/login",
        exact: true,
      },
      {
        component: pages.NotFound,
      },
    ],
  },
  {
    path: "/",
    component: pages.AuthorizedLayout,
    permissions: ["admin"],
    suspense: Loading,
    name: "首页",
    unauthorized: pages.Unauthorized,
    routes: [
      {
        path: "/dashboard",
        permissions: ["admin"],
        name: "仪表盘",
        icon: "dashboard",
        unauthorized: pages.Unauthorized,
        routes: [
          {
            path: "/dashboard/user",
            component: pages.User,
            exact: true,
            permissions: ["admin"],
            name: "用户",
            unauthorized: pages.Unauthorized,
          },
          {
            path: "/dashboard/form",
            component: pages.Form,
            exact: true,
            permissions: ["user"],
            name: "表单",
            unauthorized: pages.Unauthorized,
          },
          {
            path: "/dashboard",
            redirect: "/dashboard/user",
            exact: true,
          },
          {
            component: pages.NotFound,
          },
        ],
      },
      {
        path: "/billboard",
        permissions: ["admin"],
        name: "排行榜",
        icon: "dashboard",
        unauthorized: pages.Unauthorized,
        routes: [
          {
            path: "/billboard/user",
            component: pages.User,
            exact: true,
            permissions: ["user"],
            name: "用户",
            unauthorized: pages.Unauthorized,
          },
          {
            path: "/billboard/form",
            component: pages.Form,
            exact: true,
            permissions: ["admin"],
            name: "表单",
            unauthorized: pages.Unauthorized,
          },
          {
            path: "/billboard",
            redirect: "/billboard/user",
            exact: true,
          },
          {
            component: pages.NotFound,
          },
        ],
      },
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        component: pages.NotFound,
      },
    ],
  },
];
