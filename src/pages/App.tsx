import React from "react";
import { hot } from "react-hot-loader/root";
import styles from "./App.module.scss";
import renderRoutes from "../router";
import routesConfig from "src/router/routes.config";
import { Switch, BrowserRouter as Router } from "react-router-dom";

const authed = false;
const authPath = "/login";
const App: React.FC = () => {
  return (
    <main className={styles.main}>
      <Router>
        <Switch>{renderRoutes(routesConfig, authed, authPath)}</Switch>
      </Router>
    </main>
  );
};

export default hot(App);
