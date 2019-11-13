import { useRef, useEffect } from "react";

export const useOnUpdate = (fn: () => void, dep?: any[]) => {
  const ref = useRef({ fn, mounted: false });
  ref.current.fn = fn;

  useEffect(() => {
    // 首次渲染不执行
    if (!ref.current.mounted) {
      ref.current.mounted = true;
    } else {
      ref.current.fn();
    }
  }, dep);
};
