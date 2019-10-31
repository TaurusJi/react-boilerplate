import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styles from "./index.module.scss";

const Unauthorized: React.FC = () => {
  return (
    <div className={styles.unauthorized}>
      <div className={styles.errorCode}>403</div>
      <div className={styles.errorDesc}>无权限查看</div>
      <Link to="/" href="/">
        <Button type="primary">返回首页</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
