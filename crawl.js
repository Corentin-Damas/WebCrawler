const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

function getURLsFromHTML(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);

  const urlString = dom.window.document.querySelectorAll("a");
  return url_list;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
