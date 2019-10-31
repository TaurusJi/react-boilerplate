import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import memoize from "memoize-one";
import { Menu, Icon } from "antd";
import formatMenuPath from "./utils/formatMenuPath";
import getFlatMenuKeys from "./utils/getFlatMenuKeys";
import getMeunMatchKeys from "./utils/getMeunMatchKeys";
import urlToList from "./utils/urlToList";
import "./index.scss";

const { SubMenu } = Menu;

export type IMenu = {
  name: string;
  path: string;
  icon?: string;
  children?: IMenu[];
};

export interface IProps {
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

interface IState {
  openKeys: string[];
}

export default class Sider extends PureComponent<IProps, IState> {
  static defaultProps: Partial<IProps> = {
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

  selectedKeys: (pathname: string, fullPathMenu: IMenu[]) => string[];

  fullPathMenuData: (menuData: IMenu[]) => IMenu[];

  constructor(props: IProps) {
    super(props);
    this.fullPathMenuData = memoize(menuData => formatMenuPath(menuData));
    this.selectedKeys = memoize((pathname, fullPathMenu) =>
      getMeunMatchKeys(getFlatMenuKeys(fullPathMenu), urlToList(pathname))
    );

    const { pathname, menuData } = props;

    this.state = {
      openKeys: this.selectedKeys(pathname, this.fullPathMenuData(menuData))
    };
  }

  handleOpenChange = (openKeys: string[]) => {
    this.setState({
      openKeys
    });
  };

  renderMenu = (data: IMenu[]) =>
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

  renderSiderHeader = () => {
    const { appBaseUrl, prefixCls, appLogo, appName } = this.props;

    return (
      <Link to={appBaseUrl} href={appBaseUrl}>
        <div className={`${prefixCls}-header`}>
          {appLogo && (
            <img className={`${prefixCls}-logo`} src={appLogo} alt="logo" />
          )}
          {appName && <div className={`${prefixCls}-appName`}>{appName}</div>}
        </div>
      </Link>
    );
  };

  renderSiderBody = () => {
    const { prefixCls, pathname, menuData } = this.props;
    const { openKeys } = this.state;

    return (
      <div className={`${prefixCls}-body`}>
        <Menu
          style={{ padding: "16px 0", width: "100%" }}
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={this.selectedKeys(
            pathname,
            this.fullPathMenuData(menuData)
          )}
          onOpenChange={this.handleOpenChange}
        >
          {this.renderMenu(this.fullPathMenuData(menuData))}
        </Menu>
      </div>
    );
  };

  render() {
    const { prefixCls, className, style, width } = this.props;

    const classes = `${prefixCls} ${className}`;
    const styles = {
      ...style,
      width
    };

    return (
      <div className={classes} style={styles}>
        {this.renderSiderHeader()}
        {this.renderSiderBody()}
      </div>
    );
  }
}
