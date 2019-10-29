import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { map, isNil } from "lodash";
import omitRouteRenderProperties from "./utils/omitRouteRenderProperties";
import checkPermissions from "./utils/checkPermissions";
import DefaultLayout from "./DefaultLayout";
import DefaultNotFound from "./DefaultNotFound";

type RCType = typeof React.Component | React.FC;

export type AuthorizedRoute = {
  path: string;
  permissions: string[];
  component: RCType;
  redirect?: string;
  unauthorized: RCType;
};

export type NormalRoute = {
  path: string;
  exact?: boolean;
  redirect?: string;
  component: RCType;
};

export type normalAuthWithJoin = AuthorizedRoute | NormalRoute;

interface IProps {
  authorities: string | any[] | Function;
  normalRoutes: NormalRoute[];
  normalLayout: RCType;
  authorizedRoutes: AuthorizedRoute[];
  authorizedLayout: RCType;
  notFound: RCType;
}

export default class AclRouter extends Component<IProps> {
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
      render={() => route.redirect && <Redirect to={route.redirect} />}
    />
  );

  /**
   * props pass to Layout & Component are history, location, match
   */
  renderAuthorizedRoute = (route: AuthorizedRoute) => {
    const { authorizedLayout: AuthorizedLayout, authorities } = this.props;
    const {
      permissions,
      path,
      redirect,
      component: RouteComponent,
      unauthorized: Unauthorized
    } = route;
    const hasPermission = checkPermissions(authorities, permissions);

    if (!hasPermission && route.unauthorized) {
      return (
        <Route
          key={path}
          {...omitRouteRenderProperties(route)}
          render={props => (
            <AuthorizedLayout {...props}>
              <Unauthorized {...props} />
            </AuthorizedLayout>
          )}
        />
      );
    }

    if (!hasPermission && redirect) {
      return this.renderRedirectRoute(route);
    }

    return (
      <Route
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <AuthorizedLayout {...props}>
            <RouteComponent {...props} />
          </AuthorizedLayout>
        )}
      />
    );
  };

  /**
   * props pass to Layout & Component are history, location, match
   */
  renderNormalRoute = (route: NormalRoute) => {
    const { normalLayout: NormalLayout } = this.props;
    const { redirect, path, component: RouteComponent } = route;

    // check if current route is a redirect route (doesn't have component but redirect path)
    if (isNil(RouteComponent) && !isNil(redirect)) {
      return this.renderRedirectRoute(route);
    }

    return (
      <Route
        key={path}
        {...omitRouteRenderProperties(route)}
        render={props => (
          <NormalLayout {...props}>
            <RouteComponent {...props} />
          </NormalLayout>
        )}
      />
    );
  };

  renderNotFoundRoute = () => {
    const { notFound: NotFound } = this.props;
    return <Route render={props => <NotFound {...props} />} />;
  };

  render() {
    const { normalRoutes, authorizedRoutes } = this.props;
    return (
      <Switch>
        {map(normalRoutes, route => this.renderNormalRoute(route))}
        {map(authorizedRoutes, route => this.renderAuthorizedRoute(route))}
        {this.renderNotFoundRoute()}
      </Switch>
    );
  }
}
