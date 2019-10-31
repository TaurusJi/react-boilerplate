import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./index.scss";

const NotFound: React.FC = () => {
  return (
    <div className="view-notFound">
      <div className="view-notFound-errorCode">404</div>
      <div className="view-notFound-errorDesc">页面不存在</div>
      <Link to="/" href="/">
        <Button type="primary">返回首页</Button>
      </Link>
    </div>
  );
};

export default NotFound;
