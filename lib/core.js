const css = require("css");
const {JSDOM} = require("jsdom");
const CleanCss = require("clean-css");

/**
 * 
 * @param {string} cssCode
 * @param {string|string[]} viewCode
 * @param {Options} options 
 */
exports.dietCssCode = function(cssCode, viewCodes, options){
  const ast = css.parse(cssCode);
  const rules = ast.stylesheet.rules;
  const doms = viewCodes.map((viewCode) => new JSDOM(viewCode));
  validateRules(rules, doms, options.whitelist);
  const result = css.stringify(ast);
  return options.minify ? minifyResult(result) : result;
}

//改修方針
//1. ruleを仕分ける
//2. ruleの中のselectorのうち、使っているものを取り出す
//3. ruleの中のkeyframeのうち、selector内で使っているものを取り出す

/**
 * 
 * @param {string[]} rules 
 * @param {string[]} doms 
 */
function validateRules(rules, doms, whitelist){
  rules.forEach((rule) => {
    if(rule.type === "rule"){
      rule.selectors = rule.selectors.filter(isSelectorValid.bind(null, doms, whitelist));
    }else if(rule.type === "media"){
      validateRules(rule.rules, doms, whitelist);
    }else{
      //なにもしない
    }
  });
  removeEmptyRules(rules);
}

/**
 * 
 * @param {string[]} doms 
 * @param {string} selector 
 * @param {string[]} whitelist 
 */
function isSelectorValid(doms, whitelist=[], selector){
  const isInWhitelist = whitelist.reduce((acc, allowedPattern) => {
    return acc || !!selector.match(allowedPattern);
  }, false);

  return isInWhitelist || isSelectorExist(doms, selector);
}

/**
 * 
 * @param {string[]} doms 
 * @param {string} selector 
 */
function isSelectorExist(doms, selector){
  const topLevelSelector = selector.split(" ")[0].split(":")[0];
  try{
    return doms.reduce((acc, dom) => {
      return acc || !!dom.window.document.querySelector(topLevelSelector);
    }, false);
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