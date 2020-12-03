import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import NotFoundCss from "./style";

const NotFound: FC = () => {
  return (
    <NotFoundCss>
      <div className="error-code">404</div>
      <div className="error-desc">页面不存在</div>
      <Link to="/" href="/">
        <Button type="primary">返回首页</Button>
      </Link>
    </NotFoundCss>
  );
};

export default NotFound;
