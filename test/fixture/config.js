const path = require("path");
const css = path.resolve(__dirname, "./css/main.css");
const view = path.resolve(__dirname, "./view/index.html");
const options = { info: true, minify: true };

module.exports = { css, view, options };