import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const middlewares = [routerMiddleware(history), thunk];

if (process.env.NODE_ENV === `development`) {
  // eslint-disable-next-line
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(createRootReducer(history), enhancer);

export default store;
