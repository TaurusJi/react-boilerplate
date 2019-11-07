import styled from "styled-components";

const UnauthorizedCSS = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export default UnauthorizedCSS;
