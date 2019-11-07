import head from "lodash/head";
import { combineRoutes } from "src/config/routes";
import {
  AuthorizedRoute,
  NormalRoute
} from "src/components/AclRouter/AclRouter";

type RouteModel = NormalRoute & AuthorizedRoute;
type RouteModelList = Array<RouteModel>;

// todo 还要做好params参数的正则校验匹配
const filteRouteData = (
  result: RouteModelList,
  routes: RouteModelList,
  path: string
) => {
  const headParam = head<RouteModel>(
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
  const result: RouteModelList = [];
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
