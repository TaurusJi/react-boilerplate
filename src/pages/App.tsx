import React from "react";
import { hot } from "react-hot-loader/root";
import { authorizedRoutes, normalRoutes } from "src/router/routes.config";
import { BrowserRouter as Router } from "react-router-dom";
import AclRouter from "src/components/AclRouter/AclRouter";
import NormalLayout from "src/components/NormalLayout";
import AuthorizedLayout from "src/components/AuthorizedLayout";
import NotFound from "src/components/NotFound";

const authorities: string[] = ["admin"];
const App: React.FC = () => {
  return (
    <Router>
      <AclRouter
        authorities={authorities}
        authorizedRoutes={authorizedRoutes}
        authorizedLayout={AuthorizedLayout}
        normalRoutes={normalRoutes}
        normalLayout={NormalLayout}
        notFound={NotFound}
      />
    </Router>
  );
};

export default hot(App);
