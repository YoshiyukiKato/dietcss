const {dietCssCode} = require("./core");
const {inputSource, outputResult, outputInfo} = require("./io");
const Info = require("./info");
const Options = require("./options");

/**
 * 
 * @param {string} css 
 * @param {string|string[]} view 
 * @param {any} opts
 */
exports.dietcss = function(css, view, opts={}){
  const options = new Options(opts);
  const views = Array.isArray(view) ? view : [view];
  const cssPath = options.rawCss ? "no path. raw css data" : css;
  const viewPaths = options.rawView ? "no path. raw html data" : views;
  const cssCode = options.rawCss ? css : inputSource(cssPath);
  const viewCodes = options.rawView ? views : viewPaths.map(inputSource);
  const info = new Info(cssPath, viewPaths, cssCode, viewCodes, options);
  const resultCssCode = dietCssCode(cssCode, viewCodes, options);
  info.setResultCss(resultCssCode);
  outputResult(resultCssCode, options.output);
  outputInfo(info.toString(), options.info);
}