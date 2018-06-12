# dietcss

A simple tool to reduce weight of fatty CSS by cutting off unused rules in a page.

```js
const dietcss = require("dietcss");
const css = "/path/to/css | raw css string"; //target css
const view = ["/path/to/view | raw html string"]; //list of views using the css
const options = {
  output: "/path/to/output", //path to output result
  minify: true, //minify the result or not. default false
  info: true, //show infomation about recent process or not. default false
  rawCss: false, //set true when `css` is raw css string. default false
  rawView: false, //set true when `view` is raw html string. default false
  whitelist: [] //list of allowd selector patterns
}

dietcss(css, view, options);
```