const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);

  let hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

function getURLsFromHTML(htmlBody, baseUrl) {
  const urls_list = [];

  const dom = new JSDOM(htmlBody);

  const urlString = dom.window.document.querySelectorAll("a");
  for (const linkElement of urlString) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative path
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`);
        urls_list.push(urlObj.href);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      // Absolute path
      urls_list.push(linkElement.href);
    }
  }
  return urls_list;
}

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  // Check if we are crawling in the same website
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeURL(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }
  pages[normalizedCurrentUrl] = 1; // init the counter for each link we saw

  try {
    const res = await fetch(currentUrl);

    if (res.status >= 400) {
      console.log("we got problem with the serveur");
      return pages;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log("No Html on the page");
      return pages;
    }

    const htmlBody = await res.text();
    const nextUrls = getURLsFromHTML(htmlBody, baseUrl); // check url in page and  return url list
    for (const nextUrl of nextUrls) {
      pages = await crawlPage(baseUrl, nextUrl, pages);
    }
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${currentUrl}`);
    return pages;
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
