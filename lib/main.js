const {dietCssCode} = require("./core");
const {inputSource, outputResult, outputInfo} = require("./io");
const Info = require("./info");


/**
 * 
 * @param {string} cssPath 
 * @param {string} viewPath 
 * @param {Options} options 
 * 
 * @typedef Options
 * @prop {string} output
 * @prop {boolean} minify
 * @prop {boolean} info
 */
exports.dietcss = function(cssPath, viewPath, options){
  const cssCode = inputSource(cssPath);
  const viewCode = inputSource(viewPath);
  const info = new Info(cssPath, options.output, viewPath, cssCode, viewCode);
  const resultCssCode = dietCssCode(cssCode, viewCode, options);
  info.setResultCss(resultCssCode);
  outputResult(resultCssCode, options.output);
  outputInfo(info.toString(), options.info);
}