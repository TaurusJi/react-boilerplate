import { RouteModel } from "src/components/AclRouter/AclRouter";

export const getPageTitle = (route: RouteModel) => {
  const defaultTitle = "react-boilerplate";

  if (route.title && route.name) {
    return `${route.name} - ${route.title}`;
  } else if (!route.title && route.name) {
    return `${route.name} - ${defaultTitle}`;
  } else {
    return route.title;
  }
};
