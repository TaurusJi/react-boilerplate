import { IMenu } from "..";

const formatMenuPath = (menuData: IMenu[], parentPath = "/") => {
  return menuData.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    };

    if (item.children) {
      result.children = formatMenuPath(
        item.children,
        `${parentPath}${item.path}/`
      );
    }

    return result;
  });
};

export default formatMenuPath;
