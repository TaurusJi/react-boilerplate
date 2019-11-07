import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import UnauthorizedCss from "./style";

const Unauthorized: React.FC = () => {
  return (
    <UnauthorizedCss>
      <div className="error-code">403</div>
      <div className="error-desc">无权限查看</div>
      <Link to="/" href="/">
        <Button type="primary">返回首页</Button>
      </Link>
    </UnauthorizedCss>
  );
};

export default Unauthorized;
