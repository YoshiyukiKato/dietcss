# dietcss

A simple tool to reduce weight of fatty CSS by cutting off unused rules in a page.

```js
const dietcss = require("dietcss");
const css = "/path/to/css | raw css string"; //a css loaded in a view
const view = "/path/to/view | raw html string"; //the view as dependency of the css
const options = {
  output: "/path/to/output", //path to result css without unused rules in the view
                             //If not specified, the result will be shown in console log.
  minify: true, //minify the output or not. default false
  info: true, //show infomation about recent process or not. default false
  rawCss: false, //set true when `css` is raw css string. default false
  rawView :false //set true when `view` is raw html string. default false
}

dietcss(css, view, options);
```