import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "src/store/app";

const LoginChecker: React.FC = (props) => {
  const { context } = useAppContext();
  const { isLogin } = context;
  const history = useHistory();

  // 登录前访问权限路由 重定向至登录页
  useEffect(() => {
    if (!isLogin) {
      history.push("/user/login");
    }
  }, [history, isLogin]);

  return <>{props.children}</>;
};

export default LoginChecker;
