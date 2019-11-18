import React, { useMemo, useState, useEffect } from "react";
import { Layout, Breadcrumb, Icon, Dropdown, Avatar, Menu } from "antd";
import SiderMenu from "../components/Sider";
// import { menuData } from "src/config/menus";
import generateBreadcrumb from "src/utils/generateBreadcrumb";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import { isEmpty } from "lodash";
import LoginChecker from "src/components/LoginChecker";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useRoute } from "src/utils/getCurrentRoute";
import { getPageTitle } from "src/utils/getPageTitle";
import urlToList from "src/components/Sider/utils/urlToList";
import { useOnUpdate } from "src/utils/hooks/useOnUpdate";
import { useOnMount } from "src/utils/hooks/useOnMount";
import logo from "src/assets/logo.svg";
import styles from "./style.module.scss";
import {
  PageHeaderCss,
  HeaderCss,
  MenuCss,
  ContentCss,
  FooterCss,
  LayoutCss,
  SiderHeaderCss
} from "./style";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const { Sider } = Layout;

const BreadcrumbList = () => {
  const location = useLocation();
  const breadcrumbData = useMemo(() => {
    const breadcrumb = ["/"].concat(urlToList(location.pathname));
    return breadcrumb ? generateBreadcrumb(breadcrumb) : [];
  }, [location]);

  return (
    <Breadcrumb style={{ marginBottom: "16px" }}>
      {breadcrumbData.map(item => (
        <Breadcrumb.Item key={item.href}>{item.name}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

const renderHeader = (props: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) => {
  const { collapsed, setCollapsed } = props;

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
      <Icon
        className="trigger"
        type={collapsed ? "menu-unfold" : "menu-fold"}
        onClick={() => setCollapsed(!collapsed)}
      />
      <div className="right-content">
        <Dropdown
          overlay={userMenu}
          placement="bottomRight"
          className="Dropdown"
        >
          <div className="avatar-container">
            <Avatar className="avatar">N</Avatar>
          </div>
        </Dropdown>
      </div>
    </HeaderCss>
  );
};

const renderPageHeader = (route: RouteModel) => {
  if (isEmpty(route.name)) {
    return null;
  }

  return (
    <PageHeaderCss>
      <BreadcrumbList />
      <div className="page-title">{route.name}</div>
    </PageHeaderCss>
  );
};

const SiderHeader: React.FC = () => {
  const appName = "React Boilerplate";
  const appLogo = logo;
  const appBaseUrl = "/";

  return (
    <SiderHeaderCss>
      <Link to={appBaseUrl} href={appBaseUrl}>
        {appLogo && <img className="logo" src={appLogo} alt="logo" />}
        {appName && <h1 className="appName">{appName}</h1>}
      </Link>
    </SiderHeaderCss>
  );
};

const Footer = () => <FooterCss className="footer">Copyright © 2019</FooterCss>;

const BasicLayout: React.FC = props => {
  const { route } = useRoute();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const headerDOM = renderHeader({
    collapsed,
    setCollapsed
  });
  const pageHeaderDOM = renderPageHeader(route);
  const pageTitle = getPageTitle(route);

  useEffect(() => {
    nProgress.start();
  }, [pathname]);

  useOnMount(() => {
    nProgress.done();
  });

  useOnUpdate(() => {
    nProgress.done();
  }, [props]);

  return (
    <LoginChecker>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Layout>
        <Sider
          width={256}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={styles.sider}
        >
          <SiderHeader />
          <SiderMenu />
        </Sider>
        <LayoutCss>
          {headerDOM}
          {pageHeaderDOM}
          <ContentCss>{props.children}</ContentCss>
          <Footer />
        </LayoutCss>
      </Layout>
    </LoginChecker>
  );
};

export default BasicLayout;
