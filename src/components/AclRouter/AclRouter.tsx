import { Component, FC, PureComponent, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isNil } from "lodash-es";
import omitRouteRenderProperties from "./utils/omitRouteRenderProperties";
import checkPermissions from "./utils/checkPermissions";
import Loading from "src/components/Suspense/Loading";
import { pages } from "src/config/routes";

type RCType = typeof Component | FC;

export interface RouteModel {
  key?: string;
  path?: string;
  name?: string;
  icon?: string;
  title?: string;
  exact?: boolean;
  routes?: RouteModel[];
  redirect?: string;
  suspense?: RCType;
  component?: RCType;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  permissions?: string[];
  unauthorized?: RCType;
}

interface IProps {
  authorities: string | string[] | Function;
  routes: RouteModel[];
  notFound: RCType;
}

class AclRouter extends PureComponent<IProps> {
  static defaultProps = {
    authorities: "",
    normalLayout: pages.DefaultLayout,
    authorizedRoutes: [],
    authorizedLayout: pages.DefaultLayout,
    notFound: pages.DefaultNotFound,
  };

  renderRedirectRoute = (route: RouteModel) => (
    <Route
      key={route.path}
      {...omitRouteRenderProperties(route)}
      render={() =>
        route.redirect && (
          <Redirect to={route.redirect} from={route.path} exact={route.exact} />
        )
      }
    />
  );

  renderNotFoundRoute = (route: RouteModel) => (
    <Route
      key="notfound"
      {...omitRouteRenderProperties(route)}
      render={(props) => (
        <Redirect
          to={{
            ...props.location,
            state: { is404: true, component: route.component },
          }}
        />
      )}
    />
  );

  renderRoutes = (routes: RouteModel[], extraProps = {}, switchProps = {}) => (
    <Switch {...switchProps}>
      {routes.map((route) => {
        const { authorities } = this.props;
        const {
          permissions,
          path,
          key,
          redirect,
          component: RouteComponent,
          unauthorized: Unauthorized,
          suspense: SuspenseComponent,
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
              render={(props) => <Unauthorized {...props} />}
            />
          );
        }

        return (
          <Route
            key={path || key}
            {...omitRouteRenderProperties(route)}
            render={(props) => {
              const childRoutes = this.renderRoutes(
                route.routes || [],
                {},
                {
                  location: props.location,
                }
              );
              if (RouteComponent) {
                if (SuspenseComponent) {
                  return (
                    <RouteComponent {...props} {...extraProps} route={route}>
                      <Suspense fallback={<SuspenseComponent />}>
                        {childRoutes}
                      </Suspense>
                    </RouteComponent>
                  );
                } else {
                  return (
                    <RouteComponent {...props} {...extraProps} route={route}>
                      {childRoutes}
                    </RouteComponent>
                  );
                }
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
    const { routes, notFound: NotFound } = this.props;
    return (
      <Suspense fallback={<Loading />}>
        <Route
          render={(props) => {
            const { state }: { state: any } = props.location;
            // 参考：https://blog.csdn.net/grepets/article/details/96393575
            return state && state.is404 ? (
              state.component ? (
                <state.component />
              ) : (
                <NotFound />
              )
            ) : (
              this.renderRoutes(routes)
            );
          }}
        />
      </Suspense>
    );
  }
}

export default AclRouter;
