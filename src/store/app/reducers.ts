import produce from "immer";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";

export type IAppAction = ActionType<typeof actions>;

export interface IAppState {
  isLogin: boolean;
  authorities: string[];
}

const initialState: IAppState = {
  isLogin: true,
  authorities: ["admin"],
};

export default produce<(draft: IAppState, action: IAppAction) => void>(
  (draft, action) => {
    switch (action.type) {
      case getType(actions.loginAction):
        draft.isLogin = action.payload.isLogin;
        break;
      case getType(actions.authoritiesAction):
        draft.authorities.push(...action.payload.authorities);
    }
  },
  initialState
);
