import head from "lodash/head";
import { combineRoutes } from "src/config/routes";
import {
  AuthorizedRoute,
  NormalRoute
} from "src/components/AclRouter/AclRouter";

// todo 还要做好params参数的正则校验匹配
const filteRouteData = (
  result: Array<NormalRoute & AuthorizedRoute>,
  routes: Array<NormalRoute & AuthorizedRoute>,
  path: string
) => {
  const headParam = head<NormalRoute & AuthorizedRoute>(
    routes.filter(route => {
      if (route.routes) {
        filteRouteData(result, route.routes, path);
      }
      return route.path === path;
    })
  );

  if (headParam) {
    result.push(headParam);
  }
};

type GenerateBreadcrumbType = (
  Breadcrumb: string[]
) => Array<{ text: string; href: string }>;

const generateBreadcrumb: GenerateBreadcrumbType = breadcrumb => {
  const result: Array<NormalRoute & AuthorizedRoute> = [];
  breadcrumb.forEach(path => {
    filteRouteData(result, combineRoutes, path);
  });
  return result.map(route => {
    return {
      text: (route && route.title) || "",
      href: route.path!
    };
  });
};

export default generateBreadcrumb;
