import { useSelector } from "react-redux";
import { useMemo } from "react";
import { matchRoutes } from "react-router-config";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import { State } from "src/store/reducers";
import { routes } from "src/config/routes";
import { get, last } from "lodash";

export const useRoute = () => {
  const { location } = useSelector((state: State) => state.router);
  const route = useMemo(() => {
    const match = matchRoutes(routes, location.pathname) as Array<{
      route: RouteModel;
      match: any;
    }>;

    return get(last(match), "route", {}) as RouteModel;
  }, [location.pathname]);

  return { route };
};
