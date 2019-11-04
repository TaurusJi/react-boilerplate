import React, { PureComponent, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
// import { isEmpty } from "lodash";
import { Input, Icon, Button } from "antd";
import { userLogin } from "src/store/actions/app";
import { connect } from "src/store/connect";
import { stringify } from "querystring";
import logo from "src/assets/logo.svg";
import "./index.scss";

interface IProps {
  prefixCls?: string;
  isLogin: boolean;
}

@connect<{ loginUser(): void }>(
  state => ({
    isLogin: state.app.isLogin
  }),
  {
    loginUser: userLogin
  }
)
class Login extends PureComponent<IProps & RouteComponentProps> {
  static defaultProps = {
    prefixCls: "view-login"
  };

  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    const { isLogin, history } = this.props;
    if (isLogin) {
      history.push("/");
    }
  }

  componentDidUpdate() {
    const { isLogin, history } = this.props;
    if (isLogin) {
      history.push("/");
    }
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    this.setState({ [key]: e.target.value });
  };

  handleLogin = () => {
    const { history } = this.props;
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

  renderLoginPanel = () => {
    const { prefixCls } = this.props;
    const { username, password } = this.state;
    return (
      <div className={`${prefixCls}-loginPanel`}>
        <div className={`${prefixCls}-appInfo`}>
          <img className={`${prefixCls}-appLogo`} src={logo} alt="logo" />
          <span className={`${prefixCls}-appName`}>React 中后台应用</span>
        </div>
        <div className={`${prefixCls}-appDesc`}>
          企业级管理系统 React 应用模版
        </div>
        <Input
          className={`${prefixCls}-loginInput`}
          style={{ height: 40, marginBottom: 24 }}
          placeholder="请输入用户名"
          type="text"
          prefix={<Icon type="user" style={{ color: "rgba(0, 0, 0, .25)" }} />}
          value={username}
          onChange={e => this.onInputChange(e, "username")}
          // onPressEnter={this.handleLogin}
        />
        <Input
          className={`${prefixCls}-loginInput`}
          placeholder="请输入密码"
          type="password"
          prefix={<Icon type="lock" style={{ color: "rgba(0, 0, 0, .25)" }} />}
          value={password}
          onChange={e => this.onInputChange(e, "password")}
          // onPressEnter={this.handleLogin}
        />
        <Button
          className={`${prefixCls}-loginBtn`}
          type="primary"
          onClick={this.handleLogin}
        >
          登录
        </Button>
        {/* <div>{this.renderErrorMsg()}</div> */}
      </div>
    );
  };

  render() {
    const { prefixCls } = this.props;
    return <div className={prefixCls}>{this.renderLoginPanel()}</div>;
  }
}

export default Login;
