import Login from "src/pages/Login";
import FAQ from "src/pages/FAQ";
import User from "src/pages/User";
import Form from "src/pages/User/Form";
import {
  NormalRoute,
  AuthorizedRoute
} from "src/components/AclRouter/AclRouter";
import Unauthorized from "src/pages/Unauthorized";
import AuthorizedLayout from "src/layouts/BasicLayout";
import NormalLayout from "src/layouts/NormalLayout";
import NotFound from "src/pages/NotFound";

export const normalRoutes: NormalRoute[] = [
  {
    path: "/faq",
    component: FAQ,
    title: "FAQ"
  },
  {
    path: "/user",
    component: NormalLayout,
    title: "用户",
    routes: [
      {
        path: "/user/login",
        component: Login,
        title: "登录"
      },
      {
        component: NotFound
      }
    ]
  }
];

export const authorizedRoutes: AuthorizedRoute[] = [
  {
    path: "/",
    component: AuthorizedLayout,
    permissions: ["admin"],
    breadcrumb: ["/"],
    title: "首页",
    unauthorized: Unauthorized,
    routes: [
      {
        path: "/dashboard",
        permissions: ["admin"],
        breadcrumb: ["/dashboard"],
        title: "dashboard",
        unauthorized: Unauthorized,
        routes: [
          {
            path: "/dashboard/user",
            component: User,
            exact: true,
            permissions: ["admin"],
            breadcrumb: ["/dashboard", "/dashboard/user"],
            title: "用户",
            unauthorized: Unauthorized
          },
          {
            path: "/dashboard/form",
            component: Form,
            exact: true,
            permissions: ["user"],
            breadcrumb: ["/dashboard", "/dashboard/form"],
            title: "表单",
            unauthorized: Unauthorized
          },
          {
            component: NotFound
          }
        ]
      },
      {
        path: "/billboard",
        permissions: ["admin"],
        breadcrumb: ["/billboard"],
        title: "billboard",
        unauthorized: Unauthorized,
        routes: [
          {
            path: "/billboard/user",
            component: User,
            exact: true,
            permissions: ["user"],
            breadcrumb: ["/billboard", "/billboard/user"],
            title: "用户",
            unauthorized: Unauthorized
          },
          {
            path: "/billboard/form",
            component: Form,
            exact: true,
            permissions: ["admin"],
            breadcrumb: ["/billboard", "/billboard/form"],
            title: "表单",
            unauthorized: Unauthorized
          },
          {
            component: NotFound
          }
        ]
      }
    ]
  }
];

export const combineRoutes = [...normalRoutes, ...authorizedRoutes];
