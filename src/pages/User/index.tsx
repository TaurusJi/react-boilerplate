import React, { useState, useEffect, useRef } from "react";
import { UserCss } from "./style";
import { Button } from "antd";
import { useArray } from "huse";

const User: React.FC = () => {
  const [index, setIndex] = useState(1);
  const ref = useRef<number | null>(null);
  const [list, { removeAt }] = useArray([
    { age: "1" },
    { age: "2" },
    { age: "3" },
    { age: "4" },
  ]);

  function onClick() {
    const index = list.findIndex((item) => item.age === "4");
    if (index > -1) {
      removeAt(index);
    }
  }

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
      {list.map((item, index) => (
        <div key={index}>{item.age}</div>
      ))}
      <Button onClick={onClick}>点击测试</Button>
    </UserCss>
  );
};

export default User;
