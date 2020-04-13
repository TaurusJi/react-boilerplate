import { IMenu } from "..";

const getFlatMenuKeys: (menuData: IMenu[]) => string[] = (menuData) => {
  return menuData.reduce((keys: string[], item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);
};

export default getFlatMenuKeys;
