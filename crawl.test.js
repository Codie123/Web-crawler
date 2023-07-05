const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

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
