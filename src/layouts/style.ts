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
  background: var(--grey-1);
  box-shadow: var(--shadow-1-down-light);
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
  z-index: var(--z-index-1);

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

  &-avatar {
    background-color: var(--blue-4);
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
