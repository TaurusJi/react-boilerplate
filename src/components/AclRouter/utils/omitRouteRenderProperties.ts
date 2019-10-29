import { omit } from "lodash";

const OMIT_ROUTE_RENDER_PROPERTIES = ["render", "component"];

const omitRouteRenderProperties = <T extends {}>(route: T) =>
  omit(route, OMIT_ROUTE_RENDER_PROPERTIES);

export default omitRouteRenderProperties;
