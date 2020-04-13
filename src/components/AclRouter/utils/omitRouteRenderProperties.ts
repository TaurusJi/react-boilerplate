import { omit } from "lodash";
import { RouteModel } from "../AclRouter";

const OMIT_ROUTE_RENDER_PROPERTIES = ["render", "component", "routes"];

const omitRouteRenderProperties = (route: RouteModel) =>
  omit(route, OMIT_ROUTE_RENDER_PROPERTIES);

export default omitRouteRenderProperties;
