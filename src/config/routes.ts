import Login from "src/pages/Login";
import FAQ from "src/pages/FAQ";
import User from "src/pages/User";
import Form from "src/pages/User/Form";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import Unauthorized from "src/pages/Unauthorized";
import AuthorizedLayout from "src/layouts/BasicLayout";
import NormalLayout from "src/layouts/NormalLayout";
import NotFound from "src/pages/NotFound";

export const routes: RouteModel[] = [
  {
    path: "/faq",
    component: FAQ,
    name: "FAQ"
  },
  {
    path: "/user",
    component: NormalLayout,
    name: "用户",
    routes: [
      {
        path: "/user/login",
        component: Login,
        name: "登录"
      },
      {
        component: NotFound
      }
    ]
  },
  {
    path: "/",
    component: AuthorizedLayout,
    permissions: ["admin"],
    name: "首页",
    breadcrumb: ["/"],
    unauthorized: Unauthorized,
    routes: [
      {
        path: "/dashboard",
        permissions: ["admin"],
        breadcrumb: ["/", "/dashboard"],
        name: "仪表盘",
        unauthorized: Unauthorized,
        routes: [
          {
            path: "/dashboard/user",
            component: User,
            exact: true,
            permissions: ["admin"],
            breadcrumb: ["/", "/dashboard", "/dashboard/user"],
            name: "用户",
            unauthorized: Unauthorized
          },
          {
            path: "/dashboard/form",
            component: Form,
            exact: true,
            permissions: ["user"],
            breadcrumb: ["/", "/dashboard", "/dashboard/form"],
            name: "表单",
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
        breadcrumb: ["/", "/billboard"],
        name: "排行榜",
        unauthorized: Unauthorized,
        routes: [
          {
            path: "/billboard/user",
            component: User,
            exact: true,
            permissions: ["user"],
            breadcrumb: ["/", "/billboard", "/billboard/user"],
            name: "用户",
            unauthorized: Unauthorized
          },
          {
            path: "/billboard/form",
            component: Form,
            exact: true,
            permissions: ["admin"],
            breadcrumb: ["/", "/billboard", "/billboard/form"],
            name: "表单",
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
