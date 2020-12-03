import { FC, useMemo, useState } from "react";
import { Layout, Breadcrumb, Dropdown, Avatar, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import SiderMenu from "../components/Sider";
import generateBreadcrumb from "src/utils/generateBreadcrumb";
import { RouteModel } from "src/components/AclRouter/AclRouter";
import { isEmpty } from "lodash-es";
import LoginChecker from "src/components/LoginChecker";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useRoute } from "src/utils/getCurrentRoute";
import { getPageTitle } from "src/utils/getPageTitle";
import urlToList from "src/components/Sider/utils/urlToList";
import logo from "src/assets/logo.svg";
import styles from "./style.module.scss";
import {
  PageHeaderCss,
  HeaderCss,
  MenuCss,
  ContentCss,
  FooterCss,
  LayoutCss,
  SiderHeaderCss,
} from "./style";

const { Sider } = Layout;

const BreadcrumbList = () => {
  const location = useLocation();
  const breadcrumbData = useMemo(() => {
    const breadcrumb = ["/"].concat(urlToList(location.pathname));
    return breadcrumb ? generateBreadcrumb(breadcrumb) : [];
  }, [location]);

  return (
    <Breadcrumb style={{ marginBottom: "16px" }}>
      {breadcrumbData.map((item) => (
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
        <UserOutlined className="user-menu-icon" />
        <span>个人中心</span>
      </Menu.Item>
      <Menu.Item disabled className="user-menu-item">
        <SettingOutlined className="user-menu-icon" />
        <span>设置</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="user-menu-item">
        <div role="presentation">
          <LogoutOutlined className="user-menu-icon" />
          <span>退出登陆</span>
        </div>
      </Menu.Item>
    </MenuCss>
  );

  return (
    <HeaderCss>
      {collapsed ? (
        <MenuUnfoldOutlined
          className="trigger"
          onClick={() => setCollapsed(!collapsed)}
        ></MenuUnfoldOutlined>
      ) : (
        <MenuFoldOutlined
          className="trigger"
          onClick={() => setCollapsed(!collapsed)}
        ></MenuFoldOutlined>
      )}

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

const Footer = () => <FooterCss className="footer">Copyright © 2020</FooterCss>;

const BasicLayout: FC = (props) => {
  const { route } = useRoute();
  const [collapsed, setCollapsed] = useState(false);
  const headerDOM = renderHeader({
    collapsed,
    setCollapsed,
  });
  const pageHeaderDOM = renderPageHeader(route);
  const pageTitle = getPageTitle(route);

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
