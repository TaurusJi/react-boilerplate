import styled from "styled-components";

const SiderCss = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 256px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

  .header {
    display: flex;
    align-items: center;
    background: #002140;
    height: 64px;
    padding-left: 24px;

    .logo {
      height: 32px;
      width: 32px;
      margin-right: 12px;
    }

    .appName {
      color: #ffffff;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .body {
    flex: 1;
    background: #001529;

    .menu {
      padding: 16px 0;
      width: 100%;
    }
  }
`;

export default SiderCss;
