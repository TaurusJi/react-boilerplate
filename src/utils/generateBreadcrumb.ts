import head from "lodash/head";
import { combineRoutes } from "src/config/routes";

const generateBreadcrumb: (
  Breadcrumb: string[]
) => Array<{ text: string; href: string }> = breadcrumb => {
  return [
    {
      text: "工作台",
      href: "/"
    }
  ].concat(
    breadcrumb.map(path => {
      const route = head(combineRoutes.filter(route => route.path === path));
      return {
        text: (route && route.title) || "",
        href: path
      };
    })
  );
};

export default generateBreadcrumb;
