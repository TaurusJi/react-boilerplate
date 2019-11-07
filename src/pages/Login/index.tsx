import React, { ChangeEvent, useState, useEffect } from "react";
// import { isEmpty } from "lodash";
import { Input, Icon, Button } from "antd";
// import { userLogin } from "src/store/actions/app";
import { stringify } from "querystring";
import logo from "src/assets/logo.svg";
import useReactRouter from "use-react-router";
import { useSelector } from "react-redux";
import { State } from "src/store/reducers";
import LoginCss from "./style";

const Login: React.FC = () => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });
  const { history } = useReactRouter();
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
    setState({ ...state, [key]: e.target.value });
  };

  const handleLogin = () => {
    history.push({
      pathname: "/faq",
      search: stringify({ a: 1 })
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
          prefix={<Icon type="user" style={{ color: "rgba(0, 0, 0, .25)" }} />}
          value={state.username}
          onChange={e => onInputChange(e, "username")}
          // onPressEnter={this.handleLogin}
        />
        <Input
          className="login-input"
          placeholder="请输入密码"
          type="password"
          prefix={<Icon type="lock" style={{ color: "rgba(0, 0, 0, .25)" }} />}
          value={state.password}
          onChange={e => onInputChange(e, "password")}
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
