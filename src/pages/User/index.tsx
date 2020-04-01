import React, { useState, useEffect, useRef } from "react";
import { UserCss } from "./style";
import { Button } from "antd";

const User: React.FC = () => {
  const [index, setIndex] = useState(1);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    ref.current = index;
  });

  return (
    <UserCss>
      <p className="currentIndex">当前的index是: {index}</p>
      <p className="prevIndex">上一个index是: {ref.current}</p>
      <Button
        style={{ marginLeft: 0 }}
        onClick={() => setIndex((prev) => prev + 1)}
      >
        点击让index加1
      </Button>
    </UserCss>
  );
};

export default User;
