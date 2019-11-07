import head from "lodash/head";
import { routes } from "src/config/routes";
import { RouteModel } from "src/components/AclRouter/AclRouter";

// todo 还要做好params参数的正则校验匹配
const filteRouteData = (
  result: RouteModel[],
  routes: RouteModel[],
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
  const result: RouteModel[] = [];
  breadcrumb.forEach(path => {
    filteRouteData(result, routes, path);
  });
  return result.map(route => {
    return {
      text: (route && route.name) || "",
      href: route.path!
    };
  });
};

export default generateBreadcrumb;
