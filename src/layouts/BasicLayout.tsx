import React, { PureComponent } from "react";
import { Layout, Breadcrumb, Icon, Dropdown, Avatar, Menu } from "antd";
import { RouteComponentProps } from "react-router-dom";
import MenuSider from "../components/Sider";
import { menuData } from "src/config/menus";
import generateBreadcrumb from "src/utils/generateBreadcrumb";
import { matchRoutes } from "react-router-config";
import { routes } from "src/config/routes";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import { connect } from "src/store/connect";
import { isEmpty, get } from "lodash";
import LoginChecker from "src/components/LoginChecker";
import logo from "src/assets/logo.svg";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import {
  PageHeaderCss,
  HeaderCss,
  MenuCss,
  ContentCss,
  FooterCss,
  LayoutCss
} from "./style";

const { Sider } = Layout;

interface IProps {
  route: Partial<RouteModel>;
}

@connect<{}, RouteComponentProps & IProps>(state => {
  const pathname = state.router.location.pathname;
  const match = matchRoutes(routes, pathname);

  return { route: get(match[match.length - 1], "route", {}) };
})
class AuthorizedLayout extends PureComponent<RouteComponentProps & IProps> {
  static defaultProps = {
    route: {}
  };

  static getDerivedStateFromProps() {
    nProgress.start();
    return null;
  }

  componentDidMount() {
    nProgress.done();
  }

  componentDidUpdate() {
    nProgress.done();
  }

  renderBreadcrumb = () => {
    const {
      route: { breadcrumb }
    } = this.props;

    if (!breadcrumb) {
      return null;
    }

    const breadcrumbData = generateBreadcrumb(breadcrumb);

    return (
      <Breadcrumb style={{ marginBottom: "16px" }}>
        {breadcrumbData.map(item => (
          <Breadcrumb.Item key={item.href}>{item.text}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };

  renderHeader = () => {
    const userMenu = (
      <MenuCss>
        <Menu.Item disabled className="user-menu-item">
          <Icon type="user" className="user-menu-icon" />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item disabled className="user-menu-item">
          <Icon type="setting" className="user-menu-icon" />
          <span>设置</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="user-menu-item">
          <div role="presentation">
            <Icon type="logout" className="user-menu-icon" />
            <span>退出登陆</span>
          </div>
        </Menu.Item>
      </MenuCss>
    );

    return (
      <HeaderCss>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className="avatar-container">
            <Avatar className="avatar">N</Avatar>
          </div>
        </Dropdown>
      </HeaderCss>
    );
  };

  renderPageHeader = () => {
    const {
      route: { name }
    } = this.props;

    if (isEmpty(name)) {
      return null;
    }

    return (
      <PageHeaderCss>
        {this.renderBreadcrumb()}
        <div className="page-title">{name}</div>
      </PageHeaderCss>
    );
  };

  renderContent = () => {
    const { children } = this.props;
    return <ContentCss>{children}</ContentCss>;
  };

  renderFooter = () => (
    <FooterCss className="footer">Copyright © 2019</FooterCss>
  );

  render() {
    const {
      location: { pathname }
    } = this.props;

    return (
      <LoginChecker>
        <Layout>
          <Sider width={256} style={{ minHeight: "100vh" }}>
            <MenuSider
              menuData={menuData}
              pathname={pathname}
              appLogo={logo}
              appName="React Boilerplate"
            ></MenuSider>
          </Sider>
          <LayoutCss>
            {this.renderHeader()}
            {this.renderPageHeader()}
            {this.renderContent()}
            {this.renderFooter()}
          </LayoutCss>
        </Layout>
      </LoginChecker>
    );
  }
}

export default AuthorizedLayout;
