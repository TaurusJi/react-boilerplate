import styled from "styled-components";

const LoadingCss = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default LoadingCss;
