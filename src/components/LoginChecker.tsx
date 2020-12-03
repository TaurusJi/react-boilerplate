import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "src/store/reducers";

const LoginChecker: FC = (props) => {
  const app = useSelector((state: State) => state.app);
  const { isLogin } = app;
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
