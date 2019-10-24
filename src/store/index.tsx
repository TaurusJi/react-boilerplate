import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  // eslint-disable-next-line
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(reducer, enhancer);

export default store;
