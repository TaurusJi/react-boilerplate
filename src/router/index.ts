import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import routes from "./routes.config";
import generatorRoutes from "./routes";

// * 用switch标签包裹的原因是路由在成功匹配到之后就不会再继续匹配下去了
// * Route 加exact的原因是为了确保路由是精准匹配，但如果你不用switch的话，他在匹配到之后还是会继续匹配下去
const AppRouter = props => (
  <Router>
    <>
      {props.children}
      <Switch>{routes.map(generatorRoutes)}</Switch>
    </>
  </Router>
);

export default AppRouter;
