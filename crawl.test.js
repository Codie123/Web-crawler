const { test, expect } = require("@jest/globals");
const { normalizeURL, getHtmlFromUrl } = require("./crawl.js");

test("NormalizeUrl Strip protocol ", () => {
  const input = "https://thecerc.com/work.html";
  const actualUrl = normalizeURL(input);
  const expected = "thecerc.com/work.html";
  expect(actualUrl).toEqual(expected);
});
test("NormalizeUrl Strip Trailing Slash ", () => {
  const input = "https://thecerc.com/work.html/";
  const actualUrl = normalizeURL(input);
  const expected = "thecerc.com/work.html";
  expect(actualUrl).toEqual(expected);
});
test("NormalizeUrl Capitalize", () => {
  const input = "https://TheCerc.com/work.html";
  const actualUrl = normalizeURL(input);
  const expected = "thecerc.com/work.html";
  expect(actualUrl).toEqual(expected);
});
test("NormalizeUrl Strip http", () => {
  const input = "http://thecerc.com/work.html";
  const actualUrl = normalizeURL(input);
  const expected = "thecerc.com/work.html";
  expect(actualUrl).toEqual(expected);
});

test("getHtmlFromUrl ", () => {
  const inputHtmlBody = `
        <html>
        <body>
            <a href="https://thecerc.com/"><span>Go to TheCerc.tech</span></a>
        </body>
        </html>
    `;
  const baseUrl = "https://thecerc.com/";
  const actual = getHtmlFromUrl(inputHtmlBody, baseUrl);
  const expected = ["https://thecerc.com/"];
  expect(actual).toEqual(expected);
});

test("getHtmlFromUrl Absolute Url", () => {
  const inputHtmlBody = `
          <html>
          <body>
              <a href="https://thecerc.com/work.html"><span>Go to TheCerc.tech</span></a>
          </body>
          </html>
      `;
  const baseUrl = "https://thecerc.com/work.html";
  const actual = getHtmlFromUrl(inputHtmlBody, baseUrl);
  const expected = ["https://thecerc.com/work.html"];
  expect(actual).toEqual(expected);
});

test("getHtmlFromUrl Relative Url", () => {
  const inputHtmlBody = `
          <html>
          <body>
              <a href="/work.html"><span>Go to TheCerc.tech</span></a>
          </body>
          </html>
      `;
  const baseUrl = "https://thecerc.com";
  const actual = getHtmlFromUrl(inputHtmlBody, baseUrl);
  const expected = ["https://thecerc.com/work.html"];
  expect(actual).toEqual(expected);
});
test("getHtmlFromUrl Both Url", () => {
  const inputHtmlBody = `
            <html>
            <body>
                <a href="/work1.html"><span>Go to TheCerc.tech</span></a>
                <a href="https://thecerc.com/work2.html"><span>Go to TheCerc.tech</span></a>

            </body>
            </html>
        `;
  const baseUrl = "https://thecerc.com";
  const actual = getHtmlFromUrl(inputHtmlBody, baseUrl);
  const expected = [
    "https://thecerc.com/work1.html",
    "https://thecerc.com/work2.html",
  ];
  expect(actual).toEqual(expected);
});

test("getHtmlFromUrl Invalid", () => {
  const inputHtmlBody = `
            <html>
            <body>
                <a href="invalid "><span>Go to TheCerc.tech</span></a>
             

            </body>
            </html>
        `;
  const baseUrl = "https://thecerc.com";
  const actual = getHtmlFromUrl(inputHtmlBody, baseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});
