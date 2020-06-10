import head from "lodash/head";
import { routes } from "src/config/routes";
import { pathToRegexp } from "path-to-regexp";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import { isNil } from "lodash-es";

const filterRouteData = (
  result: RouteModel[],
  routes: RouteModel[],
  path: string
) => {
  const param = routes.filter((route) => {
    if (route.routes) {
      filterRouteData(result, route.routes, path);
    }
    if (route.path) {
      const pathRegexp = pathToRegexp(route.path);
      const exec = pathRegexp.exec(path);
      if (exec) {
        // 正则exec方法返回的数组的第二个下标开始他后面的参数是捕获分组参数
        const [, ...group] = exec;
        // 这里判断不能有匹配项，如果匹配到了则返回false，让面包屑导航栏不显示匹配的参数
        const test = group.every(isNil);
        if (!test) {
          return false;
        }
      }

      return pathRegexp.test(path);
    } else {
      return false;
    }
  });
  const headParam = head<RouteModel>(param);

  if (headParam) {
    result.push(headParam);
  }
};

type GenerateBreadcrumbType = (
  Breadcrumb: string[]
) => Array<{ name: string; href: string }>;

const generateBreadcrumb: GenerateBreadcrumbType = (breadcrumb) => {
  const result: RouteModel[] = [];
  breadcrumb.forEach((path) => {
    filterRouteData(result, routes, path);
  });
  return result.map((route) => ({
    name: (route && route.name) || "",
    href: route.path!,
  }));
};

export default generateBreadcrumb;
