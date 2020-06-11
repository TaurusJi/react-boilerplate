import React, { ChangeEvent, useEffect } from "react";
// import { isEmpty } from "lodash-es";
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { userLogin } from "src/store/actions/app";
import { stringify } from "querystring";
import logo from "src/assets/logo.svg";
import { useSelector } from "react-redux";
import { State } from "src/store/reducers";
import { useHistory } from "react-router-dom";
import LoginCss from "./style";
import { useImmer } from "use-immer";

const Login: React.FC = () => {
  const [state, setState] = useImmer({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { isLogin } = useSelector((state: State) => state.app);

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [history, isLogin]);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof state
  ) => {
    setState((draft) => {
      draft[key] = e.target.value;
    });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/faq",
      search: stringify({ a: 1 }),
    });
  };

  // handleLogin = () => {
  //   const { loginUser } = this.props;
  //   const { username, password } = this.state;
  //   loginUser(username, password);
  // };

  // renderErrorMsg = () => {
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
          // onPressEnter={this.handleLogin}
        />
        <Input
          className="login-input"
          placeholder="请输入密码"
          type="password"
          prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
          value={state.password}
          onChange={(e) => onInputChange(e, "password")}
          // onPressEnter={this.handleLogin}
        />
        <Button className="login-btn" type="primary" onClick={handleLogin}>
          登录
        </Button>
        {/* <div>{this.renderErrorMsg()}</div> */}
      </div>
    </LoginCss>
  );
};

export default Login;
