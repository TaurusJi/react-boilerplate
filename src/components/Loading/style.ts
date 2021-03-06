import styled from "styled-components";

export const PreloadLoadingCss = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes square-animation {
    0% {
      left: 0;
      top: 0;
    }
    10.5% {
      left: 0;
      top: 0;
    }
    12.5% {
      left: 32px;
      top: 0;
    }
    23% {
      left: 32px;
      top: 0;
    }
    25% {
      left: 64px;
      top: 0;
    }
    35.5% {
      left: 64px;
      top: 0;
    }
    37.5% {
      left: 64px;
      top: 32px;
    }
    48% {
      left: 64px;
      top: 32px;
    }
    50% {
      left: 32px;
      top: 32px;
    }
    60.5% {
      left: 32px;
      top: 32px;
    }
    62.5% {
      left: 32px;
      top: 64px;
    }
    73% {
      left: 32px;
      top: 64px;
    }
    75% {
      left: 0;
      top: 64px;
    }
    85.5% {
      left: 0;
      top: 64px;
    }
    87.5% {
      left: 0;
      top: 32px;
    }
    98% {
      left: 0;
      top: 32px;
    }
    100% {
      left: 0;
      top: 0;
    }
  }

  @keyframes hue-rotate {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  .loading {
    position: relative;
    width: 96px;
    height: 96px;
    transform: rotate(45deg);
    animation: hue-rotate 10s linear infinite both;
  }

  .loading__square {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    margin: 2px;
    border-radius: 2px;
    background: #07a;
    background-image: linear-gradient(45deg, #fa0 40%, #0c9 60%);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    animation: square-animation 10s ease-in-out infinite both;
  }

  .loading__square:nth-of-type(0) {
    animation-delay: 0s;
  }
  .loading__square:nth-of-type(1) {
    animation-delay: -1.42857s;
  }
  .loading__square:nth-of-type(2) {
    animation-delay: -2.85714s;
  }
  .loading__square:nth-of-type(3) {
    animation-delay: -4.28571s;
  }
  .loading__square:nth-of-type(4) {
    animation-delay: -5.71429s;
  }
  .loading__square:nth-of-type(5) {
    animation-delay: -7.14286s;
  }
  .loading__square:nth-of-type(6) {
    animation-delay: -8.57143s;
  }
  .loading__square:nth-of-type(7) {
    animation-delay: -10s;
  }
`;
