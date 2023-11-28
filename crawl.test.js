const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

test("normalizeURL", () => {
  const input = "https://blog.boot.dev/path";
  const actutal = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actutal).toEqual(expected);
});
// $ npm test

test("getURLsFromHTML", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev">Go to Boot.dev</a>
        </body>
    </html>`;
  const inputBaseUrl = "https://blog.boot.dev";
  const actutal = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/"];
  expect(actutal).toEqual(expected);
});
test("getURLsFromHTML", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Go to Boot.dev</a>
        </body>
    </html>`;
  const inputBaseUrl = "https://blog.boot.dev";
  const actutal = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actutal).toEqual(expected);
});
