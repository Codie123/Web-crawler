const { JSDOM } = require("jsdom");

const getHtmlFromUrl = (htmlBody, baseUrl) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`);

        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with Relative  Url ${err.message}`);
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(`${linkElement.href}`);

        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with Absolute  Url ${err.message}`);
      }
    }
    // console.log(linkElement.href);
  }
  return urls;
};

const normalizeURL = (urlstring) => {
  const urlObj = new URL(urlstring);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  } else {
    return hostPath;
  }
};

module.exports = {
  normalizeURL,
  getHtmlFromUrl,
};
