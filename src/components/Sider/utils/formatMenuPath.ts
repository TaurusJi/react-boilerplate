const formatMenuPath = <T extends { path: string; children?: Array<T> }>(
  data: Array<T>,
  parentPath = "/"
) => {
  return data.map(item => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`
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
