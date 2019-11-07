import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isNil } from "lodash";
import omitRouteRenderProperties from "./utils/omitRouteRenderProperties";
import checkPermissions from "./utils/checkPermissions";
import DefaultLayout from "./DefaultLayout";
import DefaultNotFound from "./DefaultNotFound";

type RCType = typeof React.Component | React.FC;

export interface AuthorizedRoute {
  key?: string;
  path?: string;
  name?: string;
  icon?: string;
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
  name?: string;
  icon?: string;
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
  notFound: RCType;
}

class AclRouter extends PureComponent<IProps> {
  static defaultProps = {
    authorities: "",
    normalRoutes: [],
    normalLayout: DefaultLayout,
    authorizedRoutes: [],
    authorizedLayout: DefaultLayout,
    notFound: DefaultNotFound
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

  renderNotFoundRoute = (route: normalAuthWithJoin) => (
    <Route
      key="notfound"
      {...omitRouteRenderProperties<normalAuthWithJoin>(route)}
      render={props => (
        <Redirect
          to={{
            ...props.location,
            state: { is404: true, component: route.component }
          }}
        />
      )}
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
          component: RouteComponent,
          unauthorized: Unauthorized
        } = route;
        const hasPermission = checkPermissions(authorities, permissions);

        const forKeys = Object.keys(route);
        if (forKeys.length === 1 && forKeys[0] === "component") {
          return this.renderNotFoundRoute(route);
        }

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
              if (RouteComponent) {
                return (
                  <RouteComponent {...props} {...extraProps} route={route}>
                    {childRoutes}
                  </RouteComponent>
                );
              } else {
                return childRoutes;
              }
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
              if (RouteComponent) {
                return (
                  <RouteComponent {...props} {...extraProps} route={route}>
                    {childRoutes}
                  </RouteComponent>
                );
              } else {
                return childRoutes;
              }
            }}
          />
        );
      })}
    </Switch>
  );

  render() {
    const { normalRoutes, authorizedRoutes, notFound: NotFound } = this.props;
    return (
      <Route
        render={props => {
          const { state } = props.location;
          // 参考：https://blog.csdn.net/grepets/article/details/96393575
          return state && state.is404 ? (
            state.component ? (
              <state.component />
            ) : (
              <NotFound />
            )
          ) : (
            <>
              {this.renderNormalRoute(normalRoutes)}
              {this.renderAuthorizedRoute(authorizedRoutes)}
            </>
          );
        }}
      />
    );
  }
}

export default AclRouter;
