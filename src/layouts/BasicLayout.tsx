import React, { PureComponent } from "react";
import { Layout, Breadcrumb, Icon, Dropdown, Avatar, Menu } from "antd";
import { RouteComponentProps, Link } from "react-router-dom";
import MenuSider from "../components/Sider";
import { menuData } from "src/config/menus";
import generateBreadcrumb from "src/utils/generateBreadcrumb";
import { matchRoutes } from "react-router-config";
import { combineRoutes } from "src/config/routes";
import { AuthorizedRoute } from "src/components/AclRouter/AclRouter";
import { connect } from "src/store/connect";
import { isEmpty, get } from "lodash";
import LoginChecker from "src/components/LoginChecker";
import withRouteGuard from "src/components/WithRouteGuard";
import logo from "src/assets/logo.svg";
import "./BasicLayout.scss";

const { Footer, Sider, Content } = Layout;

interface IProps {
  prefixCls: string;
  route: Partial<AuthorizedRoute>;
}

@connect<{}, RouteComponentProps & Pick<IProps, "prefixCls">>(state => {
  const pathname = state.router.location.pathname;
  const match = matchRoutes(combineRoutes, pathname);

  return { route: get(match[match.length - 1], "route", {}) };
})
class AuthorizedLayout extends PureComponent<RouteComponentProps & IProps> {
  static defaultProps = {
    prefixCls: "basicLayout",
    route: {}
  };

  renderBreadcrumb = () => {
    const {
      prefixCls,
      route: { breadcrumb }
    } = this.props;

    if (!breadcrumb) {
      return null;
    }
    console.log(breadcrumb);

    const breadcrumbData = generateBreadcrumb(breadcrumb);

    return (
      <Breadcrumb className={`${prefixCls}-breadcrumb`}>
        {breadcrumbData.map((item, idx) =>
          idx === breadcrumbData.length - 1 ? (
            <Breadcrumb.Item key={item.href}>{item.text}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={item.href}>
              <Link href={item.href} to={item.href}>
                {item.text}
              </Link>
            </Breadcrumb.Item>
          )
        )}
      </Breadcrumb>
    );
  };

  renderHeader = () => {
    const { prefixCls } = this.props;

    const userMenu = (
      <Menu>
        <Menu.Item disabled className={`${prefixCls}-userMenuItem`}>
          <Icon type="user" className={`${prefixCls}-userMenuIcon`} />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item disabled className={`${prefixCls}-userMenuItem`}>
          <Icon type="setting" className={`${prefixCls}-userMenuIcon`} />
          <span>设置</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className={`${prefixCls}-userMenuItem`}>
          <div role="presentation">
            <Icon type="logout" className={`${prefixCls}-userMenuIcon`} />
            <span>退出登陆</span>
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={`${prefixCls}-header`}>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className={`${prefixCls}-avatarContainer`}>
            <Avatar className={`${prefixCls}-avatar`}>N</Avatar>
          </div>
        </Dropdown>
      </div>
    );
  };

  renderPageHeader = () => {
    const {
      prefixCls,
      route: { title }
    } = this.props;

    if (isEmpty(title)) {
      return null;
    }

    return (
      <header className={`${prefixCls}-pageHeader`}>
        {this.renderBreadcrumb()}
        <div className={`${prefixCls}-pageTitle`}>{title}</div>
      </header>
    );
  };

  renderContent = () => {
    const { prefixCls, children } = this.props;
    return <Content className={`${prefixCls}-mainContent`}>{children}</Content>;
  };

  renderFooter = () => (
    <Footer className={`${this.props.prefixCls}-footer`}>
      Copyright © 2019
    </Footer>
  );

  render() {
    const {
      prefixCls,
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
          <Layout className={`${prefixCls}-content`}>
            {this.renderHeader()}
            {this.renderPageHeader()}
            {this.renderContent()}
            {this.renderFooter()}
          </Layout>
        </Layout>
      </LoginChecker>
    );
  }
}

export default AuthorizedLayout;
