// https://www.youtube.com/watch?v=C0pXaNchNTA&ab_channel=Bootdev
const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  // Webpage to crawl : https://wagslane.dev

  if (process.argv.length < 3) {
    // 1. Interpreteur 2. Code name  3. Url
    console.log("no website link found");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    // 1. Interpreteur 2. Code name  3. Url
    console.log("Too many arguments");
    process.exit(1);
  }
  const baseUrl = process.argv[2];

  console.log(`Crawling on ${baseUrl}`);
  const pages = await crawlPage(baseUrl, baseUrl, {}); // ( starting poing, the recursiveUrl, Object to fill)
  printReport(pages);
}
main();
