import { combineReducers } from "redux";
import { History } from "history";
import { RouterState, connectRouter } from "connected-react-router";
import appReducer, { AppState } from "./app";

const rootReducer = (history: History) =>
  combineReducers({
    app: appReducer,
    router: connectRouter(history)
  });

export interface State {
  app: AppState;
  router: RouterState;
}

export default rootReducer;
