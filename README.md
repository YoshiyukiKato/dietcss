# dietcss

A simple tool to reduce weight of fatty CSS by cutting off unused rules in a page.

```js
const dietcss = require("dietcss");
const cssPath = "/path/to/css"; //a css loaded in a view
const viewPath = "/path/to/view"; //the view as dependency of the css
const options = {
  output: "/path/to/output", //path to result css without unused rules in the view
                             //If not specified, the result will be shown in console log.
  minify: true, //minify the output or not. default false
  info: true //show infomation about recent process or not. default false
}

dietcss(cssPath, viewPath, options);
```