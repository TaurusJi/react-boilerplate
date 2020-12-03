import { FC } from "react";
import { routes } from "src/config/routes";
import { useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { State } from "src/store/reducers";
import { history } from "src/store";
import AclRouter from "src/components/AclRouter/AclRouter";
import NotFound from "./NotFound";

const App: FC = () => {
  const app = useSelector((state: State) => state.app);
  const { authorities } = app;

  return (
    <ConnectedRouter history={history}>
      <AclRouter
        authorities={authorities}
        routes={routes}
        notFound={NotFound}
      />
    </ConnectedRouter>
  );
};

export default App;
