import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";

export interface RouteConfigComponentProps<
  Params extends { [K in keyof Params]?: string } = {}
> extends RouteComponentProps<Params> {
  route?: RouteModel;
}

export interface RouteModel {
  key?: React.Key;
  location?: Location;
  requiresAuth?: boolean;
  redirect?: string;
  component?:
    | React.ComponentType<RouteConfigComponentProps<any>>
    | React.ComponentType;
  path?: string | string[];
  exact?: boolean;
  strict?: boolean;
  routes?: RouteModel[];
  render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
  [propName: string]: any;
}

const renderRoutes = (
  routes: RouteModel[],
  authed: boolean,
  authPath = "/login",
  extraProps = {},
  switchProps = {}
): JSX.Element | null =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            if (route.component) {
              if (!route.requiresAuth || authed || route.path === authPath) {
                return (
                  <route.component {...props} {...extraProps} route={route} />
                );
              }
            }
            return (
              <Redirect
                to={{
                  pathname: route.redirect || authPath,
                  state: { from: props.location }
                }}
              />
            );
          }}
        />
      ))}
    </Switch>
  ) : null;

export default renderRoutes;
