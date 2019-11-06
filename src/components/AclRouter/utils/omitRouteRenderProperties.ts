import { omit } from "lodash";

const OMIT_ROUTE_RENDER_PROPERTIES = ["render", "component", "routes"];

const omitRouteRenderProperties: <T extends object>(
  route: T
) => Partial<T> = route => omit(route, OMIT_ROUTE_RENDER_PROPERTIES);

export default omitRouteRenderProperties;
