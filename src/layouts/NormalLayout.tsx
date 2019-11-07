import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "src/store/reducers/index";
import useReactRouter from "use-react-router";
import { NormalLayoutCss } from "./style";

const NormalLayout: React.FC = props => {
  const { isLogin } = useSelector((state: State) => state.app);
  const { history } = useReactRouter();

  // 登录后访问非权限路由 重定向至dashboard/user
  useEffect(() => {
    if (isLogin) {
      history.push("/dashboard/user");
    }
  }, [history, isLogin]);

  return <NormalLayoutCss>{props.children}</NormalLayoutCss>;
};

export default NormalLayout;
