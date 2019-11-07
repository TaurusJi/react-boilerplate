import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import formatMenuPath from "./utils/formatMenuPath";
import getFlatMenuKeys from "./utils/getFlatMenuKeys";
import getMeunMatchKeys from "./utils/getMeunMatchKeys";
import urlToList from "./utils/urlToList";
import SiderCss from "./style";

const { SubMenu } = Menu;

export interface IMenu {
  name: string;
  path: string;
  icon?: string;
  children?: IMenu[];
}

interface IProps {
  appName: string;
  appLogo: string;
  appBaseUrl: string;
  menuData: IMenu[];
  pathname: string;
}

const Sider: React.FC<IProps> & { defaultProps: Partial<IProps> } = props => {
  const { pathname, menuData, appBaseUrl, appLogo, appName } = props;

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
      <div className="header">
        {appLogo && <img className="logo" src={appLogo} alt="logo" />}
        {appName && <div className="appName">{appName}</div>}
      </div>
    </Link>
  );

  const renderSiderBody = () => (
    <div className="body">
      <Menu
        className="menu"
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

  return (
    <SiderCss>
      {renderSiderHeader()}
      {renderSiderBody()}
    </SiderCss>
  );
};

Sider.defaultProps = {
  appName: "",
  appLogo: "",
  appBaseUrl: "/",
  menuData: [],
  pathname: "/"
};

export default Sider;
