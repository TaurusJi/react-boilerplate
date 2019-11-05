import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import formatMenuPath from "./utils/formatMenuPath";
import getFlatMenuKeys from "./utils/getFlatMenuKeys";
import getMeunMatchKeys from "./utils/getMeunMatchKeys";
import urlToList from "./utils/urlToList";
import "./index.scss";

const { SubMenu } = Menu;

export interface IMenu {
  name: string;
  path: string;
  icon?: string;
  children?: IMenu[];
}

interface IProps {
  prefixCls: string;
  className: string;
  style: {};
  width: number;
  appName: string;
  appLogo: string;
  appBaseUrl: string;
  menuData: IMenu[];
  pathname: string;
}

const Sider: React.FC<IProps> & { defaultProps: Partial<IProps> } = props => {
  const {
    pathname,
    menuData,
    prefixCls,
    appBaseUrl,
    appLogo,
    appName,
    className,
    style,
    width
  } = props;

  const fullPathMenuData: IMenu[] = useMemo(() => {
    return formatMenuPath(menuData);
  }, [menuData]);
  const selectedKeys: string[] = useMemo(() => {
    return getMeunMatchKeys(
      getFlatMenuKeys(fullPathMenuData),
      urlToList(pathname)
    );
  }, [pathname, fullPathMenuData]);
  const [openKeys, setOpenKeys] = useState(selectedKeys);

  const renderMenu = (data: IMenu[]) =>
    data.map(item => {
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
            {renderMenu(item.children)}
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

  const renderSiderHeader = () => (
    <Link to={appBaseUrl} href={appBaseUrl}>
      <div className={`${prefixCls}-header`}>
        {appLogo && (
          <img className={`${prefixCls}-logo`} src={appLogo} alt="logo" />
        )}
        {appName && <div className={`${prefixCls}-appName`}>{appName}</div>}
      </div>
    </Link>
  );

  const renderSiderBody = () => (
    <div className={`${prefixCls}-body`}>
      <Menu
        style={{ padding: "16px 0", width: "100%" }}
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={setOpenKeys}
      >
        {renderMenu(fullPathMenuData)}
      </Menu>
    </div>
  );

  const classes = `${prefixCls} ${className}`;
  const styles = {
    ...style,
    width
  };

  return (
    <div className={classes} style={styles}>
      {renderSiderHeader()}
      {renderSiderBody()}
    </div>
  );
};

Sider.defaultProps = {
  prefixCls: "react-sider",
  className: "",
  style: {},
  appName: "",
  appLogo: "",
  appBaseUrl: "/",
  width: 256,
  menuData: [],
  pathname: "/"
};

export default Sider;
