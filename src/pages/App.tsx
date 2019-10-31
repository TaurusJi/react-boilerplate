import React from "react";
import { hot } from "react-hot-loader/root";
import { authorizedRoutes, normalRoutes } from "src/config/routes";
import AclRouter from "src/components/AclRouter/AclRouter";
import NormalLayout from "src/layouts/NormalLayout";
import BasicLayout from "src/layouts/BasicLayout";
import NotFound from "src/pages/NotFound";
import { ConnectedRouter } from "connected-react-router";
import { history } from "src/store";

const authorities: string[] = ["admin"];
const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <AclRouter
        authorities={authorities}
        authorizedRoutes={authorizedRoutes}
        authorizedLayout={BasicLayout}
        normalRoutes={normalRoutes}
        normalLayout={NormalLayout}
        notFound={NotFound}
      />
    </ConnectedRouter>
  );
};

export default hot(App);
