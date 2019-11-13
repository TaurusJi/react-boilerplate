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
    unauthorized: Unauthorized,
    routes: [
      {
        path: "/dashboard",
        permissions: ["admin"],
        name: "仪表盘",
        unauthorized: Unauthorized,
        routes: [
          {
            path: "/dashboard/user",
            component: User,
            exact: true,
            permissions: ["admin"],
            name: "用户",
            unauthorized: Unauthorized
          },
          {
            path: "/dashboard/form",
            component: Form,
            exact: true,
            permissions: ["user"],
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
        name: "排行榜",
        unauthorized: Unauthorized,
        routes: [
          {
            path: "/billboard/user",
            component: User,
            exact: true,
            permissions: ["user"],
            name: "用户",
            unauthorized: Unauthorized
          },
          {
            path: "/billboard/form",
            component: Form,
            exact: true,
            permissions: ["admin"],
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
