import React from "react";
import { hot } from "react-hot-loader/root";
import { routes } from "src/config/routes";
import AclRouter from "src/components/AclRouter/AclRouter";
import NotFound from "./NotFound";
import { HashRouter as Router } from "react-router-dom";

const authorities: string[] = ["admin"];
const App: React.FC = () => {
  return (
    <Router>
      <AclRouter
        authorities={authorities}
        routes={routes}
        notFound={NotFound}
      />
    </Router>
  );
};
const AppHot = process.env.NODE_ENV === "development" ? hot(App) : App;

export default AppHot;
