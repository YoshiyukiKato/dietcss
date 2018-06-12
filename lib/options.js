class Options{
  /**
   * @param {options} options
   * 
   * @typedef options
   * @prop {string} output
   * @prop {boolean} minify
   * @prop {boolean} info
   * @prop {boolean} rawCss
   * @prop {boolean} rawView
   * @prop {string[]} whitelist
   */
  constructor(options={}){
    const {output, minify, info, rawCss, rawView, whitelist} = {...defaultOptions, ...options};
    this.output = output;
    this.minify = minify;
    this.info = info;
    this.rawCss = rawCss;
    this.rawView = rawView;
    this.whitelist = whitelist;
  }
}

const defaultOptions = {
  output: null,
  minity: false,
  info: false,
  rawCss: false,
  rawView: false,
  whitelist: []
}

module.exports = Options;