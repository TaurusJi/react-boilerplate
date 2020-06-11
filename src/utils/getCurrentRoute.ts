import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import { routes } from "src/config/routes";
import { get, last } from "lodash-es";

export const useRoute = () => {
  const { pathname } = useLocation();
  const route = useMemo(() => {
    const match = matchRoutes(routes, pathname) as {
      route: RouteModel;
      match: any;
    }[];

    return get(last(match), "route", {});
  }, [pathname]);

  return { route };
};
