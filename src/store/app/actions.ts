import { createAction } from "typesafe-actions";

export const loginAction = createAction("app/setLogin", (isLogin: boolean) => {
  return {
    isLogin,
  };
})();

export const authoritiesAction = createAction(
  "app/setAuthorities",
  (authorities: string[]) => {
    return {
      authorities,
    };
  }
)();
