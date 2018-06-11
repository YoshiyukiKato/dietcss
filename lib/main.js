const {dietCssCode} = require("./core");
const {inputSource, outputResult, outputInfo} = require("./io");
const Info = require("./info");


/**
 * 
 * @param {string} css 
 * @param {string} view 
 * @param {Options} options 
 * 
 * @typedef Options
 * @prop {string} output
 * @prop {boolean} minify
 * @prop {boolean} info
 * @prop {boolean} rawCss
 * @prop {boolean} rawView
 */
exports.dietcss = function(css, view, options={}){
  const cssCode = options.rawCss ? css : inputSource(cssPath);
  const viewCode = options.rawView ? view : inputSource(viewPath);
  const info = new Info(cssPath, options.output, viewPath, cssCode, viewCode);
  const resultCssCode = dietCssCode(cssCode, viewCode, options);
  info.setResultCss(resultCssCode);
  outputResult(resultCssCode, options.output);
  outputInfo(info.toString(), options.info);
}