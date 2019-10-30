const urlToList = (url: string) => {
  if (url) {
    const urlList = url.split("/").filter(i => i);
    return urlList.map(
      (_, index) => `/${urlList.slice(0, index + 1).join("/")}`
    );
  }
  return [];
};

export default urlToList;
