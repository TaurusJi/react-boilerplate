import React from "react";
import { Route, Redirect } from "react-router-dom";

export const RouteWithSubRoutes = route => {
  if (route.path) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => (
          // 子路由向下传递，达到嵌套功能。
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  } else if (route.redirect) {
    return <Redirect to={route.redirect} />;
  } else {
    return {};
  }
};

export default (route, i) => <RouteWithSubRoutes key={i} {...route} />;
