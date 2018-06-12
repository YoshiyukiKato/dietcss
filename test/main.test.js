const assert = require("power-assert");
const fs = require("fs");
const path = require("path");
const {dietcss} = require("../lib/main");

//given
const css = path.resolve(__dirname, "./fixture/css/main.css");
const views = [path.resolve(__dirname, "./fixture/view/index.html")];

describe("main", () => {
  describe("reduce unused css code", () => {
    it("works without any error", () => {
      dietcss(css, views, { info: true, minify: true });
      assert(true);
    });
  });
});