import React from "react";
import { PreloadLoadingCss } from "./style";

const PreloadLoading: React.FC = () => {
  return (
    <PreloadLoadingCss>
      <div className="loading">
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
      </div>
    </PreloadLoadingCss>
  );
};

export default PreloadLoading;
