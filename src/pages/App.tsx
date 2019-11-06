import React from "react";
import { hot } from "react-hot-loader/root";
import { authorizedRoutes, normalRoutes } from "src/config/routes";
import AclRouter from "src/components/AclRouter/AclRouter";
import { ConnectedRouter } from "connected-react-router";
import { history } from "src/store";
import NotFound from "./NotFound";

const authorities: string[] = ["admin"];
const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <AclRouter
        authorities={authorities}
        normalRoutes={normalRoutes}
        authorizedRoutes={authorizedRoutes}
        notFound={NotFound}
      />
    </ConnectedRouter>
  );
};

export default hot(App);
