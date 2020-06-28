import { combineReducers } from "redux";
import { History } from "history";
import { RouterState, connectRouter } from "connected-react-router";
import appReducer, { IAppState } from "./app/reducers";

const rootReducer = (history: History) =>
  combineReducers({
    app: appReducer,
    router: connectRouter(history),
  });

export interface State {
  app: IAppState;
  router: RouterState;
}

export default rootReducer;
