function isAmount(str) {
  const regex = /^[-+]?(\d{1,3}(,\d{3})*|\d*)(\.\d{1,2})?$/;
  return regex.test(str);
}

// console.log(isAmount("12345")); // true
// console.log(isAmount("-12345.67")); // true
// console.log(isAmount("+12345.67")); // true
// console.log(isAmount("12,345.67")); // true
// console.log(isAmount("1234,567.89")); // false, 错误的千位分隔符位置
// console.log(isAmount("12345.")); // true
// console.log(isAmount(".67")); // false, 不允许单独的小数点
// console.log(isAmount("12345.678")); // false, 小数点后超过两位
// console.log(isAmount("12345,67")); // false, 使用逗号作为小数点
// console.log(isAmount("abc123")); // false
// console.log(isAmount("")); // false
// console.log(isAmount("010504")); // false

function isAlphanumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

// console.log(isAlphanumeric("01B023"));

var isAmount=function (str) {
  str=str.toString().replace(/-/g,"");

  //替换千分位，逗号
  str=str.replace(/,/g,"");

  if(str.endsWith("%")){
    str= str.substring(0,str.length-1);
  }

  return !isNaN(str-0);
};
var ret=isAmount("735.041 " -0);
// console.log(ret);
//
// console.log(JSON.stringify({isAmount: true}))
//
// console.log(JSON.parse('{"isAmount":true}'))

console.log(isAmount("0.5%"))
console.log("0.5%".toString().replace(/%/g,""))
