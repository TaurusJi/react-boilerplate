import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, RouteComponentProps } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

type menu = {
  name: string;
  path: string;
  icon?: string;
  children?: menu[];
};

interface IState {
  menuData: menu[];
}

const menuData: menu[] = [
  {
    name: "仪表盘",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "用户",
        path: "user"
      },
      {
        name: "分析页",
        path: "analysis",
        children: [
          {
            name: "实时数据",
            path: "realtime"
          },
          {
            name: "离线数据",
            path: "offline"
          }
        ]
      }
    ]
  }
];

export default class AuthorizedLayout extends Component<
  RouteComponentProps,
  IState
> {
  renderMenu = (data: menu[]) => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={item.path}>
          <Link to={item.path} href={item.path}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: "100vh" }}>
          <div
            style={{
              height: "32px",
              background: "rgba(255, 255, 255, .2)",
              margin: "16px"
            }}
          />
          <Menu theme="dark" mode="inline">
            {this.renderMenu(menuData)}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              textAlign: "center",
              padding: 0
            }}
          >
            Header
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                background: "#fff",
                minHeight: 360
              }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2019/10/29 Created by JCY
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
