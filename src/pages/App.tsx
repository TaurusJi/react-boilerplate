import React from "react";
import { hot } from "react-hot-loader/root";
import { routes } from "src/config/routes";
import { HashRouter as Router } from "react-router-dom";
import AclRouter from "src/components/AclRouter/AclRouter";
import NotFound from "./NotFound";
import { useAppContext } from "src/store/app";

const App: React.FC = () => {
  const { context } = useAppContext();
  const { authorities } = context;

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
