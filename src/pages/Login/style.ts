import styled from "styled-components";

const LoginCss = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 112px 0 24px 0;

  .login-panel {
    display: flex;
    flex-direction: column;
  }

  .app-info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
  }

  .app-logo {
    height: 40px;
    margin-right: 16px;
  }

  .app-name {
    font-size: 32px;
    font-weight: bold;
    white-space: nowrap;
  }

  .app-desc {
    margin: 12px 0 40px 0;
    color: $font-color-secondary;
    text-align: center;
  }

  .login-input {
    height: 40px;
  }

  .login-btn {
    width: 100%;
    height: 40px;
  }

  .intl-switch {
    margin-top: 40px;
  }

  .intl-item {
    cursor: pointer;

    &-active {
      color: $blue-5;
    }
  }

  .intl-switch-separator {
    margin: 0 12px;
  }

  .error-msg {
    text-align: center;
    margin-top: 12px;
    color: $red-6;
  }
`;

export default LoginCss;
