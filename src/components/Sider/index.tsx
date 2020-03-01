import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "src/config/routes";
import { Menu } from "antd";
import icons from "src/config/icons";
import formatMenuPath from "./utils/formatMenuPath";
import getFlatMenuKeys from "./utils/getFlatMenuKeys";
import getMeunMatchKeys from "./utils/getMeunMatchKeys";
import urlToList from "./utils/urlToList";
import { defaultFilterMenuData } from "src/utils/getMenuData";

const { SubMenu } = Menu;

export interface IMenu {
  name: string;
  path: string;
  icon?: string;
  children?: IMenu[];
}

interface IProps {
  menuData: IMenu[];
}

const Sider: React.FC<IProps> & { defaultProps: Partial<IProps> } = props => {
  const { pathname } = useLocation();
  const { menuData } = props;

  const fullPathMenuData: IMenu[] = useMemo(() => {
    if (menuData.length) {
      return formatMenuPath(menuData);
    } else {
      const filterRootRoute = routes.find(route => route.path === "/");
      return defaultFilterMenuData(
        filterRootRoute ? filterRootRoute.routes : []
      );
    }
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
                {item.icon && icons.get(item.icon)}
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
            {item.icon && icons.get(item.icon)}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={setOpenKeys}
      style={{ padding: "16px 0px" }}
    >
      {renderMenu(fullPathMenuData)}
    </Menu>
  );
};

Sider.defaultProps = {
  menuData: []
};

export default Sider;
