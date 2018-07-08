const assert = require("power-assert");
const fs = require("fs");
const path = require("path");
const {dietCssCode} = require("../lib/core");
const Options = require("../lib/options");

const cssCode = fs.readFileSync(path.resolve(__dirname, "./fixture/css/main.css")).toString();
const viewCodes = [fs.readFileSync(path.resolve(__dirname, "./fixture/view/index.html")).toString()];
const options = new Options();

describe("core", () => {
  describe("reduce unused css code", () => {
    const resultCss = dietCssCode(cssCode, viewCodes, options);

    it("remains rules of existing selectors in a view", () => {
      assert(!!resultCss.match("\#hoge") && !!resultCss.match("\.piyo"));
    });
    it("removes rules of not existing selectors in a view", () => {
      assert(!resultCss.match("\#fuga") && !resultCss.match("\.moga"));
    });
    it("remains used keyframes declarations", () => {
      assert(!!resultCss.match("foo"));
    });
    it("removes unused keyframes declarations", () => {
      assert(!resultCss.match("bar"));
    });
  });
});