const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

test("The Two urls are pointing to the same website ", () => {
  expect(normalizeURL("https://wagsLane.Dev/path")).toBe(
    "http://wagslane.dev/path"
  );
});
