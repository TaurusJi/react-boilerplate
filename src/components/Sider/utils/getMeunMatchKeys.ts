import pathToRegexp from "path-to-regexp";

const getMeunMatchKeys = (flatMenuKeys: string[], paths: string[]) => {
  return paths.reduce(
    (matchKeys: string[], path) =>
      matchKeys.concat(
        flatMenuKeys.filter(item => pathToRegexp(item).test(path))
      ),
    []
  );
};

export default getMeunMatchKeys;
