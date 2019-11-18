import { RouteModel } from "src/components/AclRouter/AclRouter";
import { IMenu } from "src/components/Sider";

type FilterComplianceMenuData = Array<
  RouteModel & Required<Pick<RouteModel, "name" | "path">>
>;

export const defaultFilterMenuData = (menuData: RouteModel[] = []): IMenu[] => {
  // 筛掉 path和name为nil 且 hideInMenu为true的路由
  const filterComplianceMenuData = menuData.filter(
    item => item && !item.hideInMenu && item.path && item.name
  ) as FilterComplianceMenuData;

  return filterComplianceMenuData.map(item => {
    if (
      item.routes &&
      Array.isArray(item.routes) &&
      !item.hideChildrenInMenu &&
      item.routes.some(child => child && !!child.name)
    ) {
      const routes = defaultFilterMenuData(item.routes);
      if (routes.length) {
        return {
          name: item.name,
          path: item.path,
          icon: item.icon,
          children: routes
        };
      }
    }
    return {
      name: item.name,
      path: item.path,
      icon: item.icon,
      children: undefined
    };
  });
};
