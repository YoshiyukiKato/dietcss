const path = require("path");
const {version} = require("../package.json");
const program = require("commander");
const {dietcss} = require("../lib/main");

program
  .version(version)
  .arguments("<config-path>")
  .action((configPath) => {
    const absConfigPath = path.resolve(process.cwd(), configPath);
    const {css,view,options} = require(absConfigPath);
    dietcss(css, view, options);
  });

program.parse(process.argv);