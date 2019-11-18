import { RouteModel } from "src/components/AclRouter/AclRouter";

export const defaultFilterMenuData = (
  menuData: RouteModel[] = []
): RouteModel[] =>
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
