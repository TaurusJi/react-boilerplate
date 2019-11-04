import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "src/store/reducers/index";
import useReactRouter from "use-react-router";

const LoginChecker: React.FC = props => {
  const { isLogin } = useSelector((state: State) => state.app);
  const { history } = useReactRouter();

  // 登录前访问权限路由 重定向至登录页
  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
    console.log("effect start ======== >");
  }, [history, isLogin]);

  return <>{props.children}</>;
};

export default LoginChecker;
