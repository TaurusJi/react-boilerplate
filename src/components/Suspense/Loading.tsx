import React, { useEffect } from "react";
import { Spin } from "antd";
import nProgress from "nprogress";
import LoadingCss from "./style";

const Loading: React.FC = () => {
  useEffect(() => {
    nProgress.start();

    return () => {
      nProgress.done();
    };
  }, []);

  return (
    <LoadingCss>
      <Spin size="large" className="loading" />
    </LoadingCss>
  );
};

export default Loading;
