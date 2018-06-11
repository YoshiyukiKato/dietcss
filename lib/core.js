const css = require("css");
const {JSDOM} = require("jsdom");
const CleanCss = require("clean-css");

/**
 * 
 * @param {string} css 
 * @param {string} view
 * @param {Options} options 
 * 
 * @typedef Options
 * @prop {boolean} minify
 */

exports.dietCssCode = function(cssCode, viewCode, options={minify:false}){
  const ast = css.parse(cssCode);
  const rules = ast.stylesheet.rules;
  const dom = new JSDOM(viewCode);
  validateRules(rules, dom);
  const result = css.stringify(ast);
  return options.minify ? minifyResult(result) : result;
}

function validateRules(rules, dom){
  rules.forEach((rule) => {
    if(rule.type === "rule"){
      rule.selectors = rule.selectors.filter(isSelectorExist.bind(null, dom));
    }else if(rule.type === "media"){
      validateRules(rule.rules, dom);
    }else{
      //なにもしない
    }
  });
  removeEmptyRules(rules);
}

function isSelectorExist(dom, selector){
  const topLevelSelector = selector.split(" ")[0].split(":")[0];
  try{
    return !!dom.window.document.querySelector(topLevelSelector);
  }catch(e){
    return true;
  }
}

function removeEmptyRules(rules) {
  let emptyRules = [];
  for (let rule of rules) {
    const ruleType = rule.type;
    if (ruleType === "rule" && rule.selectors.length === 0) {
      emptyRules.push(rule);
    }
    if (ruleType === "media") {
      removeEmptyRules(rule.rules);
      if (rule.rules.length === 0) {
        emptyRules.push(rule);
      }
    }
  }

  emptyRules.forEach(emptyRule => {
    const index = rules.indexOf(emptyRule);
    rules.splice(index, 1);
  })
}

function minifyResult(css){
  return new CleanCss().minify(css).styles;
}