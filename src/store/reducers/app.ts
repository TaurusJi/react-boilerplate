import { Action } from "redux";

export interface AppState {
  isLogin: boolean;
}

const initialState: AppState = {
  isLogin: false
};

const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return state;
    case "DECREMENT":
      return state;
    default:
      return state;
  }
};

export default appReducer;
