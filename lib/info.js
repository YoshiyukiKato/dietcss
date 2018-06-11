const CleanCss = require("clean-css");
const cleanCss = new CleanCss();
const colors = require("colors/safe");

/**
 * @module
 */
class Info{
  constructor(cssPath, outputPath, viewPath, cssCode, viewCode){
    this.sourceCssPath = cssPath;
    this.outputCssPath = outputPath;
    this.dependingViewPath = viewPath;
    this.sourceCssSize = this.getByteLength(cleanCss.minify(cssCode).styles);
    this.resultCssSize = this.sourceCssSize;
  }

  setSourceCss(sourceCss){
    this.sourceCss = sourceCss;
  }

  setResultCss(resultCss){
    this.resultCss = resultCss;
    this.resultCssSize = this.getByteLength(cleanCss.minify(this.resultCss).styles);
  }

  getReductionRatio(){
    return (this.sourceCssSize - this.resultCssSize / this.sourceCssSize).toFixed(2);
  }

  toString(){
    const header = colors.yellow("\n=================================== CSS diet report ===================================\n");
    const footer = colors.yellow("\n=======================================================================================\n");
    
    return `${header}
      Source file: ${colors.red(this.sourceCssPath)}
      Output file: ${colors.green(this.outputCssPath || "not given (shown in console log)")}\n
      Reduction ratio: ${this.getReductionRatio()}%
      ( ${colors.red(this.sourceCssSize)} bytes => ${colors.green(this.resultCssSize)} bytes )
    ${footer}`;
  }

  getByteLength(str){
    return Buffer.byteLength(str, 'utf-8');
  }
}

module.exports = Info;