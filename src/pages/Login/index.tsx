import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { State } from "src/store/reducers";
import logo from "src/assets/logo.svg";
import useLogin from "src/hooks/useLogin";
import LoginCss from "./style";

const Login: FC = () => {
  const history = useHistory();
  const app = useSelector((state: State) => state.app);
  const [form] = Form.useForm();
  const { isLogin } = app;
  const { handleLogin, loading } = useLogin();

  const onLogin = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue(["username", "password"]);
      handleLogin(values);
    });
  };

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [history, isLogin]);

  return (
    <LoginCss>
      <div className="login-panel">
        <div className="app-info">
          <img className="app-logo" src={logo} alt="logo" />
          <span className="app-name">React 中后台应用</span>
        </div>
        <div className="app-desc">企业级管理系统 React 应用模版</div>
        <Form form={form}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "用户名不能为空" }]}
          >
            <Input
              type="text"
              className="login-input"
              placeholder="请输入用户名"
              prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
              onPressEnter={onLogin}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "密码不能为空" }]}
          >
            <Input
              type="password"
              className="login-input"
              placeholder="请输入密码"
              prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
              onPressEnter={onLogin}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className="login-btn"
              onClick={onLogin}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginCss>
  );
};

export default Login;
