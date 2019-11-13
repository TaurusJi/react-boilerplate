import { isEqual } from "lodash";
import memoizeOne from "memoize-one";
import { RouteModel } from "src/components/AclRouter/AclRouter";

const getBreadcrumbNameMap = (
  menuData: RouteModel[]
): { [key: string]: RouteModel } => {
  const routerMap: { [key: string]: RouteModel } = {};
  const flattenMenuData: (data: RouteModel[]) => void = data => {
    data.forEach(menuItem => {
      if (!menuItem) {
        return;
      }
      if (menuItem && menuItem.routes) {
        flattenMenuData(menuItem.routes);
      }
      // Reduce memory usage
      if (menuItem.path) {
        routerMap[menuItem.path] = menuItem;
      }
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

// Conversion router to menu.
function formatter(props: { data: RouteModel[] }): RouteModel[] {
  const { data } = props;
  return data.filter(item => item && item.name && item.path);
}

const defaultFilterMenuData = (menuData: RouteModel[] = []): RouteModel[] =>
  menuData
    .filter(item => item && item.name && !item.hideInMenu)
    .map(item => {
      if (
        item.routes &&
        Array.isArray(item.routes) &&
        !item.hideChildrenInMenu &&
        item.routes.some(child => child && !!child.name)
      ) {
        const routes = defaultFilterMenuData(item.routes);
        if (routes.length) return { ...item, routes };
      }
      return { ...item, routes: undefined };
    });

const memoizeOneGetBreadcrumbNameMap = memoizeOne(
  getBreadcrumbNameMap,
  isEqual
);

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

export default (routes: RouteModel[]) => {
  const originalMenuData = memoizeOneFormatter({
    data: routes
  });
  const menuData = defaultFilterMenuData(originalMenuData);
  const breadcrumb = memoizeOneGetBreadcrumbNameMap(routes);
  return { breadcrumb, menuData };
};
