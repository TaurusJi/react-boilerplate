import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isNil } from "lodash";
import omitRouteRenderProperties from "./utils/omitRouteRenderProperties";
import checkPermissions from "./utils/checkPermissions";
import DefaultLayout from "./DefaultLayout";

type RCType = typeof React.Component | React.FC;

export interface AuthorizedRoute {
  key?: string;
  path?: string;
  title?: string;
  exact?: boolean;
  routes?: AuthorizedRoute[];
  redirect?: string;
  component?: RCType;
  breadcrumb?: string[];
  permissions?: string[];
  unauthorized?: RCType;
}

export interface NormalRoute {
  key?: string;
  path?: string;
  title?: string;
  exact?: boolean;
  routes?: NormalRoute[];
  redirect?: string;
  component?: RCType;
  breadcrumb?: string[];
}

export type normalAuthWithJoin = AuthorizedRoute | NormalRoute;

interface IProps {
  authorities: string | string[] | Function;
  normalRoutes: NormalRoute[];
  authorizedRoutes: AuthorizedRoute[];
}

class AclRouter extends PureComponent<IProps> {
  static defaultProps = {
    authorities: "",
    normalRoutes: [],
    normalLayout: DefaultLayout,
    authorizedRoutes: [],
    authorizedLayout: DefaultLayout
  };

  renderRedirectRoute = (route: normalAuthWithJoin) => (
    <Route
      key={route.path}
      {...omitRouteRenderProperties<normalAuthWithJoin>(route)}
      render={() =>
        route.redirect && (
          <Redirect to={route.redirect} from={route.path} exact={route.exact} />
        )
      }
    />
  );

  renderAuthorizedRoute = (
    routes: AuthorizedRoute[],
    extraProps = {},
    switchProps = {}
  ) => (
    <Switch {...switchProps}>
      {routes.map(route => {
        const { authorities } = this.props;
        const {
          permissions,
          path,
          key,
          redirect,
          component: Component,
          unauthorized: Unauthorized
        } = route;
        const hasPermission = checkPermissions(authorities, permissions);

        if (!isNil(redirect)) {
          return this.renderRedirectRoute(route);
        }

        // 登录后访问权限路由 若无权限则显示无权限页
        if (!hasPermission && Unauthorized) {
          return (
            <Route
              key={path || key}
              {...omitRouteRenderProperties(route)}
              render={props => <Unauthorized {...props} />}
            />
          );
        }

        return (
          <Route
            key={path || key}
            {...omitRouteRenderProperties(route)}
            render={props => {
              const childRoutes = this.renderAuthorizedRoute(
                route.routes || [],
                {},
                {
                  location: props.location
                }
              );
              return (
                Component && (
                  <Component {...props} {...extraProps} route={route}>
                    {childRoutes}
                  </Component>
                )
              );
            }}
          />
        );
      })}
    </Switch>
  );

  renderNormalRoute = (
    routes: NormalRoute[],
    extraProps = {},
    switchProps = {}
  ) => (
    <Switch {...switchProps}>
      {routes.map(route => {
        const { redirect, path, component: RouteComponent } = route;

        if (isNil(RouteComponent) && !isNil(redirect)) {
          return this.renderRedirectRoute(route);
        }

        return (
          <Route
            key={path}
            {...omitRouteRenderProperties(route)}
            render={props => {
              const childRoutes = this.renderNormalRoute(
                route.routes || [],
                {},
                {
                  location: props.location
                }
              );
              return (
                RouteComponent && (
                  <RouteComponent {...props} {...extraProps} route={route}>
                    {childRoutes}
                  </RouteComponent>
                )
              );
            }}
          />
        );
      })}
    </Switch>
  );

  render() {
    const { normalRoutes, authorizedRoutes } = this.props;
    return (
      <>
        {this.renderNormalRoute(normalRoutes)}
        {this.renderAuthorizedRoute(authorizedRoutes)}
      </>
    );
  }
}

export default AclRouter;
