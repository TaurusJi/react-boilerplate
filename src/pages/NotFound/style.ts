import styled from "styled-components";

const NotFoundCss = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--layout-body-background);
  .error-code {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-bottom: 24px;
  }
  .error-desc {
    font-size: var(--font-size-lg);
    margin-bottom: 16px;
  }
`;

export default NotFoundCss;
