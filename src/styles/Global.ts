import { createGlobalStyle } from "styled-components";

export const GlobalCss = createGlobalStyle`
  :root {
    // color palettes
    --grey-1: #ffffff;
    --grey-2: #fafafa;
    --grey-3: #f5f5f5;
    --grey-4: #e8e8e8;
    --grey-5: #d9d9d9;
    --grey-6: #bfbfbf;
    --grey-7: #8c8c8c;
    --grey-8: #595959;
    --grey-9: #262626;
    --grey-10: #000000;

    --blue-1: #e6f7ff;
    --blue-2: #bae7ff;
    --blue-3: #91d5ff;
    --blue-4: #69c0ff;
    --blue-5: #40a9ff;
    --blue-6: #1890ff;
    --blue-7: #096dd9;
    --blue-8: #0050b3;
    --blue-9: #003a8c;
    --blue-10: #002766;

    --red-1: #fff1f0;
    --red-2: #ffccc7;
    --red-3: #ffa39e;
    --red-4: #ff7875;
    --red-5: #ff4d4f;
    --red-6: #f5222d;
    --red-7: #cf1322;
    --red-8: #a8071a;
    --red-9: #820014;
    --red-10: #5c0011;

    --green-1: #f6ffed;
    --green-2: #d9f7be;
    --green-3: #b7eb8f;
    --green-4: #95de64;
    --green-5: #73d13d;
    --green-6: #52c41a;
    --green-7: #389e0d;
    --green-8: #237804;
    --green-9: #135200;
    --green-10: #092b00;

    // font
    --font-size-base: 14px;
    --font-size-sm: 12px;
    --font-size-lg: 16px;
    --font-size-xl: 20px;
    --font-color-title: rgba(0, 0, 0, 0.85);
    --font-color-primary: rgba(0, 0, 0, 0.65);
    --font-color-secondary: rgba(0, 0, 0, 0.45);

    // shadow
    --shadow-color: rgba(0, 0, 0, 0.15);
    --shadow-color-light: rgba(0, 0, 0, 0.08);
    --shadow-1-up: 0 1px 4px var(--shadow-color);
    --shadow-1-down: 0 1px 4px var(--shadow-color);
    --shadow-1-left: -1px 0 4px var(--shadow-color);
    --shadow-1-right: 1px 0 4px var(--shadow-color);
    --shadow-1-down-light: 0 1px 4px var(--shadow-color-light);

    // background
    --layout-body-background: #f0f2f5;
    --layout-sider-header-background: #002140;
    --layout-sider-body-background: #001529;

    // border
    --border-radius-base: 4px;

    // z-index
    --z-index-1: 9;
    --z-index-2: 99;
    --z-index-3: 999;
  }
`;
