import head from "lodash/head";
import { routes } from "src/config/routes";
import { RouteModel } from "src/components/AclRouter/AclRouter";

const filterRouteData = (
  result: RouteModel[],
  routes: RouteModel[],
  path: string
) => {
  const headParam = head<RouteModel>(
    routes.filter(route => {
      if (route.routes) {
        filterRouteData(result, route.routes, path);
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
) => Array<{ name: string; href: string }>;

const generateBreadcrumb: GenerateBreadcrumbType = breadcrumb => {
  const result: RouteModel[] = [];
  breadcrumb.forEach(path => {
    filterRouteData(result, routes, path);
  });
  return result.map(route => ({
    name: (route && route.name) || "",
    href: route.path!
  }));
};

export default generateBreadcrumb;
