import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Content, Footer } = Layout;

export const NormalLayoutCss = styled.div`
  min-height: 100vh;
  background: var(--layout-body-background);
`;

export const HeaderCss = styled.div`
  width: 100%;
  height: 64px;
  padding-right: 12px;
  display: flex;
  background: var(--grey-1);
  box-shadow: var(--shadow-1-down-light);
  z-index: var(--z-index-1);

  .trigger {
    font-size: 20px;
    line-height: 70px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .right-content {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;

    .avatar-container {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 12px;

      &:hover {
        cursor: pointer;
        background: var(--blue-1);
      }
    }
  }
`;

export const PageHeaderCss = styled.header`
  padding: 16px 32px 0;
  background: var(--grey-1);
  border-bottom: 1px solid var(--shadow-color-light);

  .page-title {
    font-size: var(--font-size-xl);
    margin-bottom: 16px;
  }
`;

export const SiderHeaderCss = styled.div`
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #001529;
  cursor: pointer;
  transition: all 0.3s;

  .logo {
    height: 32px;
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }

  .appName {
    color: #ffffff;
    font-size: 20px;
    margin-left: 12px;
    display: inline-block;
    margin: 0 0 0 12px;
    font-weight: 600;
    vertical-align: middle;
  }
`;

export const MenuCss = styled(Menu)`
  .user-menu-item {
    min-width: 160px;
  }

  .user-menu-icon {
    margin-right: 12px;
  }
`;

export const LayoutCss = styled(Layout)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--layout-body-background);
`;

export const ContentCss = styled(Content)`
  flex: 1;
  margin: 24px 24px 0;
`;

export const FooterCss = styled(Footer)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color-secondary);
`;
