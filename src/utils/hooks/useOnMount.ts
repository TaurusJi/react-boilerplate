import { useEffect } from "react";

export const useOnMount = (fn: Function) => {
  useEffect(() => {
    fn();
  }, []); // 第二个参数设置为[], 表示不必对任何数据， 所以只在首次渲染时调用
};
