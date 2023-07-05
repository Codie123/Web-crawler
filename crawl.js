const normalizeURL = (data) => {
  const myUrl = new URL(data);
  return myUrl;
};

module.exports = {
  normalizeURL,
};
