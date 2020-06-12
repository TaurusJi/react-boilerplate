import React, { ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button } from "antd";
import { useImmer } from "use-immer";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppContext } from "src/store/app";
import logo from "src/assets/logo.svg";
import useLogin from "src/hooks/useLogin";
import LoginCss from "./style";

const Login: React.FC = () => {
  const [state, setState] = useImmer({
    username: "",
    password: "",
  });
  const { context } = useAppContext();
  const { isLogin } = context;
  const { username, password } = state;
  const { handleLogin } = useLogin(username, password);
  const history = useHistory();

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof state
  ) => {
    e.persist();
    setState((draft) => {
      if (e.target) {
        draft[key] = e.target.value;
      }
    });
  };

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [history, isLogin]);

  // const renderErrorMsg = () => {
  //   const { errorMsg, prefixCls } = this.props;
  //   const show = !isEmpty(errorMsg);
  //   if (show) {
  //     return <div className={`${prefixCls}-errorMsg`}>{errorMsg}</div>;
  //   }
  //   return null;
  // };

  return (
    <LoginCss>
      <div className="login-panel">
        <div className="app-info">
          <img className="app-logo" src={logo} alt="logo" />
          <span className="app-name">React 中后台应用</span>
        </div>
        <div className="app-desc">企业级管理系统 React 应用模版</div>
        <Input
          className="login-input"
          style={{ height: 40, marginBottom: 24 }}
          placeholder="请输入用户名"
          type="text"
          prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
          value={state.username}
          onChange={(e) => onInputChange(e, "username")}
          onPressEnter={handleLogin}
        />
        <Input
          className="login-input"
          placeholder="请输入密码"
          type="password"
          prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
          value={state.password}
          onChange={(e) => onInputChange(e, "password")}
          onPressEnter={handleLogin}
        />
        <Button className="login-btn" type="primary" onClick={handleLogin}>
          登录
        </Button>
        {/* <div>{renderErrorMsg()}</div> */}
      </div>
    </LoginCss>
  );
};

export default Login;
