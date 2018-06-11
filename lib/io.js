const fs = require("fs-extra");

exports.inputSource = function(filepath){
  return fs.readFileSync(filepath).toString();
}

exports.outputResult = function(result, filepath){
  if(!filepath){
    console.log(result);
  }else{
    fs.outputFileSync(filepath, result);
  }
}

exports.outputInfo = function(info, output){
  if(!!output){
    console.log(info);
  }
}